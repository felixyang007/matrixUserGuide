---
contributors:
  - 'ZhouYixun'
  - 'soniclei'
  - 'shinyvince'
  - 'mmagi'
---

# Agent 端部署

本文介绍如何部署 Matrix 的 Agent 端。Agent 是跑在「插着测试手机的那台电脑」上的绿色软件，装好并连上服务器后，团队就能在网页上远程控制真机、跑自动化测试。

> 团队发布页：[github.com/felixyang007/matrix-agent/releases](https://github.com/felixyang007/matrix-agent/releases)（需要团队 GitHub 权限）
> 源码仓库：[github.com/felixyang007/matrix-agent](https://github.com/felixyang007/matrix-agent)

::: tip 注意
- 一台电脑只能部署一个 Agent；每个 Agent 的 Key 不能重复使用。
- 多台设备可接入同一个 Agent。
- 请保持 Agent 版本与 Server 版本一致。
- 远控/投屏带宽较大，建议 Agent 使用有线网络。
:::

## 开始前：准备 4 样东西

1. 一台 **Mac 或 Linux** 电脑（会一直开着、插着测试手机的那台）。
2. **测试手机 + 数据线**（Android 真机，建议好线直插，别用扩展坞）。
3. **服务器地址**（形如 `10.2.3.9:3000`，找管理员要，就是平时打开测试平台的网址）。
4. **Agent Key**（管理员在平台「设备中心 → Agent 中心 → 新增」里生成的钥匙）。

> 无需管理员密码、无需装数据库——Agent 解压即用。

## 步骤 1：安装 Java 17

打开终端，先看本机 Java 版本：

```bash
java -version
```

输出显示 `17.x.x` 或更高即可，直接跳到步骤 2。没有的话用 Homebrew 安装：

```bash
# macOS
brew install openjdk@17
sudo ln -sfn /opt/homebrew/opt/openjdk@17/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-17.jdk
```

> Linux 请用对应发行版方式安装 OpenJDK 17（如 `sudo apt install openjdk-17-jdk`）。

## 步骤 2：下载 Agent 包并解压

先确认芯片类型：

```bash
uname -m
```

- `arm64` → Apple 芯片（M1/M2/M3/M4）
- `x86_64` → Intel 芯片

到团队发布页下载对应平台的 zip：

👉 [github.com/felixyang007/matrix-agent/releases](https://github.com/felixyang007/matrix-agent/releases)

- Apple 芯片选 `*macosx_arm64.zip`
- Intel 芯片选 `*macosx_x86_64.zip`
- Linux 选 `*linux_x86_64.zip`

解压后目录应包含这几样：

```text
sonic-agent-macosx-arm64.jar   config/   plugins/   mini/
```

> 本发布包已内置：adb 37.0.1、uiautomator2-server 10.6.2、Android 14+ 投屏补丁、scrcpy 1.23-patched 等。后文统称该目录为「工作目录」（如 `~/matrix-agent`）。

## 步骤 3：填写配置

编辑工作目录下的 `config/application-sonic-agent.yml`：

```yaml
sonic:
  agent:
    # 只自己浏览器看设备就填 127.0.0.1（最稳，不受换 IP 影响）；
    # 团队其他人也要看画面则填本机局域网 IP（ipconfig getifaddr en0 / ip addr）
    host: 127.0.0.1
    # Agent 投屏服务端口，一般不改
    port: 7777
    # 前端「Agent 中心」新增 Agent 时生成的 Key
    key: <你的 Agent Key>
  server:
    # 服务器 IP（管理员给的）
    host: 10.2.3.9
    # 服务器端口（默认 3000）
    port: 3000

# 未来会迁移到 server 配置；目前仍放这里
modules:
  ios:
    # WDA 的 bundleId（无 .xctrunner 后缀会自动补全）
    wda-bundle-id: com.sonic.WebDriverAgentRunner
    # WDA 的 xcode 工程路径（macOS 真机/模拟器需要）
    wda-xcode-project-path: ~/matrix-ios-wda/WebDriverAgent.xcodeproj
    # Xcode 模拟器模块（仅 macOS，需已装 Xcode）
    simulator:
      enabled: false
      poll-interval-seconds: 10
      fresh-instance-per-task: false
```

::: tip host 怎么填（最高频）
- **只有你自己在这台机器的浏览器看设备** → 填 `127.0.0.1`（强烈推荐：机器换 IP 永远有效，零维护）。
- **团队任何人都要看** → 填本机局域网 IP，并在路由器给这台机器做 DHCP 保留（固定 IP），否则机器换 IP 后投屏会失效。
:::

## 步骤 4：启动 Agent

```bash
cd ~/matrix-agent
nohup java -Dfile.encoding=utf-8 -Dspring.profiles.active=sonic-agent \
  -jar sonic-agent-*.jar > agent.log 2>&1 & disown
```

等 10 秒左右验证（两条都出现 = 成功）：

```bash
grep -E "server auth successful|Enable Android Module" agent.log
```

然后打开平台网页「设备中心 → Agent 中心」，对应 agent 应为**在线**状态。

## 步骤 5：接上手机

1. 手机：设置 → 关于手机 → 连点「版本号」7 次打开开发者模式 → 开发者选项 → 打开「USB 调试」。
2. 数据线连手机与电脑，手机弹「允许 USB 调试」时勾选**一律允许**。
3. 验证：

```bash
~/matrix-agent/plugins/adb devices -l
```

看到状态为 `device` 即认到了（`unauthorized` 表示没点授权）。等十几秒，平台「设备中心」里手机即变**在线**，点「远程控制」即可操作。

> Android 模拟器（Android Studio）开起来等同真机，自动识别；iOS 模拟器见下一节。

## 进阶：接入 iOS 模拟器（Xcode Simulator）

不想插 iPhone 真机时，Mac 上 Xcode 自带的模拟器也能跑 iOS 自动化（适合冒烟 / 快速回归）。模拟器会以「iOS + 模拟器标记」进入设备池，和真机一样远程看屏、装 App、跑用例。

> 前置条件：**Apple 芯片 Mac** + **Xcode 26.x** + 至少一个 iOS 模拟器 runtime（无需开发者账号，也无需 USB 连接）。

### 第 1 步：创建并启动模拟器（可一次开多个）

```bash
xcodebuild -version                # 确认 Xcode 已装
xcrun simctl list devices          # 看本机有哪些模拟器（runtime + 型号）
```

没有想要的机型就新建并 boot（**只有 boot 状态的模拟器才会被 agent 上报**）：

```bash
xcrun simctl create "Matrix-iOS-1" "com.apple.CoreSimulator.SimDeviceType.iPhone-15-Pro" iOS-18.0
# ↑ 输出一串 udid
xcrun simctl boot "<上面输出的 udid>"
```

> 一台 M 系 Mac 建议常开 **4–6 个**模拟器组成静态池；多个模拟器各自会有独立的 WDA 端口，互不冲突。

### 第 2 步：准备 WDA（WebDriverAgent）工程

模拟器跑自动化要经过 WDA。先克隆我们维护的仓库（已升级到 appium **16.12.8**，适配 Xcode 26）：

```bash
cd ~ && git clone git@github.com:felixyang007/matrix-ios-wda.git
# 克隆后工程路径 = ~/matrix-ios-wda/WebDriverAgent.xcodeproj
```

> 这是私有仓库。SSH 没配好就用 `https://github.com/felixyang007/matrix-ios-wda.git`（首次会弹 GitHub 登录）。都没权限就让管理员把 `matrix-ios-wda` 目录打包发你，解压到 `~/` 即可。
>
> 首次跑用例时 Agent 会自动 **build-for-testing 编译一次 WDA**（约 1–2 分钟），之后复用缓存。

### 第 3 步：配置模拟器模块

往 `config/application-sonic-agent.yml` 追加：

```yaml
modules:
  ios:
    wda-xcode-project-path: ~/matrix-ios-wda/WebDriverAgent.xcodeproj
    simulator:
      enabled: true                  # 打开模拟器发现与上报（默认 false）
      poll-interval-seconds: 10      # simctl list 轮询间隔（秒）
      fresh-instance-per-task: false # 每任务前是否把模拟器擦除回出厂态
```

| 参数 | 含义 | 建议 |
|---|---|---|
| `enabled` | 是否启用模拟器发现与上报 | 接模拟器时设为 `true` |
| `poll-interval-seconds` | 轮询 `simctl list` 发现/刷新模拟器的间隔 | 默认 `10` 即可 |
| `fresh-instance-per-task` | 每次跑测试前自动 `shutdown → erase → boot` 把模拟器清回出厂态（udId 不变） | **先设 `false` 跑通，需要干净环境再开 `true`**；erase 会清掉 App 与数据 |

> ⚠️ 若第 4 步报「找不到 WDA 工程」，把 `wda-xcode-project-path` 换成**完整绝对路径**：先 `cd ~/matrix-ios-wda && pwd`，用输出的路径（如 `/Users/tom/matrix-ios-wda/WebDriverAgent.xcodeproj`）替换 `~/...`。

### 第 4 步：重启 Agent 并确认

```bash
cd ~/matrix-agent
pkill -f "sonic-agent-.*\.jar"; sleep 2
nohup java -Dfile.encoding=utf-8 -Dspring.profiles.active=sonic-agent -jar sonic-agent-*.jar > agent.log 2>&1 & disown
sleep 10 && grep -E "Enable iOS Simulator module|server auth successful" agent.log
```

出现 `Enable iOS Simulator module` 即模拟器模块已加载；等一个轮询周期（默认 10 秒）后，平台「设备中心」会出现带「模拟器」小标的 iOS 设备。

### 接入后能做什么（能力清单）

| 能力 | 说明 |
|---|---|
| 远程看屏 | WDA MJPEG（9100）；模拟器直接 bind 本机 localhost，**无需 iproxy/USB** |
| 装 App / 起停 App | 通过 `simctl install/launch/terminate`，与真机操作入口一致 |
| 跑自动化用例 | 与真机流程完全一样，选中这台模拟器下发即可 |
| 系统日志 | 终端页走 `simctl log stream` |
| 模拟定位 | 走 `simctl location set` |
| 每任务全新实例 | 开 `fresh-instance-per-task` 后，测试前自动 `shutdown → erase → boot` |

### 已知限制

- **只能装 simulator 构建的包**：真机 arm64 IPA 无法在模拟器安装，需用 simulator 构建产物。
- **性能采集（perfmon）**：尚未支持模拟器。
- **WebView 调试**：`sib webinspector` 无 simctl 等价物，暂不支持。
- **终端进程列表**：`sib ps` 对应的 simctl 等价物暂未实现。
- 支付 / 推送 / 生物识别 / 风控类用例在模拟器上**行为不可信**，请走真机。

### 第一条冒烟验证

1. 「设备中心」出现该模拟器卡片：带「模拟器」小标、状态 ONLINE、分辨率正确（如 `1206x2622`）。
2. 点「远程控制」：能看到画面、能 tap/swipe、终端页有日志输出。
3. 上传一个 **simulator 包** 安装并 launch。
4. 新建 iOS 用例选中该模拟器下发，跑完看报告。
5. 开 `fresh-instance-per-task: true` 再跑一条，观察模拟器被 erase（App/数据清空）后仍在线。

## 常见问题（Q&A）

**Q1：Agent 连不上服务器（grep 没有 server auth successful）？**

1. 最常见是 **Agent Key 填错**：核对 yml 里的 key 与网页「Agent 中心」显示完全一致（复制粘贴，别手敲）。
2. **服务器地址不通**：浏览器打开 `http://服务器地址` 能进平台吗？不能 → 找管理员。
3. **重复启动**：一台机器只能一个 agent。`pgrep -fl sonic-agent` 应只有一个 java 进程。

**Q2：设备详情转圈 / 远程控制连不上画面？**

最常见是机器换过 IP：`ipconfig getifaddr en0`（Mac）与 yml 里 `agent.host` 不一致 → 改成当前 IP，或干脆填 `127.0.0.1`（只自己看），再重启 agent。

**Q3：投屏黑屏（页面能开）？**

Android 14+ 需要投屏补丁。新 agent 包已内置修复；老包跑补丁脚本：

```bash
tools/android14-scrcpy-fix/patch-agent-scrcpy.sh ~/matrix-agent --restart
```

**Q4：手机反复上线/掉线？**

1. 先查数据线（最高频）：换好线、直插、不走扩展坞。
2. 再查 adb 打架：系统另有版本不同的 adb 会互相踢下线，统一到 agent 自带版本；彻底方案是跑团队的 adb 升级脚本统一到 37.0.1。

**Q5：macOS 提示「无法验证开发者 / 已阻止使用」？**

「系统设置 → 隐私与安全性」对被拦项目点「仍要打开」即可，不要全局关闭 Gatekeeper。

**Q6：Mac 上启动有插件安全弹窗？**

同上，在「隐私与安全性」里对被拦项放行；也可 `sudo spctl --master-disable`（不推荐长期关闭）。

## 日常维护（3 招）

**重启 Agent（解决 80% 问题）**

```bash
cd ~/matrix-agent
pkill -f "sonic-agent-.*\.jar"; sleep 2
nohup java -Dfile.encoding=utf-8 -Dspring.profiles.active=sonic-agent -jar sonic-agent-*.jar > agent.log 2>&1 & disown
sleep 10 && grep "server auth successful" agent.log
```

**看日志**

```bash
tail -100 ~/matrix-agent/agent.log          # 最近 100 行
grep -i error ~/matrix-agent/agent.log      # 只看报错
```

**升级 Agent**

管理员发新 zip 后：解压 → 用里面的 `jar`、`plugins/` 覆盖工作目录（`config/` 别覆盖，配置在里面）→ 重启。或直接换完整新目录，重做第 3 步配置。

---

> Matrix 云真机平台 · Agent 部署指南 · 基于 sonic-agent v2.7.2 + Matrix 定制（adb 37.0.1 / uiautomator2 10.6.2 / scrcpy 1.23-patched）
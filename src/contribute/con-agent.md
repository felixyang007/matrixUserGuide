---
contributors:
- 'ZhouYixun'
---

# Agent端

本文将介绍如何搭建Agent端开发环境。 👉[Github地址](https://github.com/SonicCloudOrg/sonic-agent)

<div style="display: flex">
<img src="https://img.shields.io/github/stars/SonicCloudOrg/sonic-agent?style=social">
<img style="margin-left: 10px" src="https://img.shields.io/github/forks/SonicCloudOrg/sonic-agent?style=social">
<img style="margin-left:10px" src="https://img.shields.io/github/downloads/SonicCloudOrg/sonic-agent/total">
</div>

## 本仓库贡献者

<a href="https://github.com/SonicCloudOrg/sonic-agent/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=SonicCloudOrg/sonic-agent" />
</a>

## 搭建步骤

### v2.4.0后版本

**准备工作**：**jdk17**、Idea

1. Fork [sonic-agent](https://github.com/SonicCloudOrg/sonic-agent) 仓库。
2. 执行git clone指令，将您的仓库代码克隆到本地。
3. 根据注释修改config的application-sonic-agent.yml，主要更改server和Agent的`host`即可。
4. 默认plugins目录下缺少sonic-ios-bridge、sonic-android-supply和sonic-go-mitmproxy二进制文件，或者存在但是跟您开发环境的平台不一致，可以根据您的开发系统去仓库下载对应的包然后 **重命名** 为对应的名称。

::: tip 注意
版本要对应resources/application.yml下的版本哦，如果不想下载，将application-sonic-agent.yml的ios、use-sas和sgm的enable改为false。
:::
5. 如果idea启动，记得更改pom.xml中properties.platform的平台。（旧版本代码只需idea选择对应profile）
6. 启动AgentApplication。
7. 恭喜，搭建完毕！
8. 开发完毕后，push到自己的仓库，然后可以给Matrix原仓库提起pr哦！（建议贡献前先开启issue讨论，防止跟组织计划进度有冲突哦）

#### 打包

1. 更改pom.xml中properties.platform的平台。platform为您的平台，可选为 windows-x86, windows-x86_64, macosx-arm64, macosx-x86_64, linux-arm64, linux-x86, linux-x86_64
2. 执行命令
```bash
mvn package
```

### v2.4.0前版本

**准备工作**：**jdk15**、Idea

1. Fork [sonic-agent](https://github.com/SonicCloudOrg/sonic-agent) 仓库。
2. 执行git clone指令，将您的仓库代码克隆到本地。
3. 根据注释修改config的application-sonic-agent.yml，开发环境时，**sonic.server.port** 填写为gateway服务端口（默认为8094）。如果是开发环境的Agent连接生产环境的Server，还需将`pom.xml`中的`releaseMode`改为 **true**。
::: tip TIPS: 如果是v2.1.2以下版本
需要去掉 **org/cloud/sonic/agent/transport/TransportConnectionThread.java** 与 **org/cloud/sonic/agent/tools/file/UploadTools.java** url中的 **/server**
::: 
4. 默认plugins目录下缺少sonic-ios-bridge、sonic-android-supply和sonic-go-mitmproxy二进制文件，或者存在但是跟您开发环境的平台不一致，可以根据您的开发系统去仓库下载对应的包然后 **重命名** 为对应的名称。
::: tip 注意
版本要对应resources/application.yml下的版本哦，如果不想下载，将application-sonic-agent.yml的ios、use-sas和sgm的enable改为false。
:::
5. 如果idea启动，记得更改pom.xml中properties.platform的平台。（旧版本代码只需idea选择对应profile）
6. 启动AgentApplication。
7. 恭喜，搭建完毕！
8. 开发完毕后，push到自己的仓库，然后可以给Matrix原仓库提起pr哦！（建议贡献前先开启issue讨论，防止跟组织计划进度有冲突哦）

#### 打包

1. 更改pom.xml中properties.platform的平台。platform为您的平台，可选为 windows-x86, windows-x86_64, macosx-arm64, macosx-x86_64, linux-arm64, linux-x86, linux-x86_64
2. 执行命令
```bash
mvn package -DreleaseMode=true
```


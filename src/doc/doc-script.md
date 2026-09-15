---
contributors:
- 'ZhouYixun'
- 'mmagi'
- 'upengfei'
---

# 自定义脚本

使用自定义脚本执行UI自动化。（该功能需升级至Matrix v2.0.0版本）

## 一、Groovy(Java)脚本 （推荐🔥）

### 能力介绍

::: tip Matrix官方推荐原因
1. 可以直接使用Agent所有内置函数与变量。
2. Groovy引擎可以兼容Java语言，能与Java很好的结合，可以直接运行Java代码或者Groovy与Java混用。
3. Groovy语法简单，容易扩展，学习门槛低。
4. 直接运行在JVM上，无需配置额外环境。
5. 等等...
:::

#### 默认内置内容
执行自定义脚本前，会将基础StepHandler传入Groovy引擎。

包括但不限于：
1. log对象，可以操作测试报告输出文本
2. androidDriver，可以操作UIAutomator2-Server
3. iosDriver，可以操作Wda
4. 全局参数，可以对全局参数进行存取
5. Matrix的自定义步骤，可以直接复用
6. 其他，包括PocoDriver、设备信息等等
::: tip 更多内置方法可查看
[AndroidStepHandler](https://github.com/SonicCloudOrg/sonic-agent/blob/main/src/main/java/org/cloud/sonic/agent/tests/handlers/AndroidStepHandler.java)

[IOSStepHandler](https://github.com/SonicCloudOrg/sonic-agent/blob/main/src/main/java/org/cloud/sonic/agent/tests/handlers/IOSStepHandler.java)
:::
#### 扩展能力
StepHandler以外能力，可以直接import对应包或者直接引用进行实现。

包括但不限于：
1. RestTemaplate，可以进行Rest Api操作。
2. Java自带的Process，可以运行本地指令。
3. SibTool，用于使用sib的工具类。
4. AndroidDeviceBridgeTool，用于操作adb的部分工具类。
5. fastJson和其他包等等。

### 输出日志到测试报告

直接操作 **androidStepHandler.log** 使用
```groovy
androidStepHandler.log.sendStepLog(1, "我是普通日志", "步骤详细日志")
androidStepHandler.log.sendStepLog(2, "我是通过日志", "步骤详细日志")
androidStepHandler.log.sendStepLog(3, "我是告警日志", "步骤详细日志")
androidStepHandler.log.sendStepLog(4, "我是异常日志", "步骤详细日志")
```

入参分别为：**日志级别**、**步骤简述**、**步骤详细日志**

日志级别有四种，从1-4分别是：INFO、PASS、WARN、ERROR

也可以提取LogUtil和StepType使用，使脚本更有可读性
```groovy
import org.cloud.sonic.agent.tests.LogUtil;
import org.cloud.sonic.agent.common.interfaces.StepType;

def test(){
  LogUtil log = androidStepHandler.log
  log.sendStepLog(StepType.INFO,"Hello","world")
  log.sendStepLog(StepType.PASS,"Hello","world")
  log.sendStepLog(StepType.WARN,"Hello","world")
  log.sendStepLog(StepType.ERROR,"Hello","world")
}

test()
```

### 引用全局参数

全局参数默认存放在androidStepHandler.globalParams，是com.alibaba.fastjson.JSONObject对象。使用时可以直接
```groovy
String test = androidStepHandler.globalParams.getString("Hello")
androidStepHandler.log.sendStepLog(1, "获取全局参数Hello", "值：" + test)
```

::: tip
更多全局参数与临时参数运用可以参考 [这个帖子](https://sonic-cloud.wiki/d/2369)
:::

### 获取设备序列号

Android: 
```groovy
String udId = androidStepHandler.iDevice.getSerialNumber()
androidStepHandler.log.sendStepLog(1, "获取udId", "值：" + udId)
```

iOS: 
```groovy
String udId = iosStepHandler.udId
iosStepHandler.log.sendStepLog(1, "获取udId", "值：" + udId)
```

### 断言

有assertEquals、assertNotEquals、assertNull、assertNotNull等等方法可以直接使用

```groovy
import static org.testng.Assert.*;

assertEquals(1+1,2)
```

断言失败会抛出异常，并且自定义脚本步骤也会标记为失败

### 退出Driver

如果在您的第三方工具中有基于instrument的框架（例如fastbot、uiautomator2-python、poco-service等等），会跟Matrix已有进程冲突导致阻塞状态，这时我们可以先停止Matrix的Driver。

#### Android: 

AndroidDriver有两种方式关闭:
1. 用内置函数关闭（推荐）
```groovy
import org.cloud.sonic.agent.bridge.android.AndroidDeviceBridgeTool;
//停止Driver
androidStepHandler.getAndroidDriver().closeDriver()

//第三方操作
// xxxxxx

//重新启动Driver
int port = AndroidDeviceBridgeTool.startUiaServer(androidStepHandler.iDevice);
androidStepHandler.startAndroidDriver(androidStepHandler.iDevice, port)
```

2. 用adb强制停止instrument服务（不推荐）
```groovy
import org.cloud.sonic.agent.bridge.android.AndroidDeviceBridgeTool;
//停止UIAutomator2-server
AndroidDeviceBridgeTool.executeCommand(androidStepHandler.iDevice,"am force-stop io.appium.uiautomator2.server")
AndroidDeviceBridgeTool.executeCommand(androidStepHandler.iDevice,"am force-stop io.appium.uiautomator2.server.test")

//第三方操作
// xxxxxx

//重新启动Driver
int port = AndroidDeviceBridgeTool.startUiaServer(androidStepHandler.iDevice);
androidStepHandler.startAndroidDriver(androidStepHandler.iDevice, port)
```

#### iOS: 
```groovy
import org.cloud.sonic.agent.bridge.ios.SibTool;
//停止Driver
iosStepHandler.closeIOSDriver()

//第三方操作
// xxxxxx

//重新启动Driver
iosStepHandler.startIOSDriver(udId, SibTool.startWda(udId)[0]);
```


### 示例脚本展示

#### 调用第三方Rest API

以下是使用RestTemplate调用第三方Rest API后，对响应结果断言以及输出到测试报告的示例。

```groovy
import com.alibaba.fastjson.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.cloud.sonic.agent.tools.SpringTool;
import org.springframework.web.client.RestTemplate;
import org.cloud.sonic.agent.tests.LogUtil;
import org.cloud.sonic.agent.common.interfaces.StepType;

import static org.testng.Assert.*;

def testRestApi(){
      LogUtil log =  androidStepHandler.log
      RestTemplate restTemplate = SpringTool.getBean(RestTemplate.class)
      HttpHeaders headers = new HttpHeaders()
      headers.add("SonicToken", "xxxxxxx")
      JSONObject result = restTemplate.exchange("http://localhost:8094/api/controller/projects/list", HttpMethod.GET,new HttpEntity<>(headers),JSONObject.class).getBody()
      assertEquals(result.getInteger("code"),2000)
      log.sendStepLog(StepType.INFO,"rest api assert","result: "+result.toJSONString())
}

testRestApi()
```

#### adb shell操作

以下是对adb shell命令输出的示例，包括一次性输出以及持续性输出。

```groovy
import org.cloud.sonic.agent.bridge.android.AndroidDeviceBridgeTool;
import org.cloud.sonic.agent.tests.LogUtil;
import org.cloud.sonic.agent.common.interfaces.StepType;
import com.android.ddmlib.IShellOutputReceiver;
import java.util.concurrent.TimeUnit;

def test(){
        LogUtil log = androidStepHandler.log
        String out = AndroidDeviceBridgeTool.executeCommand(androidStepHandler.iDevice,"wm size")
        log.sendStepLog(StepType.INFO,"Get screen size",out)
}

def testLong(){
        LogUtil log = androidStepHandler.log
        androidStepHandler.iDevice.executeShellCommand("dumpsys window displays",
                        new IShellOutputReceiver() {
                            @Override
                            public void addOutput(byte[] bytes, int i, int i1) {
                                String res = new String(bytes, i, i1);
                                log.sendStepLog(StepType.INFO,"Dump windows msg",res)
                            }

                            @Override
                            public void flush() {
                            }

                            @Override
                            public boolean isCancelled() {
                                return false;
                            }
                        }, 0, TimeUnit.MILLISECONDS);
}

test()
testLong()
```

#### 执行fastbot
下方展示了如何执行fastbot并将日志持续输出到测试报告，注意：执行前确保设备上有fastbot相关的jar哦，详情可以查看fastbot文档。

因为fastbot底层与uia2的instrumentation有冲突（虽然Matrix后续会做处理，但是最好还是避免冲突），所以先执行了closeDriver()，运行完毕后，再重新startDriver()
```groovy
import org.cloud.sonic.agent.bridge.android.AndroidDeviceBridgeTool;
import org.cloud.sonic.agent.tests.LogUtil;
import org.cloud.sonic.agent.common.interfaces.StepType;
import com.android.ddmlib.IShellOutputReceiver;
import java.util.concurrent.TimeUnit;

def testFastbot(){
        LogUtil log = androidStepHandler.log
        androidStepHandler.getAndroidDriver().closeDriver()
        androidStepHandler.iDevice.executeShellCommand("CLASSPATH=/sdcard/monkeyq.jar:/sdcard/framework.jar:/sdcard/fastbot-thirdpart.jar exec app_process /system/bin com.android.commands.monkey.Monkey -p package_name --agent reuseq --running-minutes duration(min) --throttle delay(ms) -v -v",
                        new IShellOutputReceiver() {
                            @Override
                            public void addOutput(byte[] bytes, int i, int i1) {
                                String res = new String(bytes, i, i1);
                                log.sendStepLog(StepType.INFO,"FastBot log",res)
                            }

                            @Override
                            public void flush() {
                            }

                            @Override
                            public boolean isCancelled() {
                                return false;
                            }
                        }, 0, TimeUnit.MILLISECONDS);
        int port = AndroidDeviceBridgeTool.startUiaServer(androidStepHandler.iDevice);
        androidStepHandler.startAndroidDriver(androidStepHandler.iDevice, port)
}

testFastbot()
```

#### 运行本地command指令

以下是运行Agent本地PC指令和运行指令后持续输出指令结果到测试报告的示例。

```groovy
import org.cloud.sonic.agent.tests.LogUtil;
import org.cloud.sonic.agent.common.interfaces.StepType;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.BufferedReader;

def testCmd(){
            String system = System.getProperty("os.name").toLowerCase();
            if (system.contains("win")) {
                Runtime.getRuntime().exec("cmd /c calc");
            } else {
                Runtime.getRuntime().exec("sh -c echo Hello");
            }
}

def testCmdForLongTime(){
            LogUtil log =  androidStepHandler.log
            Process ps = null;
            String system = System.getProperty("os.name").toLowerCase();
            if (system.contains("win")) {
                ps = Runtime.getRuntime().exec("cmd /c calc");
            } else {
                ps = Runtime.getRuntime().exec("sh -c echo Hello");
            }
            InputStreamReader inputStreamReader = new InputStreamReader(ps.getInputStream());
            BufferedReader stdInput = new BufferedReader(inputStreamReader);
            String s;
            while (ps.isAlive()) {
                try{
                    if ((s = stdInput.readLine()) != null) {
                        log.sendStepLog(StepType.INFO,"ps msg",s)
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            stdInput.close();
            inputStreamReader.close();
}

testCmd()
testCmdForLongTime()
```

::: tip 更多参考示例
想参考更多脚本示例，可以前往 <a href="https://sonic-cloud.wiki/t/script" target="_blank">这里</a> 查看官方或用户分享的示例哦！
:::

## 二、Python脚本

### 能力介绍

::: info 对比Groovy脚本
Python不能作为Agent内置引擎，因此不可使用Agent内置的方法与包。Python脚本只能使用Agent传递的部分参数，并且依赖需要自行本地安装，与Groovy脚本相比灵活性大大降低。
:::
### 前置环境

Python环境、pip环境。

::: tip
注意！如果Agent部署在Windows系统，注意设置Python环境输出字符集为UTF-8以避免脚本输出内容乱码。在启动Agent前执行 
```bash
set PYTHONIOENCODING=UTF-8
``` 
为Python环境设置环境变量。
:::

### 可用参数

无论安卓还是iOS，Matrix会传递四个参数到Python脚本中，arg依次分别为：
1. sessionId。安卓为uia2的sessionId，iOS为wda的sessionId。
2. 设备udId。
3. 全局参数Json字符串。
4. 远程url地址（v2.5.3更新后可用）

### 退出Driver

如果在您的第三方工具中有基于instrument的框架（例如fastbot、uiautomator2-python、poco-service等等），会跟Matrix已有进程冲突导致阻塞状态，这时我们可以先停止Matrix的Driver。

#### Android: 

用adb强制停止instrument服务
```python
import os
udId = sys.argv[1:][1]
os.system("adb -s {udId} shell am force-stop io.appium.uiautomator2.server".format(udId))
os.system("adb -s {udId} am force-stop io.appium.uiautomator2.server.test".format(udId))
```

### 示例脚本展示

#### 直接用Matrix已启动的appium-uiautomator2-server测试

以下是直接用Matrix已启动的appium-uiautomator2-server测试的示例脚本。
```
pip install -U sonic-uia2-client
```

```python
import sys
import os
from common.models import AndroidSelector
from uia2.driver import AndroidDriver


def test_demo(adb_serial_num:str, uia_url:str):
    package_name = "com.android.settings"

    # 启动 App
    os.system(
        f"adb -s {adb_serial_num} shell monkey -p {package_name} -c android.intent.category.LAUNCHER 1")

    # 连接到已有 uia2 server
    driver = AndroidDriver(url=uia_url, session_id=session_id)
    p = driver.get_page_source()
    print(p)
    e = driver.find_element(AndroidSelector.XPATH, "//*[@text='设置']")
    if e is not None:
        print(e.get_text())
        e.send_keys("Hello")


if __name__ == '__main__':
    # uia_url 在 v2.5.3 更新后才有
    session_id, adb_serial_num, global_pramas, uia_url = sys.argv[1:]
    print(session_id, adb_serial_num, global_pramas, uia_url)
    test_demo(adb_serial_num, uia_url)
```
::: tip 更多参考示例
想参考更多脚本示例，可以前往 <a href="https://sonic-cloud.wiki/t/script" target="_blank">这里</a> 查看官方或用户分享的示例哦！
:::

## 导入模板

在【脚本模板】页面管理的脚本模板，可以在编辑时导入使用，导入有两种模式：
1. 追加，将模板追加到当前编辑脚本中
2. 替换，将模板替换当前编辑脚本

## 使用规范与建议

为了减少在使用时的维护成本，Matrix组织推荐脚本管理方式如下：

1. 将通用的方法/函数可以保存到【脚本模块管理】。
2. 使用脚本时使用导入模块，将方法/函数追加到当前脚本中，并引用。
3. 推荐重复引用的参数、方法提取出来维护。

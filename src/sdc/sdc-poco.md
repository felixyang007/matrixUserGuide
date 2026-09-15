---
contributors:
- 'ZhouYixun'
---

# PocoDriver

本文是PocoDriver文档。 API文档可前往：👉[Java Doc](https://s01.oss.sonatype.org/service/local/repositories/releases/archive/io/github/soniccloudorg/sonic-driver-core/1.1.29/sonic-driver-core-1.1.29-javadoc.jar/!/index.html)

## 设备前置配置

使用POCO前需确认游戏应用引擎已经接入对应POCO-SDK，教程可以参考 [这里](https://felixyang007.github.io/matrixUserGuide/document?tag=poco) 。

打包后，打开对应游戏引擎并转发Socket端口。 以安卓、Unity3D引擎为例：
```bash
adb forward tcp:5001 tcp:5001
```
然后就可以启动Driver
```bash
PocoDriver pocoDriver = new PocoDriver(PocoEngine.UNITY_3D);
```

## 更多文档建设中...

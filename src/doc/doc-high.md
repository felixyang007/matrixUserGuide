---
contributors:
- 'ZhouYixun'
---

# 进阶教学

本页为 **笔记App** 为例，介绍如何使用进阶UI自动化功能。

::: tip Matrix 说明
本手册是 Matrix（基于 Sonic v2.7.2 二次开发的云真机测试平台）的进阶教学章节。基本概念与操作与 Sonic 一致；Matrix 相对 Sonic 的增强点见下文的「Matrix 与 Sonic 的差异」。
:::

## 全局参数
当我们一个简单的UI自动化用例完成时，我们部分输入参数需要抽离出来维护。

1. 前往【全局参数】页面，添加新的全局参数。如参数名为 abc，内容为123456
2. 调整原输入步骤中的输入内容为新增的全局参数

![high-1](./images/high-1.png)

::: v-pre
当我们下发测试任务的时候，就会发现{{abc}}会替换为123456
:::

::: tip 提示
如果希望同一个参数名分发给不同设备时为不同的值，可以查看 [特殊用法](https://felixyang007.github.io/matrixUserGuide/doc/doc-global.html#%E7%89%B9%E6%AE%8A%E7%94%A8%E6%B3%95)

目前全局参数可用于：
- 控件信息
- 应用名、包名
- 输入文本
- WebView名称
- Handle名称
- 等等...

测试过程中，例如【获取文本】一类的结果也可以存放到临时参数里，后续也可以通过相同方式引用，达到参数传递的效果。
:::

## 公共步骤

当我们多个用例含有重复的步骤，我们可以提取为公共步骤进行维护。

::: tip 提示
详情可以查看 [公共步骤文档](https://felixyang007.github.io/matrixUserGuide/doc/doc-pub.html)
:::

## 配合Jenkins插件

如果希望Jenkins构建了apk或者ipa包之后，能自动上传到Matrix平台并进行批量安装、测试，可以使用 sonic-ci-helper-plugin

::: tip 提示
详情可以查看 [sonic-ci-helper-plugin使用文档](https://felixyang007.github.io/matrixUserGuide/sch/re-sch.html)
:::

## Matrix 与 Sonic 的差异

Matrix 在 Sonic 基础上对底层工具链做了升级与修复，用法上绝大部分一致，以下是主要差异：

| 模块 | Sonic 上游 | Matrix |
|---|---|---|
| Android 自动化引擎 | uiautomator2-server 5.7.4 | **10.6.2**（自维护 fork，移植回 7 个 legacy touch 端点，保证点击/手势/远控拖拽可用） |
| adb | 34.0.3 | **37.0.1**（统一版本，避免 adb server 互杀导致设备掉线） |
| 投屏 | scrcpy 1.23 | scrcpy 1.23 + **Android 14+ 黑屏补丁**（已固化进发布包） |
| iOS WDA | sonic-ios-wda | **matrix-ios-wda 16.12.8**（适配 Xcode 26 / iOS 26，另支持 iOS 模拟器） |
| 前端 | Sonic 品牌 | **Matrix 品牌 + 双主题** |
| 端侧辅助 App | sonic-android-apk 2.0.8 | 同版本，新增 **Android 15/16 兼容冒烟**（触摸注入实测通过） |

> 技术细节见仓库 `matrix-server/docs/TOOLCHAIN-AUDIT.md` 与 `matrix-appium-uiautomator2-server/FORK-NOTES.md`。

## 结语

简单的进阶教学就到这里了。更多 自定义脚本、迭代控件列表、切换WebView 等等有趣的功能可以前往【测试步骤相关】查看，可以按需使用。愿Matrix能给你带来友好的使用体验。

::: tip
更多疑问可前往 👉[GitHub](https://github.com/felixyang007)👈 交流
:::

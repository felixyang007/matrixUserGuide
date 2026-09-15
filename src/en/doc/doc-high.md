---
contributors:
- 'ZhouYixun'
---

# Advanced Teaching

This page uses **Note App** as an example to introduce how to use advanced UI automation functions.

::: tip Matrix note
This guide belongs to Matrix — a cloud device testing platform built on top of Sonic v2.7.2. Core concepts and workflows stay the same as Sonic; see the "Differences between Matrix and Sonic" section below for our changes.
:::

## Global parameters
When our simple UI automation use case is completed, some of our input parameters need to be extracted for maintenance.

1. Go to the [Global Parameters] page and add new global parameters. For example, the parameter name is abc, and the content is 123456
2. Adjust the input content in the original input step to the new global parameter

![high-1](./images/high-1.png)

::: v-pre
When we deliver the test task, we will find that {{abc}} will be replaced with 123456
:::

::: tip tip
If you want the same parameter name to have different values when distributed to different devices, you can check [Special Usage](https://felixyang007.github.io/matrixUserGuide/en/doc/doc-global.html#special-usage)

Currently global parameters are available for:
- Control information
- Application name, package name
- enter text
- WebView name
- Handle name
- etc...

During the test, results such as [Get Text] can also be stored in temporary parameters, and can be referenced in the same way later to achieve the effect of parameter passing.
:::

## Public steps

When our multiple use cases contain repeated steps, we can extract them as common steps for maintenance.

::: tip tip
For details, please refer to [Public Procedure Documentation](https://felixyang007.github.io/matrixUserGuide/en/doc/doc-pub.html)
:::

## Cooperate with Jenkins plugin

If you want Jenkins to build the apk or ipa package, it can be automatically uploaded to the Matrix platform for batch installation and testing, you can use sonic-ci-helper-plugin

::: tip tip
For details, please refer to [sonic-ci-helper-plugin documentation](https://felixyang007.github.io/matrixUserGuide/sch/re-sch.html)
:::

## Differences between Matrix and Sonic

Matrix upgrades and fixes the underlying toolchain on top of Sonic. Most usage is identical; key differences:

| Component | Sonic upstream | Matrix |
|---|---|---|
| Android automation engine | uiautomator2-server 5.7.4 | **10.6.2** (self-maintained fork, restores 7 legacy touch endpoints so click/gesture/live drag keep working) |
| adb | 34.0.3 | **37.0.1** (unified version, avoids adb server fights that drop devices) |
| Screen casting | scrcpy 1.23 | scrcpy 1.23 + **Android 14+ black-screen patch** (baked into release) |
| iOS WDA | sonic-ios-wda | **matrix-ios-wda 16.12.8** (Xcode 26 / iOS 26, plus iOS simulator support) |
| Frontend | Sonic branding | **Matrix branding + dual theme** |
| On-device helper app | sonic-android-apk 2.0.8 | same version, added **Android 15/16 compat smoke** (touch injection verified) |

> Technical details: `matrix-server/docs/TOOLCHAIN-AUDIT.md` and `matrix-appium-uiautomator2-server/FORK-NOTES.md`.

## Conclusion

The simple advanced teaching is here. For more interesting functions such as custom scripts, iterating control lists, switching WebViews, etc., you can go to [Test Steps Related] to view, and you can use them as needed. May Matrix bring you a friendly experience.

::: tip
For more questions, please go to 👉[GitHub](https://github.com/felixyang007)👈 to communicate
:::

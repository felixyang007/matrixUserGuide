---
contributors:
- 'ZhouYixun'
---

# Server端

本文将介绍如何搭建Server端开发环境。 👉[Github地址](https://github.com/SonicCloudOrg/sonic-server)

<div style="display: flex">
<a href='https://gitee.com/sonic-cloud/sonic-server/stargazers'><img src='https://gitee.com/sonic-cloud/sonic-server/badge/star.svg?theme=gvp' alt='star'></a>
<img style="margin-left: 10px" src="https://img.shields.io/github/stars/SonicCloudOrg/sonic-server?style=social"><img style="margin-left: 10px" src="https://img.shields.io/github/forks/SonicCloudOrg/sonic-server?style=social">
<img style="margin-left:10px" src="https://img.shields.io/github/downloads/SonicCloudOrg/sonic-server/total">
</div>

## 本仓库贡献者

<a href="https://github.com/SonicCloudOrg/sonic-server/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=SonicCloudOrg/sonic-server" />
</a>

## 搭建步骤

### v2.4.0后版本

**准备工作**：**jdk17**、Idea

1. Fork [sonic-server](https://github.com/SonicCloudOrg/sonic-server) 仓库。
2. 执行git clone指令，将您的仓库代码克隆到本地。
3. 根据注释修改/sonic-server-common下resources的yml，特别是mysql的配置。
4. 依次启动EurekaApplicaiton、ControllerApplication、GatewayApplication、FolderApplication。
5. 恭喜，搭建完毕！
6. 开发完毕后，push到自己的仓库，然后可以给Matrix原仓库提起pr哦！（建议贡献前先开启issue讨论，防止跟组织计划进度有冲突哦）
7. 每次本地开发环境更新版本，需前往【后台管理中心】 -> 【同步资源】

### v2.4.0以前版本

**准备工作**：**jdk15**、Idea

1. Fork [sonic-server](https://github.com/SonicCloudOrg/sonic-server) 仓库。
2. 执行git clone指令，将您的仓库代码克隆到本地。
3. 根据注释修改/sonic-server-common下resources的yml，特别是mysql的配置，开发环境还需将application-sonic-server-folder.yml文件内的url的 **/server** 暂时隐藏。
::: tip 在v2.2.1版本以前，还需在编辑器的启动配置中加上以下vm options参数：
```
--add-exports java.naming/com.sun.jndi.ldap=ALL-UNNAMED
```
:::
4. 依次启动EurekaApplicaiton、ControllerApplication、GatewayApplication、FolderApplication。
5. 恭喜，搭建完毕！
6. 开发完毕后，push到自己的仓库，然后可以给Matrix原仓库提起pr哦！（建议贡献前先开启issue讨论，防止跟组织计划进度有冲突哦）
7. 每次本地开发环境更新版本，需前往【后台管理中心】 -> 【同步资源】

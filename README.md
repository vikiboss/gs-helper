![gs-helper](https://socialify.git.ci/vikiboss/gs-helper/image?description=1&font=Source%20Code%20Pro&forks=1&issues=1&logo=https%3A%2F%2Fraw.githubusercontent.com%2Fvikiboss%2Fgs-helper%2Fmain%2Fsrc%2Fassets%2Ficon.png&name=1&owner=1&pattern=Circuit%20Board&pulls=1&stargazers=1&theme=Auto)

中文 | [English](README-en.md)

### 起因

参考这篇文章：[爆肝数月后，我写了一个开源原神工具《原神助手》](https://blog.viki.moe/genshin/)

### 介绍

「原神助手」 是一个为 _《原神》_ 玩家精心编写的开源小工具，基于 [Electron](https://www.electronjs.org) 与 [React](https://reactjs.org)，支持祈愿分析、查看便签状态和获取游戏详细数据等。

这个小工具的开发初衷是**希望将原神玩家需要的多数功能进行整合，提升游戏效率与游戏体验**。软件界面设计参考了**原神**游戏本体及**米游社**，大部分内容与素材来源于米游社。

本工具仅提供 Windows 和 macOS 的成品版本，其他版本需自行在对应平台编译使用，不保证一致性。

### 下载

当前最新版本：v1.2.4，[点此查看更新日志](https://github.com/vikiboss/gs-helper/releases)。

**Windows 版：**

- [GitHub](https://github.com/vikiboss/gs-helper/releases/download/v1.2.4/GenshinHelper-win32-x64-1.2.4.zip)
- [蓝奏网盘（国内推荐）](https://viki.lanzout.com/idkaC0nj5nmd)

**macOS 版：**

- [GitHub](https://github.com/vikiboss/gs-helper/releases/download/v1.2.4/GenshinHelper-darwin-arm64-1.2.4.zip)

> 如果对你有帮助，希望能点个不要钱的 star，这对我很重要，阿里嘎多~

### 软件界面展示

> 注：截图仅供参考，随着版本的更新，界面布局和功能可能会有差异。

![UfQet4gjJK.png](https://s2.loli.net/2023/02/11/qd2SGzseRUgXYbN.png)
![e3Dp6132rI.png](https://s2.loli.net/2023/02/11/uKc5wJnPlsVRE8Y.png)
![6p4KkYnDDf.png](https://s2.loli.net/2023/02/11/97PImfcqGN1AxgD.png)
![oNRKjoEVio.png](https://s2.loli.net/2023/02/11/rtyZMUVmpQ9slD3.png)
![9jrhUSARhR.png](https://s2.loli.net/2023/02/11/GgmDrFtSui423XW.png)
![SGIqUsmBjp.png](https://s2.loli.net/2023/02/11/JndFciuOhslzkqR.png)
![7dsrhUSARhR.png](https://s2.loli.net/2023/02/11/SfQtOEy2aknjo96.png)
![uI192VhQWQ.png](https://s2.loli.net/2023/02/11/RWSN3vGYfAJPhi5.png)
![QeDdlF0t6b.png](https://s2.loli.net/2023/02/11/Y7NkoOtsumfTi1C.png)
![4rsF5eV4bc.png](https://s2.loli.net/2023/02/11/2GIJUgDhXxi3ROc.png)
![vVFN3cqICK.png](https://s2.loli.net/2023/02/11/Mtvj8XVsSOouA13.png)
![3evdEeXEY4.png](https://s2.loli.net/2023/02/11/RVnsHvfzDXMhZet.png)
![p2ie9z9H1F.png](https://s2.loli.net/2023/02/11/kWp78ioanJfyB2G.png)
![yBqHkxRI4S.png](https://s2.loli.net/2023/02/11/TDnP8BLfWRKai1k.png)

> 待补充...

### 关于祈愿链接

#### 什么是祈愿链接

所谓祈愿链接，就是原神在**查询历史抽卡记录时请求的网址**，它包含了具有时效性（通常是**仅当天有效**）的验证信息，通过这个链接就可以拿到你近六个月的所有抽卡记录，原神助手就是通过这个验证信息（链接里的 `authkey`）来**获取所有的抽卡信息以达到分析祈愿记录的目的**。

#### 如何获取祈愿链接

如果你是在 Windows 平台上游玩原神并且当前使用的电脑上安装了原神，那么你可以：

1. 打开原神，进入祈愿页面，点击历史记录，并往后翻几页等待数据加载完
2. 进入原神助手的祈愿分析页，点击**读取链接**按钮，顺利的话，会自动填充祈愿链接
3. 如果点击完按钮没有填充，请继续按照以下步骤进行操作：

- 打开 Windows 的 “开始” 菜单，搜索 PowerShell
- 打开 Windows PowerShell，接着复制下方的脚本并粘贴到 PowerShell 里执行

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex "&{$((New-Object System.Net.WebClient).DownloadString('https://gist.githubusercontent.com/MadeBaruna/1d75c1d37d19eca71591ec8a31178235/raw/702e34117b07294e6959928963b76cfdafdd94f3/getlink.ps1'))} china"
```

> 要查看这个脚本的具体内容，点击[这里](https://gist.github.com/MadeBaruna/1d75c1d37d19eca71591ec8a31178235)

顺利的话，会自动检索链接并复制到剪切板。

如果你电脑没有安装原神或者你习惯在其他平台游玩，请自行搜索链接获取方式。

### 本地开发

开发环境要求：

- `Node.js` >= 16
- `Git`

> 推荐使用 `pnpm` 包管理器来管理 `Node.js` 依赖

```bash
# 使用 Git 将本项目 clone 到本地
git clone git@github.com:vikiboss/gs-helper.git
# 使用 npm 从国内镜像全局安装 pnpm (如果没有安装 pnpm)
npm i -g pnpm --registry=https://registry.npmmirror.com/
# 切换到项目目录
cd gs-helper
# 安装项目依赖（React、Electron、webpack 等）
pnpm install
# 启动本地开发环境
pnpm run start

# 构建项目
pnpm run package
# 构建并打包项目为 zip 压缩包
pnpm run make
```

## 声明

- 软件不收集任何用户数据，所有操作产生的数据均保存在用户本地，源码公开透明。
- UI 参考了原神游戏本体及米游社，引用的素材版权归 「米哈游或原作者」 所有。
- 软件完全免费，使用 [GPL-3.0](LICENSE) 协议开放源代码，禁止用于任何商业行为。
- 如有发现任何实质性的侵权行为，请联系[开发者](https://github.com/vikiboss)对相关内容进行删除。

## 欢迎加入原神助手 QQ 群

打不过就进来摇人，吹水也欢迎~

![group](./src/assets/group-qrcode.png)

### License

- [GPL-3.0](LICENSE) License © 2022-PRESENT Viki

![gs-helper](https://socialify.git.ci/vikiboss/gs-helper/image?description=1&font=Source%20Code%20Pro&forks=1&issues=1&language=1&logo=https%3A%2F%2Fgithub.com%2Fvikiboss%2Fgs-helper%2Fblob%2Fmain%2Fsrc%2Fassets%2Ficon.png%3Fraw%3Dtrue&owner=1&pattern=Circuit%20Board&pulls=1&stargazers=1&theme=Light)

中文 | [English](README-en.md)

### 起因

参考[这篇文章](https://viki.moe/genshin/)

### 介绍

一个为 _《原神》_ 玩家精心编写的开源小工具，基于 [Electron](https://www.electronjs.org/) 和 [React](https://reactjs.org/)。支持**祈愿分析**、查看**便签状态**和获取**游戏详细数据**等。

开发初衷是**将原神玩家所需要的多数功能整合到一起，提升游戏效率与体验**。软件界面设计参考了**原神**游戏本体及**米游社**，大部分内容与素材来源于米游社，仅用于学习交流使用，版权归米哈游或原作者所有。

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

如果你电脑没有安装原神或者你习惯在其他平台游玩，请自行搜索链接获取方式。（其他平台都比较繁琐，建议在 PC 端获取）

### 界面展示

> 注意：此处截图仅供参考，不代表最终结果，随着版本更新可能会有差异。

![QmLFZdccLz.png](https://s2.loli.net/2022/11/03/ycCK9j6usTDGw4x.png)
![I57GlfU2Lz.png](https://s2.loli.net/2022/11/03/naYy6ErA2I9Hime.png)
![ZrqXfwAM4T.png](https://s2.loli.net/2022/11/03/pTusGBjILriAtU5.png)
![j69gtZpbv7.png](https://s2.loli.net/2022/11/03/OBNsou9JqgXykx5.png)
![2F1bql0fwj.png](https://s2.loli.net/2022/11/03/6i4VsAbJCGtXNoa.png)
![zoFlauKiRE.png](https://s2.loli.net/2022/11/03/oUQGOvCNzsIPy6j.png)
![jb1qxLm734.png](https://s2.loli.net/2022/11/03/IoHdYgAtLa7r8x3.png)
![z1IC1Uxffs.png](https://s2.loli.net/2022/11/03/wforK6cJRZ5VuHB.png)
![4R91zrWYHc.png](https://s2.loli.net/2022/11/03/uOmrsJxFtWnCSpU.png)
![SdXwgPm9cq.png](https://s2.loli.net/2022/11/03/5oqsmURpLTAXi7E.png)

> 待补充...

### 下载

当前最新版本为 v1.2.1 Beta。

**下载 v1.2.1 Beta（压缩包约 97 MB）**

- [蓝奏云](https://viki.lanzout.com/i0bG80jfxp7a)

### 本地开发

环境要求：

- 建议 `Node.js` >= 16
- `Git`
- 推荐使用 `pnpm` 包管理器来管理 `Node.js` 依赖

```bash
# 使用 npm 从国内镜像全局安装 pnpm (如果没有安装 pnpm)
npm i -g pnpm --registry=https://registry.npmmirror.com/
# 使用 Git 将本项目 clone 到本地
git clone git@github.com:vikiboss/gs-helper.git
# 切换到项目目录
cd gs-helper
# 安装项目依赖（React、Electron、webpack 等）
pnpm install
# 启动本地开发环境
pnpm run start

# 构建项目
pnpm run package
# 构建并打包项目
pnpm run make
```

### License

- [MIT](LICENSE) License © 2022-PRESENT Viki

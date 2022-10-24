![genshin-helper](https://socialify.git.ci/vikiboss/genshin-helper/image?description=1&font=Source%20Code%20Pro&forks=1&issues=1&language=1&logo=https%3A%2F%2Fgithub.com%2Fvikiboss%2Fgenshin-helper%2Fblob%2Fmain%2Fsrc%2Fassets%2Ficon.png%3Fraw%3Dtrue&owner=1&pattern=Circuit%20Board&pulls=1&stargazers=1&theme=Light)

中文 | [English](README-en.md)

### 介绍

一个为 _《原神》_ 玩家精心编写的开源小工具，基于 [Electron](https://www.electronjs.org/) 和 [React](https://reactjs.org/)。支持**原神签到**、**祈愿分析**、查看**便签状态**和**游戏详细数据**等。

开发初衷是**将原神玩家所需要的多数功能整合到一起，提升游戏效率与体验**。软件界面设计参考了**原神**游戏本体及**米游社**，大部分内容与素材来源于米游社，仅用于学习交流使用，版权归米哈游或原作者所有。

### 界面展示

> 注意：此处截图仅供参考，不代表最终结果，随着版本更新可能会有差异。

![home.png](https://s2.loli.net/2022/10/07/OAjsXDKyGJIVe7C.png)
![detail.png](https://s2.loli.net/2022/10/07/ahJ6eKdbXfVLWUy.png)
![gacha-1.png](https://s2.loli.net/2022/10/07/5o1a2QNJvH6ZiTF.png)
![gacha-2.png](https://s2.loli.net/2022/10/07/9QSqfOYmZKTH7MC.png)
![daily.png](https://s2.loli.net/2022/10/07/UWzSKCvt2NHQ59e.png)

> 待补充...

### 下载

- `v1.1.3` 测试版，[各版本更新日志](https://github.com/vikiboss/genshin-helper/releases)
  - GitHub：https://github.com/vikiboss/genshin-helper/releases/download/1.1.3/genshin-helper-win32-x64-1.1.3.zip
  - 蓝奏云：https://viki.lanzout.com/i687i0dd32da

### Star 历史

[![Star History Chart](https://api.star-history.com/svg?repos=vikiboss/genshin-helper&type=Date)](https://star-history.com/#vikiboss/genshin-helper&Date)

### 本地开发

环境要求：

- 建议 `Node.js` >= 16
- `Git`
- 推荐使用 `pnpm` 包管理器来管理 `Node.js` 依赖

```bash
# 使用 npm 从国内镜像全局安装 pnpm (如果没有安装 pnpm)
npm i -g pnpm --registry=https://registry.npmmirror.com/
# 使用 Git 将本项目 clone 到本地
git clone git@github.com:vikiboss/genshin-helper.git
# 切换到项目目录
cd genshin-helper
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

- [MIT](LICENCE) License © 2022-PRESENT Viki

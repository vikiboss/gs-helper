![genshin-helper](https://socialify.git.ci/Vikiboss/genshin-helper/image?description=1&font=Source%20Code%20Pro&forks=1&issues=1&language=1&logo=https%3A%2F%2Fgithub.com%2FVikiboss%2Fgenshin-helper%2Fblob%2Fmain%2Fsrc%2Fassets%2Ficon.png%3Fraw%3Dtrue&owner=1&pattern=Circuit%20Board&pulls=1&stargazers=1&theme=Light)

中文 | [English](README-en.md)

> 🚧 请注意：本项目仍在开发中。

### 介绍

一个为 _《原神》_ 玩家精心编写的开源小工具，基于 [Electron](https://www.electronjs.org/) 和 [React](https://reactjs.org/)。

> [_《原神》_](https://ys.mihoyo.com/) 是由 [米哈游](https://www.mihoyo.com/) 公司制作发行的一款开放世界冒险游戏。

### 下载

- `v1.1.1` 测试版，[更新日志](https://github.com/Vikiboss/genshin-helper/releases/tag/1.1.1)
  - [GitHub](https://github.com/Vikiboss/genshin-helper/releases/download/1.1.1/genshin-helper-win32-x64-1.1.1.zip)
  - [蓝奏云](https://viki.lanzout.com/iEAlK092z21a)

### 进度

- [x] 完善首页 UI 布局
- [x] 完善关于页 UI 布局
- [x] 完善登录页 UI 布局
- [x] 自动获取本地祈愿链接
- [x] 通过链接获取所有祈愿记录
- [x] 可视化展示与分析祈愿数据
- [x] 获取米游社绑定的游戏账号信息
- [x] 支持多账号快速切换
- [x] 检测验证信息有效性
- [x] 获取米游社签到奖励列表
- [x] 获取米游社签到状态
- [x] 进行米游社签到
- [x] 对接米游社实时便签
  - 原粹树脂
  - 委托任务
  - 洞天财翁
  - 探索派遣
  - 周本状态
- [x] 获取并展示当天原神日历（当天可获取材料）
- [x] 获取原神所有角色的圣遗物和武器数据
- [x] 完善角色详情页，添加动画交互
- [x] 获取并可视化展示旅行者札记数据
  - 当天、前一天的原石和摩拉数据
  - 近三个月的原石和摩拉数据
- [x] 完善其他旅行者工具页面 UI
- [x] 获取个人原神游戏详细数据
  - 游戏活跃数据
  - 角色信息
  - 地图探索数据
  - 尘歌壶数据
- [x] 获取原神游戏深境螺旋信息
  - 对战记录
  - 使用的角色
  - 历史战绩
- [x] 获取他人账号的概览信息
  - 游戏角色名
  - 活跃天数
  - 深渊螺旋
  - 成就数
  - 角色数
- [x] 重构祈愿分析页 UI
- [x] 完善数据分析、展示、预测等功能
- [ ] 米游社定时签到
- [ ] 自动完成米游社米游币任务
- [ ] 完善设置页 UI 布局
- [ ] 完善设置选项与功能

### 界面展示

> 注意：项目仍在开发中，细节及部分页面的设计仍在调整当中，此处截图仅供参考，不代表最终发布的样式。

如果界面图加载不出来，请科学上网后刷新页面。

![demo1](docs/imgs/demo1.png)
![demo3](docs/imgs/demo3.png)
![demo19](docs/imgs/demo19.png)
![demo17](docs/imgs/demo17.png)
![demo18](docs/imgs/demo18.png)
![demo2](docs/imgs/demo2.png)
![demo4](docs/imgs/demo4.png)
![demo5](docs/imgs/demo5.png)
![demo6](docs/imgs/demo6.png)
![demo7](docs/imgs/demo7.png)
![demo8](docs/imgs/demo8.png)
![demo9](docs/imgs/demo9.png)
![demo10](docs/imgs/demo10.png)
![demo11](docs/imgs/demo11.png)
![demo12](docs/imgs/demo12.png)
![demo13](docs/imgs/demo13.png)
![demo14](docs/imgs/demo14.png)
![demo15](docs/imgs/demo15.png)
![demo16](docs/imgs/demo16.png)
![demo20](docs/imgs/demo20.png)

> 待补充...

### 本地开发

```bash
# clone 项目
git clone git@github.com:Vikiboss/genshin-helper.git
# 切换到项目目录
cd genshin-helper
# 安装依赖
npm i
# 启动本地开发环境
npm start
```

### 本地构建

```bash
# clone 项目
git clone git@github.com:Vikiboss/genshin-helper.git
# 切换到项目目录
cd genshin-helper
# 安装依赖
npm i
# 构建项目
npm run package
# 构建并打包项目
npm run make
```

### Licence

- [MIT](LICENCE)

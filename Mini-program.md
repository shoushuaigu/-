#小程序开发
## [官方文档](https://developers.weixin.qq.com/miniprogram/dev/framework/quickstart/code.html#JSON-%E9%85%8D%E7%BD%AE)
### 介绍
- JS-SDK 解决页面开发所需微信接口等问题后,进一步解决性能,体验问题,出现了小程序
- 与页面不同,渲染线程和脚本线程分别运行在不同的线程中,逻辑层和渲染层是分开的,缺少相关的DOM API和BOM API
###[全局配置app.json](https://developers.weixin.qq.com/miniprogram/dev/reference/configuration/app.html)


## [wepy[发音:wepi] (微信官方框架)](https://wepyjs.github.io/wepy-docs/2.x/#/)
### 安装
- 安装命令行工具
```
npm install @wepy/cli -g
````
- 生成开发实例
```
wepy init standard myproject
```
- 安装依赖,编译,监听
```
npm install
npm run dev
wepy build --watch
```
- 微信开发者工具导入项目即可
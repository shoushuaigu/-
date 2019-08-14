#[webpack 4.x](https://www.webpackjs.com/concepts/)
>约定大于配置概念(默认入口src/index.js,输出到dist/,等...)
##[安装](https://segmentfault.com/a/1190000014159004)
> -g 全局安装
> -S (--save) 生产环境
> -D (--save-dev) 开发环境
- 全局安装
```node
//全局安装后能在命令行直接使用webpack命令
//不建议全局安装,因为不在项目本地安装的话可能导致webpack的版本号不统一
npm install -g webpack webpack-cli
```
- 局部安装
```node
//局部安装不能直接用webpack命令
1.需要npm init 或者又package.json文件时
2.npm install -D webpack webpack-cli
3.在package.json中添加scripts命令
4."scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "webpack": "webpack"    //通过npm run webpack执行命令(此为初级简单配置,后期会根据自建的webpack.config.js等配置命令)
  },
5.npm i  webpack-dev-server -D //热更新
```

##卸载
```node
npm uninstall -g webpack webpack-cli    //全局卸载
npm uninstall webpack webpack-cli       //本地卸载
```
##依赖,插件
- webpack-dev-server
```json
开发环境微服务-热更新
npm i  webpack-dev-server -D
// package.json
"scripts":{
    "dev":"webpack-dev-server --open --hot" //--加参数(打开浏览器,热更新)
}
```
- html-webpack-plugin
```js
// index.html引入相关,将html放到内存,配合热更新
// js、css注入(文件带有hash时,确保变化后还能正确引入)
// webpack.config.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlPlugin = new HtmlWebpackPlugin({
    template:path.join(__dirname,'./src/index.html'),    //模板文件
    filename:'index.html',  //设置在打包后的名称
    title:'页面的title',
    inject:'head'   //注入js的位置,head|body|true|false,true=body,false表示不注入,要手动引入
})
module.exports = {
    plugins:[HtmlPlugin]
}
```
##webpack配置文件
- webpack.config.js(未作拆分,简单配置)
```js
// webpack.config.js
// require()相关模块,插件
module.exports = {  //暴露配置信息
    entry:'./src/index',    //入口文件,不写默认src/index.js
    output:{    //打包输出设置
        path:path.resolve(__dirname,'./dist),   //输出路径
        filename:'./index[hash].js',    //js文件名称,带有hash值
        hashDigestLength:8  //设置hash值长度
    },
    devServer:{     //微服务器设置(webpack-dev-server)
        contentBase: path.join(__dirname, "../dist"), //网站的根目录为 根目录/dist
        port: 9000, //端口改为9000
        host: 'localhost', //如果指定的host，这样同局域网的电脑或手机可以访问该网站,host的值在dos下使用ipconfig获取 
        open:true, // 自动打开浏览器
        index:'index.html', // 与HtmlWebpackPlugin中配置filename一样
        inline:true, // 默认为true, 意思是，在打包时会注入一段代码到最后的js文件中，用来监视页面的改动而自动刷新页面,当为false时，网页自动刷新的模式是iframe，也就是将模板页放在一个frame中
        hot:true,
        compress:true //压缩
    },
    plugins:[htmlPlugin],   //插件
    module:{    //第三方模块,loader
        rules:[
            {
                test:/\.js|jsx$/,       //js或jsx结尾文件
                use:'babel-loader',     //loader
                exclude:/node_modules/  //排除node_modules文件夹
            }
        ]
    }
}
```

##[package.json相关配置](http://javascript.ruanyifeng.com/nodejs/packagejson.html)



##babel包
>npm i -D ...
- babel-core    ;核心
- babel-loader  ;loader
- 插件plugins
    - babel-plugin-transform-runtime
        - 更全面的编译 如 Generator, Set, 或者一些方法、新特性
- 语法presets
    - babel-preset-env
        - 告诉babel只编译批准的内容，相当于babel-preset-es2015, es2016, es2017及最新版本。通过它可以使用最新的js语法
    - babel-preset-react
        - jsx语法
    - babel-preset-stage-0
        - 兼容更高特性
##Babel配置
>.babelrc文件中配置,json格式
```json
{
    "presets":["env","stage-0","react"],    //语法
    "plugins":["transform-runtime"]         //插件
}
```
#CSS常用样式和兼容问题
####input相关
```css
/* 苹果input按钮显示异常 */
    input[type=button], 
    input[type=submit], 
    input[type=file], 
    button { cursor: pointer; -webkit-appearance: none; }
    
/* placeholder添加样式 */
    input::-webkit-input-placeholder{
        color: #000;opacity:1;
    }
```

####背景色渐变
>*[参考链接](http://www.runoob.com/css3/css3-gradients.html)*
```css
/* 线性渐变（Linear Gradients）- 向下/向上/向左/向右/对角方向
径向渐变（Radial Gradients）- 由它们的中心定义 */

/* ---左右 */
background: -webkit-linear-gradient(left, red , blue); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(right, red, blue); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(right, red, blue); /* Firefox 3.6 - 15 */
  background: linear-gradient(to right, red , blue); /* 标准的语法 */
/* ---对角 */
background: -webkit-linear-gradient(left top, red , blue); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(bottom right, red, blue); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(bottom right, red, blue); /* Firefox 3.6 - 15 */
  background: linear-gradient(to bottom right, red , blue); /* 标准的语法 */
```
####文本溢出、隐藏
```css
/* 1.溢出部分显示省率号(固定宽高) */
{
    white-space:nowrap;
    text-overflow:ellipsis;
    overflow:hidden;
}
```
![](images/文本溢出-1.png)
___
```css
/* 2.溢出部分隐藏,但铺满(固定宽高) */
{
    white-space: nowrap;
    word-break: keep-all;
    overflow: hidden;
}
```
![](images/文本溢出-2.png)
___
```css
/* 3.控制行数,溢出部分显示省率号(不能设置固定高度) */
{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
}
```
![](/images/文本溢出-3.png)
```css
/*数字字母自动换行*/
{word-break:break-all;}
```
___

####去除滚动条
```css
    textarea::-webkit-scrollbar {
        width: 0px;
    }
```
####面试小知识点
- 选择器 样式级别
- !important > 内联 > id > class > 属性 > 标签
- * 子代 后代 伪类 相邻
- h1+p{
            /* 作用于与h1相邻的p标签 */
            margin-top: 100px;
        }
- css的盒模型   content border padding margin
    - 标准盒模型：width、height只包含content内容区
    - 怪异盒模型：width、height包含content、padding、border
    - 兼容: 加上doctype声明，让浏览器使用标准模式;用box-sizing
- css文本效果 text-shadow:5px 5px 5px #ccc;
- css文本溢出隐藏 
```
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
```
- css3有哪些新特性？
1）CSS3 实现圆角（border-radius:8px;），
2）阴影（box-shadow:10px）,
3）对文字加特效（text-shadow）,
4）线性渐变（gradient），
5）旋转（transform）,
6）transform:rotate(9deg) scale(0.85,0.90) translate(0px,-30px) skew(-9deg,0deg);//旋转，缩放，定位，倾斜 ,
7）增加了更多的 css 选择器 ,
8）多背景 rgba ,

- 可继承和不可继承样式
```
可继承: visibility cursor
行内元素继承: font-size font-family color line-height  font-weight
块级元素:text-indent text-align
列表元素:list-style
```
- 定位 static relative absolute fixed
- 清除浮动
```
1.父元素:
.clearfloat:after{
    display:block;
    clear:both;
    height:0;
    content:'';
    visibility:hidden;
}
.clearfloat{
    zoom:1
}
2.最后一个浮动元素后加空div设置clear:both
3.父元素设置高度
4.父元素设置overflow:hidden|auto;
```
- css优化
    - 避免后代,链式选择器
    - 避免重复,不必要的命名空间
    - 避免important
    - 使用紧凑的语法
- 常见兼容问题
    - 默认margin和padding不同,需重置
    - IE6双边距问题同时设置float和margin时,解决:设施display:inline
    - IE9不能用opacity
    - img默认边距:float或block
    - 标签高度小于10px时IE6 IE7会超出自身高度:overflow:hidden或line-height小于高度

#### display:flex [阮一峰讲解](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
    - [兼容问题](https://www.cnblogs.com/yangjie-space/p/4856109.html)
```
父元素(容器)属性:
    flex-direction: row | row-reverse | column | column-reverse;    //方向默认row,水平左到右
    flex-wrap:  nowrap | wrap | wrap-reverse;   //换行,默认不换|换|换且第一行在下方
    flex-flow:  row nowrap  //是前两个的简写
    justify-content:flex-start | flex-end | center | space-between | space-around;  //x轴对齐方式
    align-items:flex-start | flex-end | center | baseline | stretch;    //不换行,只有一个x轴时,y轴对齐方式
    align-content:flex-start | flex-end | center | space-between | space-around | stretch;  //有换行,多x轴时起作用

子元素(项目)属性:
    order:0|1|2|3...  //属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。
    flex-grow:0|1|2...    //放大属性,默认0,即存在剩余空间也不放大沾满,两个项目都是1则评分,1,2则按比例评分
    flex-shrink:1|0   //缩小属性,默认1,即空间不足,项目会缩小,0时不缩小
    flex-basis:auto|width|height  //它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。
    flex:grow|shrink|basis  //0|1|auto 后两个可选
    align-self:auto | flex-start | flex-end | center | baseline | stretch   //单独这是某个项目的对齐方式,默认auto表示继承父级
```

#### [媒体查询](https://blog.csdn.net/tangxiong0927/article/details/77884792)
@media 媒体类型 and (属性设置) {样式定义}
媒体类型: 
    - all 所有设备
    - braille 盲文
    - embossed 盲文打印
    - handheld 手持设备
    - print 文档打印或打印预览模式
    - projection 项目演示，比如幻灯
    - screen 电脑屏幕，平板，智能手机等。
    - speech 屏幕阅读器
    - tty 固定字母间距的网格的媒体，比如电传打字机
    - tv 电视
    - not | only 对支持media的没影响,对不支持的能识别出not | only 后判断执行不执行之后的样式定义
>not: not是用来排除掉某些特定的设备的，比如 @media not print（非打印设备）。
only: 用来定某种特别的媒体类型。
对于支持 Media Queries 的移动设备来说，如果存在 only 关键字，移动设备的 Web 浏览器会忽略 only关键字并直接根据后面的表达式应用样式文件。对于不支持 Media Queries 的设备但能够读取 Media Type 类型的 Web浏览器，遇到 only 关键字时会忽略这个样式文件。

属性设置:
    ![](images/media-feature.png)
    ![](images/media-feature-2.png)
    ![](images/media-feature-3.png)
使用方式:
- css中如下
```
@media only screen and (max-device-width:width:480px){}
@media screen and (max-width: 414px) and (min-width:375px){}
```
- link引入时根据media属性引入
```html
<link id="link1" rel="stylesheet" type="text/css" media="screen" href="style1.css">
```
####calc计算属性
```css
.class{
    width: calc(100% - 100px)
    height:~'calc(100px - 10px)'   //加~表示编译后保持是calc(100px - 10px),不加的话会是编译后的90px
}
```
####[less常用](https://www.html.cn/doc/less/#)
- 变量
```less
@nice-blue: #5B83AD;
@light-blue: @nice-blue + #111;

#header {
  color: @light-blue;
}
===输出===
#header {
  color: #6c94be;
}
======
@imgUrl:'../images'
@banner:banner
@property:color
.@{banner}{
    @{property}:#fff;
    background:url('@{imgUrl}/xx.png');
}
```
- 运算
```less
@var:1px+1
===输出===
6px
```

#Html代码段

####在线客服
```html
<a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=747725946&site=qq&menu=yes"><b class="b2"></b>在线客服</a>
```
#标签相关
[相关题目](https://yq.aliyun.com/articles/88068?t=t1)
- 文件类型   !DOCTYPE 不写浏览器是识别不了html的
- 标签语义化 [全部标签,大多是都没用过,以后可以用](http://www.w3school.com.cn/html5/html5_reference.asp)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <header>头部</header>
    <nav>页面导航元素</nav>
    <article> 标签定义独立的内容。</article>
    <section>标签定义文档中的节（section、区段）。比如章节、页眉、页脚或文档中的其他部分。</section>
    <aside>侧边栏</aside>
    <footer>脚步</footer>

    <article>
        <!-- datalist   提供文本框自动完成特性 -->
        <input type="text" list="country">
        <datalist id="country">
            <option value="a"></option>
            <option value="b"></option>
            <option value="c"></option>
        </datalist>
    </article>
    <section>
        <!-- 表单元素类型 -->
            <input type="color" name="favcolor">
            <input type="date" name="bday">
            <input type="datetime-local" name="bdaytime">
            <input type="email" name="email">
            <input type="url" name="sitename">
            <input type="number" name="quantity" min="1" max="5">
            <input type="range" min="0" max="10" step="2" value="6">
            <input type="search" name="googleengine">
            <input type="time" name="usr_time">
            <input type="tel" name="mytel">

            <form oninput="x.value=parseInt(a.value)+parseInt(b.value)">0
                <input type="range" id="a" value="50">100
                +<input type="number" id="b" value="50">
                <!-- 输出元素 -->
                =<output name="x" for="a b"></output>
            </form>

    </section>
</body>
</html>
```
- svg和canvas
```
svg是绘制和记忆,能后续操作,但性能低,矢量,与分辨率无关
canvas是绘制和忘记,绘制完成不能操作,性能高,与分辨率有关

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d')
ctx.rect(20,20,150,100)
ctx.stroke()
ctx.beginPath()
ctx.moveTo(10,10)
ctx.lineTo(200,100)
stc.stroke()
```
- 行内,块,空元素
```
行内:span a b img input strong select em button textarea
块元素: div p h1 ul li dl dt
空元素: br hr link input img
```
- web work 异步线程相关 [相关介绍](https://www.cnblogs.com/wishyouhappy/p/3766225.html)


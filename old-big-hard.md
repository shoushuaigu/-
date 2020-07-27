#老大难问题要彻底理解解决
###viewport 屏幕适配 px rem ua标识 相关
[移动端适配](https://segmentfault.com/a/1190000019138515)
#### 像素：
```
    物理像素(设备像素、屏幕分辨率)  固定不变 （较大）    iPhone6 750px*1334px
    设备独立像素（密度无关像素） （较小）               375px*667px
    设备像素比（dpr） = 物理像素 / 独立像素；通过window.devicePixelRatio获取
        dpr大于1为高清屏，一般为整数，个别安卓奇葩不是整数
    css像素 在css、js中使用的长度单位 px
        pc端1物理像素=1px
        移动端根据布局视口（viewport）而不同 viewport一般在768px~1024px之间，意在将pc端内容在布局视口大小中显示全
        iPhone6为例：物理像素750，如果没设置布局视口 viewport是980px，此时1物理像素长度等于980/750=1.3067px，既1物理像素=1.3067px*1.3067px。此时为不清晰的。
        设置布局视口后<meta name="viewport" content="width=device-width">既视口宽度=设备宽度（设备独立像素）。iPhone6就是375px
        375/750=0.5px。既1物理像素=0.5px*0.5px（像素都是点阵的）。
```
#### 视口：
```
    布局视口viewport 故布局视口是看不见的，浏览器厂商设置的一个固定值，如980px，并将980px的内容缩放到手机屏内。
    document.documentElement.clientWidth    //布局视口宽

    视觉视口
    window.innerWidth(innerHeight)  // 视觉视口尺寸=布局视口

    理想视口    使布局视口宽度=屏幕的宽度（设备独立像素、device-width）。
    window.screen.width
    <meta name="viewport" content="width=device-width">
        device-width的计算公式为：device-width=物理像素/(devicePixelRatio * scale)      750/(2*0.5)
        此时dpr=1时，1个css 像素长度 对应1个物理 像素长度，1个css 像素 对应1个物理 像素。
        当dpr=2时，设备宽度等于750/2，viewport也就等于375了，既750/375=2。 1个css 像素长度 对应2个物理 像素长度，1css 像素 对应4个物理 像素（像素都是点阵的）。
        border: 1px solid red; // 此时1px 对应的宽度是2物理像素的宽度。
        initial-scale是将布局视口进行缩放,
        <meta name="viewport" content="width=device-width,initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no"> 
        initial-scale=0.5,即将视口缩小2倍后等于屏幕宽度。width / 2 = 375px; width = 750px;所以此时布局视口为750px，此时1px等于1物理像素。
```
#### rem适配
```
rem是相对于根元素的字体大小的单位，也就是html的font-size大小，浏览器默认的字体大小是16px，所以默认的1rem=16px.
事实上 rem是把屏幕等分成 指定的份数，以20份为例，每份为 1rem ， 1rem 对应的大小就是 rem基准值 ，rem做的就是把 rem基准值 给<html>的 font-size ，所以如果设备的 物理像素 宽为 640px ，分成20份，那么 1rem=640px/20=32px , <html>的 font-size为32px 。
当然，你也可以分成30份，40份，60份等等，这个看自己的喜好了
在我们实际切图的时候，对于视觉稿上的元素尺寸换算，只需要元素的 原始的px值(即你量的大小) 除以 rem基准值 即可。例如设计稿的大小为640px， rem基准值 = 640px/20 = 32px ，有个元素的大小你量出来是 140px286px* 

//这段代码放在head标签里面
(function () {
    var html = document.documentElement;
 
    function onWindowResize() {
        html.style.fontSize = html.getBoundingClientRect().width / 20 + 'px';
    }
 
    window.addEventListener('resize', onWindowResize);
    onWindowResize();
})();

140px = 140/32 = 4.375rem
286px = 286/32 = 8.9375rem
```
#### rem+vw适配
vw : 1vw 等于视口宽度的1%
vh : 1vh 等于视口高度的1%
第一步:设置meta标签
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
```
第二部:设置html的font-size
```css
html{
    font-size:13.33333333vw
}
```
为什么是13.3333vw
以设计图750px为例
100vw == 750px
1px = 0.1333333333vw
方便计算设根元素font-size:100px即13.3333vw
1rem == 100px == 13.3333vw
这样既能动态改变根元素的字体大小又方便计算

当我们通过ps测量一个div的大小为 width:200px,height:137px时，我们就可以这样写，ps量出来的像素直接除以100，计算小数很方便
```css
div {
  width: 2rem;
  height:1.37rem;
 
 }
```

##模块化 工程化

##闭包

##正则规则

##版本管理git svn


##http安全相关
[http劫持与xss](https://www.cnblogs.com/wjlog/p/5790568.html)


---
##按位运算符
>&  按位与
>>&是二元运算符
两个数值的二进制各位分别相 与,各位相与的结果同时为1返回1,有一个为0返回0
31&2 结果是2,
31的二进制是11111
2的二进制是10
即11111&00010结果为00010,即2

>|   按位或
>>同上,只要有1就返回1
1|3 ==> 01|11 ==>11 即3

>^   按位异域
>>和|类似,但两个操作位都是1的话结果为0
1^3 ==> 01^11 ==> 10 即2

>~   按位非
>>对位求反,也就是二进制的反码
公式: ~x=-(x+1)
1的二进制是0000001
~1的结果是-2

[~讲解](http://www.cnblogs.com/moqiutao/p/6275483.html)
[~讲解](https://blog.csdn.net/qq_31070475/article/details/72598500)

>\>> 有符号右移
-9 >> 2
表示-9向右以两位,并把这两位移除,左侧添加两位,整数加0,负数加1
11111111111111111111111111110111  // -9 -> 11111111111111111111111111111101   // -3

>\>>>   无符号右移
右移同上,但左侧加的始终是0,即结果总是非负数
9 >>> 2
00000000000000000000000000001001   // 9 ->  00000000000000000000000000000010 // 2
右移0位的意义:
位移操作符位移前做两种转换,一,将不是number类型的转为number,二,将number转成32bit数据.这些转换与位移位数无关,所以能用0来实现

><<  左移
左移相应位数,并删除左移的位数,在右侧加0
1<<1  -->
0000001<<1  --> 0000010

>应用
1,&判断奇偶
>>偶数 & 1 =0
>>奇数 & 1 =1
>>0&1=0
>>1&1=1
>>2&1=0

>2,使用~~,<<,>>,>>>,|取整
~~3.14  ==3
~~-3.14 ==-3
3.14<<0 ==3
3.14>>0 ==3
3.14>>>0 ==3    不能对负数取整,其他的可以

>3,^判断两数是否相等,两值的交换
1^1=0
1^2!=0
同一个数等于0,不同的数不等0
a=1
b=2
a^=b
b^=a
a^=b
结果a=2,b=1

>4,rgb值和16进制值的转换
```javascript
function hexToRGB(hex){
    var hex = hex.replace("#","0x"),
        r = hex >> 16,
        g = hex >> 8 & 0xff,
        b = hex & 0xff;
    return "rgb("+r+","+g+","+b+")";
}
function RGBToHex(rgb){
    var rgbArr = rgb.split(/[^\d]+/),
        color = rgbArr[1]<<16 | rgbArr[2]<<8 | rgbArr[3];
    return "#"+color.toString(16);
}
```

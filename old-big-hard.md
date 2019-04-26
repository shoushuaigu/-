#老大难问题要彻底理解解决
##viewport 屏幕适配 px rem ua标识 相关
>像素：

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
>视口：

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
>适配方案

```javascript
    // 以750设计稿为例
    var clientW = document.documentElement.clientWidth>750?750:document.documentElement.clientWidth;     //视口宽度
    // 可以判断document.documentElement.clientWidth大小，跳转pc和m站
    document.documentElement.style.fontSize=clientW/7.5 +'px';  //动态设置根元素font-size
    <meta name="viewport" content="initial-scale=1,maximum-scale=1, minimum-scale=1">   //缩放比例固定为1；
    // 此时转成rem既设计图尺寸/100即可
    // 字体大小设置，用媒体查询控制，不能用rem
    @media screen and (max-width:321px){
        .m-navlist{font-size:15px}
    }

    @media screen and (min-width:321px) and (max-width:400px){
        .m-navlist{font-size:16px}
    }

    @media screen and (min-width:400px){
        .m-navlist{font-size:18px}
    }

    /*
        换算过程
            如果根元素为100px，那么1rem=100px
            设计稿750px
            一个设备的宽度就是750px，并且我给这个宽度为750px设备的根元素设置为100px,这样1rem就等于100px了
            750/100 = 750/100
            另一个设备：要想与设计稿的效果一样，就要进行等比例缩放
                clientW 视口宽
                x   根字体大小
                clientW/x = 750/100         x=clientW/7.5

    */
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

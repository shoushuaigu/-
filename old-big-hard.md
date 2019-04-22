#老大难问题要彻底理解解决
##viewport 屏幕适配 px rem ua标识 相关


##require 模块化开发

##闭包

##正则规则

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
#javascript代码段
####JQ相关
>$.proxy方法
>>改变this指向
```html
<button>执行 test 函数</button>
<p></p>
```
```javascript
var Person = {
    name: "John Doe",
    age: 32,
    test: function(){
        $("p").after("Name: " + this.name + "<br> Age: " + this.age);
    }
};
$("button").click($.proxy(Person,"test"));  //test能拿到name,age.方法正常执行
$("button").click(function(){Person.test()});   //同上(异步函数如定时器等加function(){},确保this指向)
$("button").click(Person.test); //this指向$("button")
```
>$.noop == function(){} 一个空函数

####export | export default | module.exports | exports
>export | export default  : es6语法  用import * from * 引入
```javascript
// export   各个导出,必须有变量名,引入时变量名必须对应一致,import {name} from *.js,import * as obj from *.js
export const a = 1;     import {a} from '*.js';

const a =1;const fn = function(){};
export {fn,a};      import {fn,a} from '*.js';
                    import * as obj from '*.js';    //obj.a  obj.fn()
// export default   只能出现一次,可以没有变量名,引入时没有{},变量名能自定义
function fn(){};
export default fn;  import f from '*.js';
export default {data:"victor"};     import d from '*.js';   //d.data
export default const a=12;//不能这样写
```
>module.exports | exports : Commonjs语法规范
```javascript
// 这两个就用module.exports就好了
// 能用 . 和=直接导出.  require引入,不用{}
//可以看成var exports = module.exports;所以exports = a;是错的
const a = 1;
module.exoprts = a;     var aa = require('*.js');   //aa==1
module.exports.aa = a;  var obj = require('*.js');  //obj.aa==1
```

####关于浏览历史和返回跳转
```javascript
document.referrer   //获取当前页面的上一页面
location.replace('/*.html')     //跳转某页,不发通过浏览器返回按钮返回
/* 控制返回跳转 */
pushHistory(); 
window.addEventListener("popstate", function(e) { 
    // 监听浏览器的返回按钮事件;
    // 根据自己的需求实现自己的功能 
    location.href='/fuwuhao/index.php/Home/Easy/index';
}, false); 

function pushHistory() { 
    var state = { 
        title: "title", 
        url: "#"
    }; 
    window.history.pushState(state, "title", "#"); 
} 
```

####监听加载状态改变
```javascript
document.onreadystatechange = completeLoading;
function completeLoading() {
    if (document.readyState == "complete") {
        
    }
}
```

####cookie的操作
```javascript
// 获取
function getCookie(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

// 设置
document.cookie="name="+username;   //默认方式

function setCookie(name,value,time){
    var strsec = getsec(time);
    var exp = new Date();
    exp.setTime(exp.getTime() + strsec*1);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
}
function getsec(str){
    // alert(str);
    var str1=str.substring(1,str.length)*1;
    var str2=str.substring(0,1);
    if (str2=="s"){
        return str1*1000;
    }
    else if (str2=="h"){
        return str1*60*60*1000;
    }
    else if (str2=="d"){
        return str1*24*60*60*1000;
    }
}
// 调用
//s20是代表20秒
//h是指小时，如12小时则是：h12
//d是天数，30天则：d30
//setCookie("name","hayden","s20");

// 删除
function delCookie(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
    document.cookie= name + "="+cval+";expires="+exp.toGMTString()+"; path=/";
}
```

####判断是否为微信浏览器
```javascript
    function isWeiXin(){ 
        var ua = window.navigator.userAgent.toLowerCase(); 
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){ 
            return true; 
        }else{ 
            return false; 
        }
    } 
```

####编码转码
```javascript
    encodeURI("http://cang.baidu.com/do/s?word=百度&ct=21");
    // "http://cang.baidu.com/do/s?word=%E7%99%BE%E5%BA%A6&ct=21"
    decodeURI("http://cang.baidu.com/do/s?word=%E7%99%BE%E5%BA%A6&ct=21")
    // "http://cang.baidu.com/do/s?word=百度&ct=21"
```
####
####
####
####
####

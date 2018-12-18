#关于微信公众号、小程序开发的一些知识

####微信一些可能失效的api
```javascript

document.addEventListener('WeixinJSBridgeReady',function onBridgeReady() {
    // 通过下面这个API隐藏右上角按钮
    WeixinJSBridge.call('hideOptionMenu');
});

document.addEventListener('WeixinJSBridgeReady',function onBridgeReady() {
    // 通过下面这个API显示右上角按钮
    WeixinJSBridge.call('showOptionMenu');
});

$('.look').click(function () {
    // 关闭微信当前页面回到对话框
    WeixinJSBridge.call('closeWindow');
})
```

####禁止微信调整字体大小
```javascript
if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
    handleFontSize();
} else{   
    if (document.addEventListener) {
        document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
    } else if (document.attachEvent) {
        document.attachEvent("WeixinJSBridgeReady", handleFontSize);
        document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
    }
}
   
 function handleFontSize() {
    // 设置网页字体为默认大小
    WeixinJSBridge.invoke('setFontSizeCallback', {
            'fontSize': 0
    });
    // 重写设置网页字体大小的事件
    WeixinJSBridge.on('menu:setfont', function () {
        WeixinJSBridge.invoke('setFontSizeCallback', {
            'fontSize': 0
        });
    });
}
```
```css
/* 禁止缩放字css  */
-webkit-text-size-adjust: 100% !important; 
text-size-adjust: 100% !important; 
-moz-text-size-adjust: 100% !important;
```
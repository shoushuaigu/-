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

####微信支付
- jssdk方式
```
1. 绑定域名等公众号设置
2. 引入jssdk文件
3. 配置wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: '', // 必填，公众号的唯一标识
        timestamp: , // 必填，生成签名的时间戳
        nonceStr: '', // 必填，生成签名的随机串
        signature: '',// 必填，签名，见附录1
        jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，这里只写支付的
    })
4. 向后台请求统一下单接口,获得返回值,获取到Openid等订单信息
5. 下单成功后调起微信支付
function startWxPay() {
    $.ajax({
        type: "POST",
        url: "/WxPay/GetPaySign",
        data: { code: code, openid: openid },
        beforeSend: function () {
            $("#btnPay").attr({ "disabled": "disabled" });
        },
        success: function (res) {
            $("#btnPay").removeAttr("disabled");
            if (res.openid != null && res.openid != undefined && res.openid != "") {
                window.localStorage.setItem("openid", res.openid);
            }
            wx.chooseWXPay({
                timestamp: res.data.timeStamp, // 支付签名时间戳
                nonceStr: res.data.nonceStr, // 支付签名随机串，不长于32 位
                package: res.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                signType: "MD5", // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                paySign: res.data.paysign, // 支付签名
                success: function (res) {
                    //支付成功
                },
                cancel: function (res) {
                    //支付取消
                }
            });
        }
    });
}
```
- [jsapi方式支付(调用微信浏览器内置对象)](https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=7_3)
    - 应用场景:微信内调起支付
```
1. 公众号后台配置
2. 请求后台下单接口,获取到Openid等订单信息
3. 调用内置对象WeixinJSBridge.invoke 调起支付
```
- [wap支付(h5支付,微信浏览器外调起微信,进行支付)](https://pay.weixin.qq.com/wiki/doc/api/H5.php?chapter=9_20&index=1)
    - 应用场景:主要用于触屏版的手机浏览器请求微信支付的场景。可以方便的从外部浏览器唤起微信支付。
```
1. 公众号后台配置
2. 请求后台下单接口,获取到Openid等订单信息
3. 根据返回的url直接跳转即可调起微信,支付
4. 回到支付页主动引导用户查询确认支付结果(根据订单id,请求后台,获取支付状态)
```
- [小程序支付](https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=7_7&index=5)
    - 和微信支付类似
```
1. 后台配置
2. 下单请求
3. 调起小程序支付接口
wx.requestPayment(
{
'timeStamp': '',
'nonceStr': '',
'package': '',
'signType': 'MD5',
'paySign': '',
'success':function(res){},
'fail':function(res){},
'complete':function(res){}
})
```
####小程序相关

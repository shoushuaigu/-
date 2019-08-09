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
####wx-jssdk相关
- 方式一

>1.在router.afterEach中,请求接口,获取wxConfig所需参数
>2.用引入的weixin-js-sdk,wx.config({配置信息})
>3.封装相关微信jssdk接口,比如分享接口
>4.wx.ready({掉用封装的接口})
```javascript
// 新建wechatConfig.js
import wx from 'weixin-js-sdk';
import API from '../api/api'
import {getFetch, postFetchBody, postFetchParams,} from '../utils/getData'
import Cookies from "js-cookie";

/* eslint-disable no-undef */
// 微信注入依赖config校验
export function getWxConfig (url) {
  let FRONT_BASE = url || `${location.href}`;
  console.log(FRONT_BASE,location.href,'---------------');
  
  let postData = {url: FRONT_BASE};
  // let wx_cfg = Cookies.get('WX_CONFIG');
  // if(!wx_cfg){

    postFetchBody(API.weChatSdk, postData, undefined, false).then(response => {
      console.log(response.data);
      let res = response.data;
      if (res.code !== 1) {
        // this.$vux.toast.show(res.msg);
        return;
      }
  
      wx.config({
        debug: false, // 开启调试模式,
        appId: res.data.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
        timestamp: res.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
        signature: res.data.signature,// 必填，签名，见附录1
        jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'hideMenuItems'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
      // var inFifteenMinutes = new Date(res.data.timestamp + 50 * 60 * 1000);
      // Cookies.set('WX_CONFIG', JSON.stringify(res.data), {expires: inFifteenMinutes});
    }).catch(err => {
      console.warn(err);
      console.log('获取授权失败')
    })
  // }else{
  //   console.log('----------getcookie--------');
  //   let wx_cfg_obj = JSON.parse(wx_cfg);
  //   wx.config({
  //     debug: false, // 开启调试模式,
  //     appId: wx_cfg_obj.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
  //     timestamp: wx_cfg_obj.timestamp, // 必填，生成签名的时间戳
  //     nonceStr: wx_cfg_obj.nonceStr, // 必填，生成签名的随机串
  //     signature: wx_cfg_obj.signature,// 必填，签名，见附录1
  //     jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'hideMenuItems'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
  //   });
  // }
  
}

// 微信分享配置 显示微信浏览器右边菜单中的显示所有功能按钮接口
export function wxShare (url, isblack,title, desc, imgUrl) {
  // let FRONT_BASE = !isblack ? url : `${location.protocol}//${location.host}/index`;
  let FRONT_BASE = `${location.protocol}//${location.host}/index`;
  console.log('FRONT_BASE',FRONT_BASE);
  
  let ICON_BASE = `${location.protocol}//${location.host}`;
  let shareData = {
    title: '佳之易充值中心',
    desc: '玖佰充值平台，致力于成为国内最具竞争力的全种类数字产品支付服务平台，平台现已开通微信支付，支付宝支付，银联支付等多种支付渠道。在投入市场十多年以来，凭借全面的的产品种类，安全的交易环境，便捷的支付方式等特点，赢得了广大用户的一致好评。',
    link: FRONT_BASE,
    imgUrl: ICON_BASE+'/static/favicon.jpg',
    success: function () {
      // 用户确认分享后执行的回调函数
    },
    cancel: function () {
      // 用户取消分享后执行的回调函数
    }
  };

  wx.ready(function () {
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    wx.onMenuShareAppMessage(shareData);
    wx.onMenuShareTimeline(shareData);

    //只能隐藏“传播类”和“保护类”按钮
    // aliMiddle，这个页面不能隐藏
    if (!(url.indexOf("aliMiddle") !== -1)){
      wx.hideMenuItems({
        menuList: [
          'menuItem:copyUrl', //基础类 菜单不能隐藏
          'menuItem:openWithSafari'
        ]
      });
    }
  });

  wx.error(function (res) {
    // alert(res.errMsg);
  });

}
```

- 方式二

>1.获取配置信息:封装方法,动态添加js,利用js文件的回调从服务器拿到所需参数
```javascript
// 新建jssdkSign.js
(function () {
  var _sino = window.hmt = {}

  var serverPath = '//m.***.com/***-jssdksign'//jssdkSign服务器地址

/**
 *设置全局方法
 *@param url 待签名的url
 *@param callback 包含res,配置信息的回调
*/
  window.jssdkSign = function (url, callback) {
    this.url = url
    _sino.callbackWX = callback //通过getJssdk获取的回调方法callbackWX,js动态加载后会立即执行
    getJssdk(url)
  }

  /**
   * 获取微信jssdk
   * @param {Object} url
   */
  function getJssdk (url) {
    // 加载jssdk信息
    var scriptJssdk = document.createElement('script')
    try {
      scriptJssdk.src = serverPath + '/jssdkSign.json?url=' + url + '&callback=hmt.callbackWX'
      document.head.appendChild(scriptJssdk)
    } catch (e) {
      console.log(e)
    }
  }
})()

```
>2.在main.js中的vue实例中定义方法,调用1中方法,在回调中配置wx.config
```javascript
import wx from 'weixin-js-sdk'
require('../static/js/jssdkSign')   //引入1中新建的jssdkSign
// vue实例中
methods: {
    initWxConfig () {
      let url = window.location.href.split('#')[0]
      window.jssdkSign(url, function (res) {
        console.log('微信配置信息', res)
        wx.config({
          debug: false,
          appId: res.appId,
          timestamp: res.timestamp,
          nonceStr: res.noncestr,
          signature: res.signature,
          jsApiList: [
            'hideOptionMenu',
            'chooseImage',
            'previewImage',
            'uploadImage',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone'
          ]
        })
        wx.error(function (res) {
          console.log('微信签名错误', res.errMsg)
        })
        wx.ready(function () {
          console.log('签名成功')
        })
      })
    }
  }
```
>3.封装相关jssdk方法(分享,上传等)
```javascript
// 新建WxConfig.js
import wx from 'weixin-js-sdk'
class wxConfig {
  static chooseImg (callback) {
    console.log('进入微信拍照')
    wx.ready(() => {
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['camera'],
        success: (res) => {
          callback(res.localIds[0])
        },
        fail: (err) => {
          console.log('选择图片错误：', err)
        }
      })
    })
  }
  // 微信上传图片
  static uploadImage (localId, callback) {
    console.log('进入上传图片')
    wx.uploadImage({
      localId: localId,
      isShowProgressTips: 0,
      success: (res) => {
        console.log('serverId:', res.serverId)
        callback(res.serverId)
      },
      fail: (err) => {
        console.log('上传图片出错', err)
        // callback('')
      }
    })
  }
}
export default wxConfig

```
>4.在组件中引用3,掉其中方法


####小程序相关

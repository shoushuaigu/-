# [Echarts](https://echarts.apache.org/zh/tutorial.html#5%20%E5%88%86%E9%92%9F%E4%B8%8A%E6%89%8B%20ECharts)
## 快速开始
- 安装下载,引用
    ```js
    <script src="echarts.min.js"></script>
    npm install echarts --save  或 npm install echarts vue-echarts  (基于echarts4.1构建的)
    ```
    - 在webpack中使用   [可按需引入的模块](https://github.com/ecomfe/echarts/blob/master/index.js)
    ```js
    var echarts = require('echarts');   // 整体引入
    // 按需引入
    var echarts = require('echarts/lib/echarts');
    require('echarts/lib/chart/bar');   // 引入柱状图
    require('echarts/lib/component/tooltip');   // 引入提示框
    require('echarts/lib/component/title'); // 标题组件

    Vue.prototype.$echarts = echarts    // 挂在到vue原型
    ```

- 初始化
    - 需要有宽高的容器(可以用id也可ref获取)
    ```js
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));
    // 指定图表的配置项和数据
    var option = {
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
            data:['销量']
        },
        xAxis: {
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    ```
- 基础配置
    - 标题(title),副标题(title里),图例(legend),x轴(xAxis),y轴(yAxis),图内网格(grid),图内数据部分(series)
    ```
    基本包含:
    show: 是否显示
    color: 颜色
    text: 文本
    textStyle: 样式
    left,top,right,bottom: 定位
    zlevel: 层级
    x,y轴:
        type: value 数值轴
            category    类目轴
            time    时间轴
            log 对数轴
        axisLine: 轴线相关
        axisTick: 刻度相关
        axisLabel: 刻度标签相关
    series中:
        {type: line,bar,pei,funnel...图形类型(折线,柱,扇形,漏斗)
        data: 数据
        label: 图形上的描述
        itemStyle: 图形样式}
        color,textStyle: 全局的样式
    ```
    - 异步数据加载,更新
    ```js
    //通过异步后调用setOption即可
    //也可先setOption图标配置相关项,再setOption数据项(更新数据也是如此)):
    myChart.showLoading();  // loading动画
    myChart.setOption({
    title: {
        text: '异步数据加载示例'
    },
    tooltip: {},
    legend: {
        data:['销量']
    },
    xAxis: {
        data: []
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'bar',
        data: []
    }]
    });

    // 异步加载数据
    $.get('data.json').done(function (data) {
        myChart.hideLoading();
        // 填入数据
        myChart.setOption({
            xAxis: {
                data: data.categories
            },
            series: [{
                // 根据名字对应到相应的系列
                name: '销量',
                data: data.data
            }]
        });
    });
    ```
- 常用方法
```js
// setOption: 设置图表实例的配置项以及数据，万能接口
chart.setOption(option, 
    {   //可选
        notMerge: false,    // (更行option时)是否不合并,默认false,即合并;
        lazyUpdate: false,  // 在设置完 option 后是否不立即更新图表，默认为 false，即立即更新
        silent: false   // 阻止调用 setOption 时抛出事件，默认为 false，即抛出事件
    }
);
// 获取实例容器宽高,dom,和配置项
getWidth(),getHeight(),getDom(),getOption()
resize()    // 改变图标尺寸时需调用
showLoading(type:default,opts:{
  default: {
  text: 'loading',
  color: '#c23531',
  textColor: '#000',
  maskColor: 'rgba(255, 255, 255, 0.8)',
  zlevel: 0
}
})
type:可选，加载动画类型，目前只有一种'default'
opts:加载动画配置项
调用: echarts.showLoading({
  text: 'loading',
  color: '#c23531',
  textColor: '#000',
  maskColor: 'rgba(255, 255, 255, 0.8)',
  zlevel: 0
})
getDataURL()    // 导出图表图片，返回一个 base64 的 URL，可以设置为Image的src
参数:   
    {// 导出的格式，可选 png, jpeg
    type?: string,
    // 导出的图片分辨率比例，默认为 1。
    pixelRatio?: number,
    // 导出的图片背景色，默认使用 option 里的 backgroundColor
    backgroundColor?: string,
    // 忽略组件的列表，例如要忽略 toolbox 就是 ['toolbox']
    excludeComponents?: Array.<string>
    }
clear() // 清空当前实例，会移除实例中所有的组件和图表。清空后调用 getOption 方法返回一个{}空对象。
```
#REACT学习
- 虚拟dom
>实现dom元素高效更新
js创建两个dom树对象(js对象,虚拟dom),对比两个dom树,实现高效更新
- diff算法
>实现高效对比差异的算法
    tree diff :新旧两颗dom树,逐层对比,外层
    component tree: 在tree diff时,每层中组件级别对比,中层
    element diff:component diff进行时,元素级别对比,内层
##非脚手架部分
###安装
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <script src="../build/react.development.js"></script>
    <script src="../build/react-dom.development.js"></script>
    <script src="../build/babel.min.js"></script>
    <!-- 
    react.js 是 React 的核心库，
    react-dom.js 是提供与 DOM 相关的功能，
    babel.js 的作用是将 JSX 语法转为 JavaScript 语法，这一步很消耗时间，实际上线的时候，应该将它放到服务器完成。
 -->
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">
    //<script> 标签的 type 属性为 text/babel 。这是因为 React 独有的 JSX 语法，跟 JavaScript 不兼容。凡是使用 JSX 的地方，都要加上 type="text/babel"
      ReactDOM.render(
        <h1>Hello, world!</h1>,
        document.getElementById('root')
      );
    </script>
  </body>
</html>
```
###ReactDOM.render()
```javascript
ReactDOM.render 是 React 的最基本方法，用于将模板转为 HTML 语言，并插入指定的 DOM 节点。
```
###jsx语法
```javascript
// js,html混写
// {插值}
var arr = [<div key="1">123</div>,<div key="2">456</div>]
var data = ['a','b','c']
ReactDOM.render(
    <div>
        {arr}   {/*注释:直接引入变量,如果是数组,能展开其中的项*/}
        data.map((item,index)=>{    {/*遍历返回结构,要加key值,便于react判断更新*/}
            return <span key={index}>{item}</span>
        })
    </div>
    document.getElementById('root')
)
```
###组件
- 组件名必须大写开头
- 只能包含一个顶层标签
- 类继承方式
```javascript
class Welcome extends React.Component{
    render(){
        return(
            <div>基础组件</div>
        )
    }
}
ReactDOM.render(
    <Welcome/>,
    document.getElementById('root)
)
```
###props,state
- props 组件属性 组件传递的数据绑定在此  只读
    - propTypes 定义数据类型和是否必须引入
    - defaultProps  定义默认值
    - 命名属性时有些字段不能用,class 属性需要写成 className ，for 属性需要写成 htmlFor ，这是因为 class 和 for 是 JavaScript 的保留字。
    - props.children是props的固定字段,表示组件的所有子节点
- state 组件内定义的数据    可读写,引起视图更新
    - setState  更新state数据,引起视图更新(直接this.state[key]='',不会引起视图更新)
```javascript
<script src="../build/prop-types.js"></script>
// propTypes,defaultProps需要prop-types.js
class Welcome extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            flag:true
        }
    }
    static propsTypes = {
        title:PropTypes.string.isRequired
    }
    static defaultProps = {
        content:'默认内容'
    }
    handleClick(){
        this.setState({flag:false})
    }
    render(){
        return(
            <div>
                <h1>{this.props.title}</h1>
                <article>{this.props.content}</article>
                {
                    this.state.flag?(<button onClick={this.handleClick.bind(this)}>确定</button>):this.props.children
                }
            </div>
        )
    }
}
ReactDOM.render(
    <Welcome title="标题">
        <button>编辑</button>
        <button>删除</button>
    </Welcome>,
    document.getElementById('root')
)
```

###真实DOM
- 定义ref属性
    - ref="inputdom"    在元素上直接设置
    - this.refBtn = React.createRef() constructor中定义属性
- 获取DOM(对应上边两种定义方式)
    - this.refs.inputdom
    - this.refBtn.current
```javascript
class Welcome extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            value:''
        }
        this.refBtn = React.createRef()
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(){
        this.refs.inputdom.focus()
        this.refBtn.current.style.cssText="color:red"
    }
    render(){
        return(
            <div>
                <input type="text" value={this.state.value} ref="inputdom"/>
                <input type="button" ref={this.refBtn} value="点击" onClick={this.handleClick}/>
            </div>
        )
    }
}
```
###事件
```javascript
class MyComponent extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            value:''
        }
        this.refBtn = React.createRef()
        this.handleChange = this.handleChange.bind(this)    //绑定this指向,也可在标签中绑定,如下
    }
    static defaultProps = {
        placeholder:'阿斯达克'
    }
    handleClick(){
        this.refs.input.focus()
        this.refBtn.current.style.cssText = 'color:#f02'
    }
    handleChange(e){
        this.setState({value:e.target.value})
    }
    render(){
        return(
            <div>
                <input type="text" ref="input" onChange={this.handleChange} placeholder={this.props.placeholder}/>    
                <p>{this.state.value}</p>
                <input type="button" ref={this.refBtn} value="点击" onClick={this.handleClick.bind(this)}/>    
            </div>
        )
    }
}

ReactDOM.render(
<MyComponent placeholder='黑暗时代' />,
document.getElementById('example')
);
```

###生命周期
- 共三个状态,每个状态有两个处理函数,will和did
- Mounting  已经插入真是DOM
    - componentWillMount()
    - componentDidMount()
- Updating  正在被重新渲染
    - componentWillUpdate
    - componentDidUpdate
- Unmounting 已经移除真实DOM
    - componentWillUnmount()
- 还有两种特殊状态的处理函数
    - componentWillReceiveProps(object nextProps)：已加载组件收到新的参数时调用
    - shouldComponentUpdate(object nextProps, object nextState)：组件判断是否重新渲染时调用
```javascript
class Hello extends React.Component{
    constructor(){
        super()
        this.state = {
            opacity:1
        }
        this.stl = React.createRef()
    }
    componentDidMount(){
        setInterval(() => {
            var opacity = this.state.opacity
            opacity-=0.1
            if (this.state.opacity <0) {
                opacity =1
            }
            this.setState({opacity:opacity})
        }, 100);
    }
    render(){
        return(
            <div ref={this.stl} style={{'opacity':this.state.opacity}}>
                hello{this.props.name} {this.state.opacity}
            </div>
        )
    }
}

ReactDOM.render(
<Hello name="world"/>,
document.getElementById('example')
);
```

###表单,ajax
```javascript
<script src="../build/jquery.min.js"></script>
class UserGist extends React.Component{
    constructor(){
        super()
        this.state = {
            nick:'',
            perms:[]
        }
    }
    componentDidMount(){
        $.get(this.props.source,(res)=>{
            console.log(res)
            this.setState({
                nick:res.data.nick,
                perms:res.data.perms
            })
        })
    }
    render(){
        return(
            <div>
                <h2>{this.state.nick}</h2>
                <ul>
                    {
                        this.state.perms.map((item)=>{
                            return <li>{item.name}{item.val}</li>
                        })
                    }    
                </ul>
            </div>
        )
    }
}
ReactDOM.render(
<UserGist source="https://www.easy-mock.com/mock/5cd0f626e1fe52746e062a2b/jzy-btn/jzy-btn-get" />,
document.getElementById('example')
);

// 还能接受promise
class RepoList extends React.Component{
    constructor(){
        super()
        this.state = {
            loading:true,
            error:null,
            value:null
        }
    }
    componentDidMount(){
        this.props.promise.then(res=>{
            console.log(res)
            if(res.data.succ){
                this.setState({
                    loading:false
                })
            }
        })
    }
    render(){
        if(this.state.loading){
            return <span>loading</span>
        }else if(this.state.error){
            return <span>error</span>
        }else{
            return <span>value</span>
        }
    }
}

ReactDOM.render(
<RepoList promise={$.getJSON('https://www.easy-mock.com/mock/5cd0f626e1fe52746e062a2b/jzy-btn/jzy-btn-get')} />,
document.getElementById('example')
);
```

##脚手架部分
###安装、配置
```javascript
cnpm i react react-dom -S

import React from 'react'
import ReactDOM from 'react-dom'
```

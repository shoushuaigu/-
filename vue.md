#VUE中常用知识点
####关于router
```javascript
this.$router.push('/login');    //跳转
this.$router.go(-1);

this.$route     //route对象
//全局路由导航
router.beforeEach((to, from, next) => {
    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        next('/login');
    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    }
})
// 组件内路由导航
beforeRouteEnter (to, from, next) {
    console.log(to);
    console.log(from);
    next()
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
},
//路由规则
routes: [
    {
      path:'/',
      redirect:'/index'
    },
    {
      path: '/',
      component: resolve => require(['@/components/common/home'], resolve),
      meta: { title: '首页' },
      children:[
        {
          path:'/index',
          component:resolve => require(['@/components/page/index'],resolve),
          meta:{title:'首页-数据可视化'}
        },
        {
          path:'/404',
          component:resolve => require(['@/components/page/404'],resolve),
          meta:{title:'404'}
        },
      ]
    },
    {
      path: '/login',
      component: resolve => require(['@/components/page/login'], resolve)
    },
    {
      path:'*',
      redirect:'/404'
    }
  ]
```
####vue-cli3.0 
>[文档](https://cli.vuejs.org/zh/config/#pages)
```javascript
起步

npm i -g @vue/cli   安装
vue create my-project   创建项目
或者
vue ui  创建项目，项目管理（在已有项目中运行进入项目管理）
npm run serve 启动

如果还想用2.0需安装桥接工具
npm i -g @vue/cli-init  全局安装
vue init webpack my-project 2.0创建项目

通过vue ui创建的项目能够统一管理
通过vue create my-project创建项目能自定义调试，预处理器，typescript等
没了build和config等目录，若需要其他配置则需要自己手动配置



```


####在循环中将数据加到某属性中
```html
<tr v-for="item in Strategys" class="ng-scope">
    <td>
    　　<a class="ng-binding ng-scope" v-bind:href="['xxx/detail/'+item.Id]" >{{item.Name}}</a>
    </td>
</tr>
```
####created、mounted、(activated、deactivated、keep-alive)
>activated和deactivated只有再keepAlive下才生效
>在keepAlive下，由于缓存机制，created和mounted都只在初次进入页面时调用，反复进入会走缓存，所以在created、mounted中的方法不会被调用触发。但activaed会每次进入页面调起，deactivated会在每次离开页面时调起。
```html
<!-- 控制页面是否需要缓存可以通过keep-alive内置属性include、exclude实现 -->
<!-- include包含在内的组件会被缓存，
    exclude包含在内的组件不会被缓存
    注意：每个组件都要设置name属性
 -->
<keep-alive include="home">
    <router-view></router-view>
</keep-alive>
<!-- 控制页面是否需要缓存可以通过路由配置实现 -->
<!-- app.vue 中 -->
<keep-alive>
    <router-view v-if="$route.meta.keepAlive"/>
</keep-alive>
<router-view v-if="!$route.meta.keepAlive"/>
```
```javascript
/*router.js中*/
export default new Router({
    routes:[
        {
            path:'/',
            name:'home',
            component:Home,
            meta:{
                keepAlive:true
            }
        }
        {
            path:'/about',
            name:'about',
            component:About,
            meta:{
                keepAlive:false
            }
        }
    ]
})
```
####computed和watch区别
>computed:计算属性，一般通过其他变量计算得来一个属性、值。具有缓存属性，更节省性能，参与计算的变量不变就会走缓存，不会重复执行
>watch:监听器，一般用于监听某值的变化，实现业务；监听数据来源包括data，props，computed
```html
<div id="app">
    <input v-model="firstName">
    <input v-model="lastName">
    <input v-model="fullName">
</div>
```
```javascript

new Vue({
    el:"#app",
    data:{
        firstName:'',
        lastName:'',
        fullName:''
    },
    //watch方式实现fullName
    watch:{
        firstName:function(n){
            this.fullName=n+this.lastName;
        },
        lastName:function(n){
            this.fullName = n+this.firstName;
        },
        $route(n,o){
            //监听路由变化
        }
    }
    //computed方式实现
    conputed:{
        fullName:function(){
            return this.firstName+this.lastName;
        }
    }
})



```

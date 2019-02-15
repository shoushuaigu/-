var Koa = require('koa'),
    router = require('koa-router')(),
    bodyparser = require('koa-bodyparser'),
    app = new Koa();

app.use(bodyparser())

router.get('/',async (ctx,next)=>{
    ctx.body={
        name:'ddd',
        age:'28'
    }
}).post('/login',async (ctx,next)=>{
    let data = ctx.request.body;
    // console.log(data.username&&data.password);
    if(data.username&&data.password==123456){
        ctx.body={
            code:1,
            msg:'成功'
        }
    }else{
        ctx.body={
            code:0,
            msg:'失败'
        }
    }
}).get('/index',async (ctx,next)=>{
    ctx.body={
        code:1,
        msg:'首页数据可视化'
    }
}).get('/prolist',async (ctx,next)=>{
    let page = ctx.query.page || 1;
    ctx.body={
        code:1,
        page:(page>25?25:page),
        total:'25',
        data:[
            {
                id:'G231055',
                star:'1',
                proType:'游戏',
                goodsName:'腾讯QQ黄钻豪华版',
                goodsType:'礼品卡',
                goodsIcon:'/kx.png',
                sup:['tx001jk','tx027jk','tx027jk'],
                price:'15',
                payType:'直冲',
                up:true
            },
            {
                id:'G231056',
                star:'0',
                proType:'游戏2',
                goodsName:'腾讯QQ黄钻豪华版',
                goodsType:'礼品卡',
                goodsIcon:'/kx.png',
                sup:['tx001jk','tx027jk','tx027jk'],
                price:'15',
                payType:'直冲',
                up:true
            },
        ]
    }
}).get('/comp',async (ctx,next)=>{
    ctx.body=['comp1','comp2','comp3']
})

app.use(router.routes());
app.use(router.allowedMethods())

app.listen(3000)
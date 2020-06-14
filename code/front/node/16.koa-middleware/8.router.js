let Koa = require('koa')
let Router = require('koa-router')

let app = new Koa()

// 路由的功能很强大
// let router = new Router({ // 前缀的用法 默认不会使用
//     prefix: '/user' //在访问路径前默认增加的路由
// })

let router1 = new Router()
let router2 = new Router()

// 可以多级路由 /user/add  /user/list
// 访问/user 时 显示用户    访问/user/add 显示添加用户      访问/user/list 显示用户列表
router1.get('/user', (ctx,next) => {
    ctx.body = 'show user'
    next()
})

router2.get('/add', (ctx,next) => {
    ctx.body = 'user add'
    next()
})

router2.get('/list', (ctx,next) => {
    ctx.body = 'user list'
    next()
})
// 将两级路由关联起来
router1.use('/user', router2.routes())
app.use(router1.routes())

app.listen(3000)
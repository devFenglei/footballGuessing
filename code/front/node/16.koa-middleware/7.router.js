let Koa = require('koa')
// let Router = require('koa-router')
let Router = require('./my-koa-router')

let app = new Koa()

// 路由的功能很强大
let router = new Router()
// 模糊匹配
// /zfpx?id 查询参数 req.query
// /zfpx/2  路径参数
router.get('/zfpx/:name/:id', (ctx,next) => {
    // 可以通过params取值
    console.log(ctx.params.id)
    ctx.body = 'zfpx'
    // 会走到url一致的下一个中间件
    next()
})

// url参数可以支持正则
router.get('/\/zfpx/', (ctx,next) => {
    ctx.body = 'zfpx111'
    next()
})

app.use(router.routes())

app.listen(3000)
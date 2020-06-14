let Koa = require('koa')
// let Router = require('koa-router')
let Router = require('./my-koa-router')

let app = new Koa()

// 路由的功能很强大
let router = new Router()
router.get('/zfpx', (ctx,next) => {
    ctx.body = 'zfpx'
    // 会走到url一致的下一个中间件
    next()
})

// 如果有访问路径相同的，自上而下匹配 以第一个为准
router.get('/zfpx', (ctx,next) => {
    ctx.body = 'zfpx11'
    next()
})

router.get('/fl', (ctx,next) => {
    ctx.body = 'fl'
    next()
})

// 这里之前的中间件中调用next都会走
app.use((ctx,next) => {
    ctx.body = 'old'
})

// app.use(router.allowedMethods()) // 405 请求method不匹配时返回405 request headers 中会有响应允许的方式 
app.use(router.routes())

app.listen(3000)
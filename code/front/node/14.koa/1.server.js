let Koa = require('koa')

// app是监听函数
let app = new Koa()

// koa有两个常用的方法 listen use
app.use(function(ctx, next) {
    // ctx 是req,res的封装
    ctx.body = {'name': 'fl'}
    // 调用next 就会执行下一个中间件, ctx.body可以设置多次，以最后的为准
    // 等待中间件全部执行完，会将ctx.budy响应给客户端

    // throw new Error('error')
    next()
})

app.use(function(ctx, next) {
    // ctx 是req,res的封装
    ctx.body = {'name': 'wyt'}
})

// 任意一个中间件出错，都会被error回调捕获到
app.on('error', (err) => {
    console.log(err)
})

app.listen(3000)
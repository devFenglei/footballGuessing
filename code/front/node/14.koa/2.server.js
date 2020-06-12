let Koa = require('koa')

let app = new Koa()

// koa有两个常用的方法 listen use
app.use(function(ctx, next) {
    console.log(ctx.req.url) // 原生的请求路径 

    console.log(ctx.request.req.url) // 一般不这么取
    console.log(ctx.request.url) // koa封装的请求路径 
    console.log(ctx.url) // koa封装的请求路径 ctx.url 是 ctx.request.url的别名
    ctx.body = {'name': 'fl'}
    next()
})

app.use(function(ctx, next) {
    ctx.body = {'name': 'wyt'}
})


app.listen(3000)
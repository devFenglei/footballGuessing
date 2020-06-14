let Koa = require('koa')
// let bodyParser = require('koa-bodyparser') // 帮我们直接解析请求体
let betterBody = require('koa-better-body') // v1插件
let convert = require('koa-convert') // 将1.0的转为2.0语法格式

// 实现带文件上传的表单提交
let app = new Koa()

// 解析请求体的中间件
// app.use(betterBody()) // 支持 json格式 querystring 格式 不支持文件上传格式

app.use(convert(betterBody({
    uploadDir: __dirname
})))

// 访问localhost:3000 时 返回一个表单
app.use(async (ctx, next) => {
    if (ctx.path === '/' && ctx.method === 'GET') {
        ctx.set('Content-Type', 'text/html;charset=utf8')
        ctx.body = `
        <form action="/" method="POST" enctype="multipart/form-data">
            <input type="text" name="username">
            <input type="text" name="password">
            <input type="file" name="avatar">
            <input type="submit">
        </form>
        `
    } else {
        await next()
    }
})

app.use(async (ctx, next) => {
    if (ctx.method === 'POST' && ctx.path === '/') {
        ctx.body = await ctx.request.fields
    }
})

app.listen(3000)
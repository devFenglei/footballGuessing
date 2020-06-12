let Koa = require('koa')

// 写一个表单 表单有 用户名 密码 提交表单
let app = new Koa()

// 访问localhost:3000 时 返回一个表单
app.use(async (ctx, next) => {
    console.log(ctx.url, ctx.method)
    console.log(ctx.path, ctx.method)
    if (ctx.path === '/' && ctx.method === 'GET') {
        ctx.set('Content-Type', 'text/html;charset=utf8')
        ctx.body = `
        <form action="/" method="POST">
            <input type="text" name="username">
            <input type="text" name="password">
            <input type="submit">
        </form>
        `
    } else {
        await next()
    }
})

app.use(async (ctx, next) => {
    if (ctx.method === 'POST' && ctx.path === '/') {
        ctx.body = await bodyParser(ctx)
    }
})

function bodyParser(ctx) {
    return new Promise((resolve, reject) => {
        let arr = []
        ctx.req.on('data', (data) => {
            arr.push(data)
        })
        ctx.req.on('end', () => {
            let body = Buffer.concat(arr).toString()
            resolve(body)
        })
    })
}

app.listen(3000)
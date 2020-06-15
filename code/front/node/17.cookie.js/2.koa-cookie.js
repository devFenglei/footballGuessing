let Koa = require('koa')
let Router = require('koa-router')

let app = new Koa()
let router = new Router()

router.get('/read', (ctx,next) => {
    let name = ctx.cookies.get('name') || 'no name'
    let age = ctx.cookies.get('age') || 'no age'
    ctx.body = `${name}-${age}`
})

router.get('/write', (ctx,next) => {
    ctx.cookies.set('name', 'zfpx', {
        domain: 'localhost'
    }),
    // 后边的会把前边的覆盖
    ctx.cookies.set('age', 10, {
        maxAge: 100
    })
    ctx.body = 'write end'
})



app.use(router.routes())

app.listen(3000)
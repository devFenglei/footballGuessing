let Koa = require('koa')
let Router = require('koa-router')
let crypto = require('crypto')

let app = new Koa()
let router = new Router()

router.get('/visit', (ctx, next) => {
    let visit = ctx.cookies.get('visit', {signed: true})
    visit = visit ? Number(visit) + 1 : 1
    // 使用signed签名加密 但还是不安全的，在控制台可以看到，cookie一般不存放敏感信息
    ctx.cookies.set('visit', visit, {signed: true})
    ctx.body = `当前访问次数为 ${visit}`
})

// 加密其实是用加盐的方式
let r = crypto.createHmac('sha1', 'zfpx').update(String('visit=1')).digest('base64')
console.log(r)

app.use(router.routes())
app.listen(3000)
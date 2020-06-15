let Koa = require('koa')
let Router = require('koa-router')
let session = require('koa-session')

let app = new Koa()
app.keys = ['zfpx']
const CONFIG = {
    key: 'koa.sess', /** (string) cookie key (default is koa.sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    autoCommit: true, /** (boolean) automatically commit headers (default true) */
    overwrite: false, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
    secure: false, /** (boolean) secure cookie*/
    sameSite: null, /** (string) session cookie sameSite options (default null, don't set it) */
}
app.use(session(CONFIG,app))
let router = new Router()

router.get('/towash', (ctx, next) => {
    if (ctx.session.user) {
        ctx.session.user.count --
        ctx.body = `办卡了 次数${ctx.session.user.count}`
    } else {
        ctx.session.user = {count: 5}
        ctx.body = `办卡了 次数5`
    }
})

app.use(router.routes())
app.listen(3000)

// koa-bodyparser       body-parser
// koa-better-body      multer
// koa-static           内置的
// koa-views            内置的
// koa-session          express-session
// koa-router           内置的
// cookie               cookie-parser
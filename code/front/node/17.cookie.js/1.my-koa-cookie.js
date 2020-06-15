let Koa = require('koa')
let Router = require('koa-router')
let querystring = require('querystring')

let app = new Koa()
let router = new Router()

app.use(async (ctx, next) => {
    ctx.getCookie = function(key) {
        let r = ctx.get('Cookie') || ''
        let cookieObj = querystring.parse(r, '; ')
        return cookieObj[key]
    }
    let allCookie = []
    ctx.setCookie = function(key, val, options) {
        let arr = []
        let line = `${key}=${encodeURIComponent(val)}`
        arr.push(line)
        if (options.domain) {
            arr.push(`domain=${options.domain}`)
        }
        if (options.maxAge) {
            arr.push(`Max-Age=${options.maxAge}`)
        }
        if (options.path) {
            arr.push(`Path=${options.path}`)
        }
        if (options.httpOnly) {
            arr.push(`HttpOnly=true`)
        }
        line = arr.join('; ')
        allCookie.push(line)
        ctx.set('Set-Cookie', allCookie)
    }
    await next()
})

router.get('/read', (ctx,next) => {
    let name = ctx.getCookie('name') || 'no name'
    let age = ctx.getCookie('age') || 'no age'
    ctx.body = `${name}-${age}`
})

router.get('/write', (ctx,next) => {
    ctx.setCookie('name', 'zfpx', {
        domain: 'localhost'
    }),
    ctx.setCookie('age', 10, {
        maxAge: 100
    })
    ctx.body = 'write end'
})



app.use(router.routes())

app.listen(3000)
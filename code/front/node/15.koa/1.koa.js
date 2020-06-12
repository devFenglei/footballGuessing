let Koa = require('koa')

let app = new Koa()

// 支持异步操作
// 在koa中 会把异步的方法全部封装成promise
// 在内部会把这些中间件包装成promise
function log() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('log')
            resolve()
        }, 3000)
    })
}
app.use((ctx, next) => {
    console.log(1)
    next()
    console.log(2)
})

app.use(async (ctx, next) => {
    console.log(3)
    await log()
    next()
    console.log(4)
})

app.use((ctx, next) => {
    console.log(5)
    next()
    console.log(6)
})



app.listen(3000)
let Koa = require('koa')

let app = new Koa()

// compose 组合函数
// 洋葱模型
// koa有两个常用的方法 listen use
// koa 和 express 完全一样 差在koa支持异步 express不支持
app.use(function(ctx, next) {
    console.log(1)
    next()
    console.log(2)
})

app.use(function(ctx, next) {
    console.log(3)
    next()
    console.log(4)
})

app.use(function(ctx, next) {
    console.log(5)
    next()
    console.log(6)
})

// 输出 1 3 5 6 4 2

app.listen(3000)

// 自己实现洋葱模型
// function app(){}
// app.middlewares = []
// app.use = function(fn) {
//     app.middlewares.push(fn)
// }
// let index = 0
// function dispatch(index) {
//     if (index >= app.middlewares.length) return
//     const route = app.middlewares[index] // 取出第一个函数
//     // 让函数执行，并传入第二个函数
//     route(() => dispatch[index+1]) // 深度
// }
// dispatch(index)
const { render } = require("ejs");

let Koa = require('koa')

let app = new Koa()
// let static = require('koa-static')

// 中间件的好处 可以帮我们处理好数据 挂载ctx上
// 增加一些新的方法 ctx.render() ctx.request
// 处理一些公共逻辑
// 权限校验

// 自己实现一个static
function static(dir) {
    return async (ctx, next) => {
        let path = require('path')
        let fs = require('fs')
        let {promisify} = require('util')
        let stat = promisify(fs.stat)
        let mime = require('mime')
        let realPath = path.join(dir, ctx.path)
        try {
            let statObj = await stat(realPath)
            if (statObj.isFile()) {
                // 在koa返回文件可以采用流的形式
                ctx.set('Content-Type', mime.getType(realPath)+";charset=utf8")
                ctx.body = fs.createReadStream(realPath)
            } else {
                // 文件夹
                let fileName = path.join(realPath, 'index.html')
                let statObj = await stat(fileName)
                ctx.set('Content-Type', "text/html;charset=utf8")
                ctx.body = fs.createReadStream(fileName)
            }
        } catch {
            await next()
        }
    }
}

// static第一个参数会指定启动静态服务的目录
app.use(static(__dirname))

app.use((ctx, next) => {
    ctx.body = 'zfpx'
})

app.listen(5000)
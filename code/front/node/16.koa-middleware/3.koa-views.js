let Koa = require('koa')
// let views = require('koa-views')

let app = new Koa()

// views 第一个参数 运行模板路径 第二个参数options extension指定运行的引擎
app.use(views(__dirname,{
    extension: 'ejs'
}))

app.use(async (ctx,next) => {
    await ctx.render('index2', {name: 'zfpx', age: 9})
})
let renderObj = {name: 'zfpx',age: 10,arr: [1,2,3]}
function render(result) {
    let head = "let templ; \r\n"
    head += "with (renderObj){ \r\n templ+=`"
    let content = result.replace(/<%([\s\S]*?)%>/g,function() {
        return '${' + arguments[1] + '}'
    })
    content = result.replace(/<%([\s\S]*?)%>/g,function() {
        return "`\r\n" + arguments[1] + "\r\ntempl="
    })
    let tail = "`} \r\n return templ"
    return head + content + tail
}

// 自己实现views
function views(dir, {extension}){
    return async (ctx, next) => {
        let ejs = require(extension)
        let fs = require('fs')
        let path = require('path')
        let {promisify} = require('util')
        let readFile = promisify(fs.readFile)
        ctx.render = async function (filename, obj) {
            let realPath = path.join(dir,filename+'.'+extension)
            let temp = await readFile(realPath, 'utf8')
            let fn = new Function('renderObj',render(temp))
            ctx.set('Content-Type', 'text/html;charset=utf8')
            ctx.body = fn(obj)
        }
        await next()
    }
}

app.listen(3000)
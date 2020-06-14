let Koa = require('koa')
let fs = require('fs')
let path = require('path')

// 自己实现 better-body中间件 带文件上传的表单提交
let app = new Koa()

// Buffer自身无split方法 为buffer实现split方法
Buffer.prototype.split = function (sep){
    let index = 0
    let pos = 0
    let len = sep.length
    let arr = []
    while(-1 != (pos = this.indexOf(sep, index))){
        arr.push(this.slice(index, pos))
        index = pos + len
    }
    arr.push(this.slice(index))
    return arr
}

function zfBody({uploadDir}) {
    return async (ctx, next) => {
        let buffer = []
        ctx.req.on('data', (data) => {
            buffer.push(data)
        })
        ctx.req.on('end', () => {
            // 自己去解析请求体 不能直接tostring
            // 请求体数据格式
/**
             * ------WebKitFormBoundarynRxNUsy1rKodkB07
            Content-Disposition: form-data; name="username"

            111
            ------WebKitFormBoundarynRxNUsy1rKodkB07
            Content-Disposition: form-data; name="password"

            222
            ------WebKitFormBoundarynRxNUsy1rKodkB07
            Content-Disposition: form-data; name="avatar"; filename="1.txt"
            Content-Type: text/plain

            ���ӣ�4700
            ������1870
            25938
            ------WebKitFormBoundarynRxNUsy1rKodkB07--
 */
            const bondery = '--' + (ctx.get('Content-Type').split('=')[1])
            const arr = Buffer.concat(buffer).split(bondery).slice(1, -1)
            const body = {} // 存放整合请求内容的对象
            arr.forEach(lines => {
                let [head, tail] = lines.split('\r\n\r\n')
                head = head.toString()
                if (head.includes('filename')) { // 文件
                    // 把tail的部分写到文件里去 文件内容可能包含换行符 把头部去掉剩下的就是内容
                    let tail = lines.slice(head.length+4,-2)
                    // 创建流，写入文件内容
                    const ws = fs.createWriteStream(path.join(__dirname,Date.now() + Math.random() + ''))
                    ws.end(tail)
                } else { // 普通文本
                    name="username"
                    const key = head.match(/name="(\w+)"/)[1]
                    body[key] = tail.toString().slice(0,-2)
                }
            })
            console.log(body)
            // console.log(Buffer.concat(buffer).toString())
        })
        await next()
    }
}

app.use(zfBody({
    uploadDir: __dirname
}))

// 访问localhost:4000 时 返回一个表单
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

app.listen(4000)
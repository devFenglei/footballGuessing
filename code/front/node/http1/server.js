// ajax

// 提交的格式有哪些
// form格式 a=b&c=d
// application/x-www-form-urlencoded
// form mutipart 文件格式





// filename="text" name="username"
// bondary -------------------

// 内容

// filename="text" name="username"
// bondary -------------------

// 内容





// 字符串
// JSON 格式 '{"name": "aa"}'
// application/json





// text
// text/plain




// 二进制 FormData 上传文件




// 服务端返回
// JSON
// application/json

let http = require('http')
let url = require('url')

let server = http.createServer((req, res) => {
    // get参数通过url获取
    // let {query} = url.parse(req.url, true)
    // console.log(query)

    // 2.1 post请求 表单形式
    let buffers = []
    let type = req.headers['content-type']
    req.on('data', (data) => {
        buffers.push(data)
    })
    req.on('end', () => {
        let str = Buffer.concat(buffers).toString()
        res.setHeader('Content-Type', 'application/json')
        if (type === 'application/x-www-form-urlencoded') {
            // require('querystring').parse(queryStr, 参数连接符, key-value连接符)
            let obj = require('querystring').parse(str)
            console.log(obj)
            res.end(JSON.stringify(obj))
        } else if (type === 'application/json') {
            let json = JSON.parse(str)
            res.end(json)
        } else {
            res.setHeader('Content-Type', 'text/plain')
            res.end(str)
        }
    })
    
}).listen(3000)
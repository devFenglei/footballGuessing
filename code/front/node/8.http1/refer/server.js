// Host: www.baidu.com
// Referer: https://www.baidu.com/s?cl=3&tn=baidutop10

let http = require('http')
let {exists} = require('mz/fs')

// 静态服务 localhost:3000/index.html
let url = require('url')
let path = require('path')
let fs = require('fs')
let static = path.resolve(__dirname, 'public')
let server = http.createServer(async function(req, res){
    const {pathname} = url.parse(req.url)
    let p = path.join(static, pathname)
    let flag = await exists(p)

    // referer:  http://localhost:3000/index.html
    // host      http://cs.portal:3000/

    if (flag) {
        let refer = req.headers['referer'] || req.headers['referered']
        // 第一次html是没有refer，第二次请求图片才会有refer
        if (refer) {
            refer = url.parse(refer).hostname
            let host = req.headers['host'].split(':')[0]
            console.log(refer)
            console.log(host)
            if (refer !== host) {
                fs.createReadStream(path.join(static, 'bkx.jpg')).pipe(res)
            } else {
                fs.createReadStream(path.join(static, 'kaixin.jpg')).pipe(res)
            }
        } else {
            fs.createReadStream(p).pipe(res)
        }
        
    } else {
        res.statusCode = 404
        res.end()
    }
})
server.listen(3000)
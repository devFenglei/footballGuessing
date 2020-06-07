// 范围请求

// 客户端需要发送一个请求头 Range:bytes=0-5
// 服务端    Accept-Ranges: bytes
//           Content-Range: bytes 0-5/750
//           206

let http = require('http')
let path = require('path')
// let fs = require('fs')
let fs = require('mz/fs')
// let stat = require('util').promisify(fs.stat)
// mz库 将异步回调方法转换为promise方式
let p = path.resolve(__dirname, '1.txt')
async function listener(req, res) {
    let range = req.headers['range']
    if (range) {
        let [, start, end] = range.match(/(\d*)-(\d*)/)
        let statObj = await fs.stat(p)
        let total = statObj.size
        start = start ? Number(start) : 0
        end = end ? Number(end) : total - 1

        res.statusCode = 206
        res.setHeader('Accept-Ranges','bytes')
        res.setHeader('Content-Range',`bytes ${start}-${end}/${total}`)
        fs.createReadStream(p, {start, end}).pipe(res)
    } else {
        fs.createReadStream(p).pipe(res)
    }
}

let server = http.createServer(listener)
server.listen(3000, () => {
    console.log('server start')
})
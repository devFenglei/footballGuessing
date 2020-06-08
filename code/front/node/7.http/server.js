// 服务端

let http = require('http')

http.createServer((req, res) => {
    console.log('请求到来')
    console.log(req.method)
    console.log(req.headers)
    res.end('你好')
}).listen(3000)
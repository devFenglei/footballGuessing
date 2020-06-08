// 服务端接收客户端的响应

// let http = require('http')

// // req 是一个可读流 res是可写流 都是基于socket
// // req 请求     res 响应
// // http.createServer(function(req, res) {

// // })

// let server = http.createServer()
// server.on('request', (req, res) => {
//     console.log(req.method) // 返回方法名 大写的
//     console.log(req.url) // 路径
//     console.log(req.httpVersion)
//     console.log(req.headers) // 请求头

//     // 存放请求体内容
//     let arr = []
//     req.on('data', (data) => {
//         arr.push(data)
//     })
//     req.on('end', () => {
//         console.log(Buffer.concat(arr))
//     })


//     // 响应
//     res.setHeader('Content-Type', 'text')
//     res.setHeader('a', '1')
//     res.write('hello')
//     res.end('world')
// })

// server.on('connection', function(socket) {
//     console.log('连接成功')
// })

// server.listen(3000)
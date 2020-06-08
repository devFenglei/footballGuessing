// 传输层 http websocket （应用起来基本一样）
let net = require('net')

// socket套接字
let server = net.createServer()
// 连接时会执行，每次连接都会产生一个新的socket对象
server.on('connection', function(socket) {
    // socket没有规则 我们可以用top模拟http
    // socket是一个可读可写的流 Duolex
    console.log('ok')
    socket.setEncoding = 'utf8'
    socket.on('data',function(data) {
        console.log(data)
    })
    socket.write(`
HTTP/1.1 200 ok
Content-Length: 5

hello
    `)
})
server.listen(3000)
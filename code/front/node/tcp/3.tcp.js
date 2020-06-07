let net = require('net')

// 简易的聊天功能
let client = []
let server = net.createServer(function(socket) {
    client.push(socket)
    socket.setEncoding('utf8')
    // 连接服务端后 通知一下当前用户 一共可以容纳多少人，当前有几个
    server.getConnections(function(err, count) {
        socket.write(`当前有${count}人，一共可以连接${server.maxConnections}人\r\n`)
    })

    // 客户端输入内容触发
    socket.on('data',function(data) {
        data = data.replace(/\r\n/g, '')
        console.log(data)
        client.forEach(c => {
            if (c !== socket) c.write(`${data}\r\n`)
        })
    })

    socket.on('end', function() {
        console.log('end')
        client = client.filter(c => c !== socket)
    })
})
server.maxConnections = 3
server.on('error', function(err) {
    // 端口占用，默认启动端口号加1
    if (err.code === 'EADDRINUSE') {
        server.listen(err.port + 1)
    }
})

server.on('close', function() {
    console.log('close')
})

server.listen(3000)
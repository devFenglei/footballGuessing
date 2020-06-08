let net = require('net')

// putty localhost 3000 raw
// 简易的聊天功能
let server = net.createServer(function(socket) {
    socket.setEncoding('utf8')
    // 连接服务端后 通知一下当前用户 一共可以容纳多少人，当前有几个
    server.getConnections(function(err, count) {
        socket.write(`当前有${count}人，一共可以连接${server.maxConnections}人`)
    })

    // 客户端输入内容触发
    socket.on('data',function(data) {
        // 服务端可以挂掉客户端
        // socket.end()

        // 会触发监听close 服务端关闭 旧的已经连着服务端的客户端继续保持连接，新客户端不允许接入
        // 当客户端全部不连接时关闭服务端，有客人新客人不允许进来
        // server.close()

        // 如果当前有客户端在连接，新的客户端允许连接，当所有客户端断开后，服务端关闭，有客人就不打烊
        // 但不会触发close
        // server.unref()
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
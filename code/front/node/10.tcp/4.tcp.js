let net = require('net')

// 简易的聊天功能
// s:zs:内容    私聊
// b:内容       广播
// r:lisi       改名
// l:           显示当前在线用户列表
let client = {}
let server = net.createServer(function(socket) {
    // 有一个唯一的标识 {xxx: {username: '张三', socket: xxx}}
    // ip + 端口号作为唯一的标识
    let key = socket.remoteAddress + socket.remotePort
    // 将当前用户保存起来
    client[key] = {
        username: '匿名',
        socket
    }

    socket.setEncoding('utf8')
    // 连接服务端后 服务端通知一下当前用户 一共可以容纳多少人，当前有几个
    server.getConnections(function(err, count) {
        socket.write(`当前有${count}人，一共可以连接${server.maxConnections}人\r\n`)
    })

    // 客户端输入内容触发
    socket.on('data',function(data) {
        data = data.replace(/\r\n/g, '')
        console.log(data)
        let arr = data.split(':')
        switch(arr[0]){
            case 'l':
                list(socket)
                break
            case 'r':
                rename(socket, arr[1], key)
                break
            case 'b':
                broadcast(key, arr[1])
                break
            case 's':
                private(arr[1], arr[2], key)
                break
            default:
                socket.write('命令有误\r\n')
                break
        }
    })

    // 有人下线了需要维护client 销毁客户端
    socket.on('end',function() {
        delete client[key]
        socket.destory()
    })
})

// 列表
function list(socket) {
    socket.write('当前在线用户列表\r\n')
    Object.values(client).forEach(c => {
        socket.write(`${c.username}\r\n`)
    })
}

// 更改名字
function rename(socket, newName, key) {
    client[key].username = newName
    socket.write(`新用户名是${newName}\r\n`)
}

// 广播
function broadcast(key, content) {
    Object.keys(client).forEach(c => {
        if (key !== c) {
            client[c].socket.write(`${client[key].username}广播说：${content}\r\n`)
        }
    })
}

// 私聊
function private(toName, content, key) {
    Object.values(client).forEach(c => {
        if (c.username === toName) {
            c.socket.write(`${client[key].username}对你说：${content}\r\n`)
        }
    })
}

server.maxConnections = 3
const port = 3000

server.on('close', function() {
    console.log('close')
})

server.listen(port)
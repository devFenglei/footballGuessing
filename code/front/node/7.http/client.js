// 客户端

let http = require('http')

let config = {
    host: 'localhot',
    port: 3000,
    method: 'get',
    headers: {
        'a': 1
    }
}
let client = http.request(config, (res) => {
    res.on('data',(data) => {
        console.log(data) // 你好
    })
})

client.end() // 发请求 调end才算发了请求
let http = require('http')

// let config = {
//     host: 'localhost',
//     port: 3000,
//     path: '/?a=b&c=d',
//     method: 'get'
// }
// // get请求不能发送请求体
// http.get(config, (res) => {
//     let buffers = []
//     res.on('data', (data) => {
//         buffers.push(data)
//     })
//     res.on('end', () => {
//         let r = Buffer.concat(buffers)
//         console.log(r.toString())
//     })
// })


let config = {
    host: 'localhost',
    port: 3000,
    method: 'post',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}
let client = http.request(config, (res) => {
    let buffers = []
    res.on('data', (data) => {
        buffers.push(data)
    })
    res.on('end', () => {
        let r = Buffer.concat(buffers)
        console.log(r.toString())
    })
})
client.end('name=aa&age=9')
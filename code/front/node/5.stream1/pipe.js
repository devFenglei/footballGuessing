// pipe 管道
let fs = require('fs')

let rs = fs.createReadStream('./13.txt', {highWaterMark: 3})

let ws = fs.createWriteStream('./14.txt', {highWaterMark: 3})

// 帮我们实现 读取一点 写一点
// rs.pipe(ws)

// on('data') 会触发多次

rs.on('data', function(data) {
    let flag = ws.write(data)
    console.log(flag)
    if (!flag) {
        rs.pause()
    }
})

ws.on('drain', function() {
    console.log('drain')
    rs.resume()
})
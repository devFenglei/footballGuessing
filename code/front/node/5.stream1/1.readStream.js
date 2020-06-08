let fs = require('fs')
let ReadStream = require('./ReadStream')

// let rs = fs.createReadStream('12.txt', {
//     highWaterMark: 3,
//     autoClose: true,
//     flags: 'r',
//     start: 0,
//     end: 5,
//     encoding: 'utf8' // 默认buffer
// })

let rs = new ReadStream('12.txt', {
    highWaterMark: 3,
    autoClose: true,
    flags: 'r',
    start: 0,
    end: 5,
    encoding: 'utf8' // 默认buffer
})

// open事件是创建流时就会触发
rs.on('open', () => {
    console.log('文件打开了')
})

rs.on('error', (err) => {
    console.log(err)
})

rs.on('data', (data) => {
    console.log(data)
    // rs.pause()
})

rs.on('end', () => {
    console.log('end')
})


rs.on('close', () => {
    console.log('close')
})

// setTimeout(() => {
//     rs.resume()
// }, 2000)
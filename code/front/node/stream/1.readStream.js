// 可读流
// 读文件 内部 使用fs.read实现的

// 可写流
// 写文件 fs.write

let fs = require('fs')
let rs = fs.createReadStream('10.txt', {
    flags: 'r', // 读取的方式
    encoding: null, // 编码，默认buffer
    autoClose: true, // 读完是否自动关闭
    start: 0, // 开始位置
    end: 3, // 结束位置
    highWaterMark: 2 // 最高水位线，一次读多少个字节 默认16*1024
})

// 默认什么都不干， 结果默认是不读的
// 流的两种模式 一种叫暂停模式 一种叫流动模式
let arr = []
rs.on('data', (data)=> {
    rs.pause() // 暂停 暂停出发data事件
    arr.push(data)
    console.log(data)
    setTimeout(() => {
        rs.resume()
    },1000)
})

rs.on('error', (err)=> {
    console.log(err)
})

rs.on('end', ()=> {
    console.log('读完了')
    console.log(Buffer.concat(arr).toString())
})
let fs = require('fs')

// 可读流的暂停模式 先把水杯填满 自己去喝 喝多少取决于你自己
// 1、readable 当杯子里的水 是空的时候 会触发readable事件 且还会将杯子里的水再填入highWaterMark

// 2、如果当前杯子里的水小于highWaterMark 会再次读取highWaterMark个

let rs = fs.createReadStream('./18.txt', {
    autoClose: true,
    start: 0,
    flags: 'r',
    encoding: 'utf8',
    highWaterMark: 3 // 默认先在杯子里添加 3滴水
})

rs.on('readable', () => {
    let r = rs.read(2)
    // console.log(rs._readableState.length) // 杯子里剩余水量
    console.log(r)
})



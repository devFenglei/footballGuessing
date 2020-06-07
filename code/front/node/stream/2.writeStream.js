let fs = require('fs')

let ws = fs.createWriteStream('11.txt', {
    flags: 'w',
    encoding: 'utf8', // 默认utf8
    autoClose: true,
    start: 0,
    highWaterMark: 3 // 不是写入个数，而是一个标识，一般配合着读取来用
    // highWaterMark我预计用这么多内存，假如有个文件1g这么大，每次64k，调完read后超出了createWriteStream中的highWaterMark，
    // 说明单次写入数据太大，续暂停读取，待写完当前数据后继续读取
})

// 写（第一次会真的往文件里写），后面会写到缓存中
// 参数是buffer或字符串
// 返回一个标识（标识当前写入个数是否小于highWaterMark）
let flag = ws.write('1')
flag = ws.write('1')
flag = ws.write('1')
console.log(flag)

// 抽干方法是在当前写入的字节大于等于了highWaterMark后触发
ws.on('drain', () => {
    // 缓存的内容和文件的内容都写到磁盘里时的回调
    console.log('抽干')
})


// 会将缓存中的内容清空（写到磁盘中）然后关闭，参数会被写到文件末尾
ws.end('完毕')
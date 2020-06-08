let fs = require('fs')
/*
    offset 从buffer的第几个位开始放
    length 在buffer中放几位
    position 从fd文件的第几位开始

    方法应用场景
    1.文件太大，不能整个放到内存里面
    2.文件大小未知
*/

// fs.read(fd, buffer, offset, length, position, callback(err, byteRead, buffer))
// 读 我是帅哥 的 是帅
fs.open('./6.txt', 'r', '0666', (err, fd) => {
    let buffer = Buffer.alloc(6)
    // fs.read(fd, buffer, 0, 3, 3, (err, byteRead) => {
    //     console.log(byteRead)
    //     fs.read(fd, buffer, 3, 3, 6, (err, byteRead) => {
    //         console.log(byteRead)
    //         console.log(buffer.toString())
    //     })
    // })

    fs.read(fd, buffer, 0, 6, 3, (err, byteRead) => {
        console.log(byteRead)
        console.log(buffer.toString())
    })
})
let fs = require('fs')
/*
    offset 从buffer的第几个位开始放
    length buffer中放几位
    position 从fd文件的第几位开始
*/
// fs.write(fd, buffer, offset, length, position, callback)

fs.open('./7.txt', 'r+', '0666', (err, fd) => {
    let buffer = Buffer.from('是帅')
    fs.write(fd, buffer, 0, 6, 3, (err, bytesWritten) => {
        // 将内存中的字节写到硬盘中
        fs.fsync(fd, () => {
            fs.close(fd,() => {
                console.log('关闭文件')
            })
        })
        
    }) 
})
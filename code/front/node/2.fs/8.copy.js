const fs = require('fs')

const BUFF_SIZE = 3
function copy(src, dest) {
    fs.open(src, 'r', (err, readFd) => {
        fs.open(dest, 'w', (err,writeFd) => {
            let buffer = Buffer.alloc(BUFF_SIZE)
            let fdOffset = 0
            function next(){
                // 16 * 1024是比较常用的
                // fdOffset 可以写Null 系统会累加自动维护
                fs.read(readFd, buffer, 0, BUFF_SIZE, fdOffset, (err, bytesRead)=> {
                    bytesRead && fs.write(writeFd, buffer, 0, bytesRead, fdOffset, (err,bytes) => {
                        fdOffset += bytesRead
                        next()
                    })
                })
            }
            next()
        })
    })
}
copy('8.txt', '9.txt')
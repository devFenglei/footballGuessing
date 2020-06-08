let fs = require('fs')
// fd file descriptor 文件描述符
// 是文件的一个引用（指针）
// 其实是一个数字或者说索引
fs.open('./5.txt', 'r', '0666', (err,fd) => {
    console.log(fd)
})


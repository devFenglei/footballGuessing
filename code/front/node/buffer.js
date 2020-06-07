/*
    Buffer
    缓存区buffer是暂时存放输入输出数据的一段内存
    JS语言没有二进制数据类型，而在处理TCP和文件流的时候，必须要处理二进制数据
    NodeJS提供了一个Buffer对象来提供对二进制数据的操作
    是一个表示固定内存分配的全局对象，也就是说要放到缓存区中的字节数需要提前确定
    Buffer好比由一个8位字节元素组成的数组，可以有效的在Javascript中表示二进制数据

*/

// 声明方式
// 1、根据长度声明
let buffer = Buffer.alloc(6) // 默认情况下，通过alloc声明的默认都是00，速度稍慢一点，因为先要将内存部分清空
console.log(buffer)

let buffer1 = Buffer.allocUnsafe(6) // 分配一段不安全的内存，速度较快
console.log(buffer1)

// 2、通过字符串声明
let buffer3 = Buffer.from('大帅哥')
console.log(buffer3)

// 3、通过数组声明
let buffer4 = Buffer.from(['0xe5', '0xa4', '0xa7']) // 每位只能放16进制且不能超过256，不是16进制的位默认是00
console.log(buffer4)
console.log(buffer4.toString()) // 大

let fs = require('fs')
let result = fs.readFileSync('node/1.txt') 
console.log(result) // <Buffer e5 a4 a7 e5 b8 85 e5 93 a5 e5 95 8a>
console.log(result.toString()) // 大帅哥啊

Buffer.isBuffer() // 返回布尔

// Buffer是内存，内存地址 引用类型的
let buffer5 = Buffer.from(['0', '1', '2'])
console.log(buffer5) // <Buffer 00 01 02>
let newBuffer = buffer5.slice(0, 1)
newBuffer[0] = 1
console.log(buffer5) // <Buffer 01 01 02>

// copy
let buffer6 = Buffer.alloc(6)
let str = '珠峰培训'
let b = Buffer.from(str)
console.log(b.length) // 12
b.copy(buffer6, 0, 0, 6)
console.log(buffer6.toString())

// 自定义实现copy方法
Buffer.prototype.myCopy = function(target, targetStart, sourceStart, sourceEnd) {
    for(let i = 0; i < sourceEnd - sourceStart; i++) {
        target[targetStart + i] = this[sourceStart + i]
    }
}

// concat 第二个参数是拼接后的长度
let buffer7 = Buffer.from('我')
let buffer8 = Buffer.from('很')
let buffer9 = Buffer.from('帅')
// console.log(Buffer.concat([buffer7, buffer8, buffer9], 3).toString()) // 我

// 自定义实现concat
Buffer.myConcat = function(bufferList, len = bufferList.reduce((pre, next) => pre + next.length ,0)) {
    let newBuffer = Buffer.alloc(len)
    let index = 0
    bufferList.forEach(buf => {
        buf.myCopy(newBuffer, index, 0, buf.length)
        index += buf.length
    })
    return newBuffer
}
console.log(Buffer.myConcat([buffer7]).toString()) // 我

// indexOf 取索引
let buffer10 = Buffer.from('珠峰爱培训爱jw')
console.log(buffer10.indexOf('爱', 7))


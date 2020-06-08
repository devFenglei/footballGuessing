// 流 tcp 实现可读流
let {Readable} = require('stream')
// Readable 可读流的基类 
// 内部会提供一个read方法（api），我们要实现一个_read方法

// creatReadableStream继承自Readable

class MyRead extends Readable{
    _read() { // 重写了读取的方法 自己类的_read方法把父类Readable的_read方法覆盖了
        console.log('data')
        for (let i = 0; i < 3; i ++) {
            this.push(`${i}`) // push方法是父类的push方法，参数就是emit data传递的值
        }
        this.push(null) // push null 的时候，表示不再emit data 即终止     emit end
        // 如果没有push null 表示内容没有读取完成 会继续调 _read()
    }
}
let myRead = new MyRead()
myRead.on('data', (data) => {
    console.log(data)
})

myRead.on('end', () => {
    console.log('end')
})
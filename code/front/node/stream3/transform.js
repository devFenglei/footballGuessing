let {Transform} = require('stream')

class MyTransform extends Transform{
    _transform(chunk, encoding, callback){
        console.log(chunk.toString().toUpperCase())
        callback()
        this.push('123')
        this.push(null)
    }
}
// 可以当成可读流 又可以当成可写流
let myTransform = new MyTransform()

// 监听用户输入
process.stdin.pipe(myTransform).pipe(process.stdout)
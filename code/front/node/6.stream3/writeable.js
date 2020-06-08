let {Writable} = require('stream')

class MyWrite extends Writable{
    _write(chunk, encoding, callback) {
        callback() // 不调用callback 就不会讲缓存中的内容继续写 这里的callback 就是clearBuffer
    }
}

let myWrite = new MyWrite()
myWrite.write('hello', 'utf8', () => {
    console.log('ok')
})
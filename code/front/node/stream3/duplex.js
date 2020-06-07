let {Duplex} = require('stream')

// 双工流 既可以读又可以写
class MyDuplex extends Duplex{
    _read() {
        this.push('123')
        this.push(null)
    }
    _write(chunk, encoding, callback){
        console.log(chunk)
        callback()
    }
}

let myDuplex = new MyDuplex()
// readable 和 data 只选择一个就可以了， 流的特点是 读取消耗掉后 就没了
myDuplex.on('readable', () => {
    console.log(myDuplex.read(1), '---') // 
})

myDuplex.on('data', (data) => {
    console.log(data, 'xxxxx') // <Buffer 1 2 3>
})
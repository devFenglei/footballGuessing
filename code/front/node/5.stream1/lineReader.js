let fs = require('fs')
let EventEmitter = require('events')

class LineReader extends EventEmitter{
    constructor(path){
        super()
        this.path = path
        this._rs = fs.createReadStream(this.path)

        let RETURN = 13
        let LINE = 10
        this.arr = [] // 存放当前已读的内容
        // 判断用户是否监听newLine事件
        this.on('newListener', (type) => {
            if (type === 'newLine') {
                this._rs.on('readable', ()=> {
                    let current // 当前读取出来的内容
                    while (current = this._rs.read(1)) {
                        switch (current[0]) {
                            case RETURN:
                                let r = Buffer.concat(this.arr).toString()
                                this.emit('newLine', r)
                                this.arr = []
                                // 对于window而言，如果下一个是换行，跳过，如果不是就扔到数组中
                                let next = this._rs.read(1)
                                if (next[0] !== LINE) this.arr.push(current)
                                break
                            default:
                                this.arr.push(current)
                        }
                    }
                })
            }
        })
        this._rs.on('end', () => {
            let r = Buffer.concat(this.arr).toString()
            this.emit('newLine', r)
        })
    }
}

// 换行的asc码 
// \r 13 回车 window 怎么表示新的一行 就用\r \r后跟着\n
// \n 10 换行 mac 没有\r 只有\n

let lineReader = new LineReader('./19.txt')
// 行读取器 每读完一行 就把一行的内容 发射出来
lineReader.on('newLine', (data) => {
    console.log(data)
})
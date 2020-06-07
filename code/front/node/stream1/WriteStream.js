let fs = require('fs')
let EventEmitter = require('events')

class WriteStream extends EventEmitter{
    constructor(path, options = {}){
        super()
        this.path = path
        this.flags = options.flags || 'w'
        this.mode = options.mode || 0o666
        this.highWaterMark = options.highWaterMark || 16*1024
        this.start = options.start || 0
        this.autoClose = options.autoClose
        this.encoding = options.encoding || 'utf8'
        
        // 是否需要出发drain事件
        this.needDrain = false

        // 是否正在写入
        this.writing = false

        // 缓存，存放数据 正在写入就放到缓存中
        this.buffer = []

        // 算一个当前缓存的个数
        this.len = 0

        // 写入的时候也有位置关系
        this.pos = this.start

        this.open()
    }
    write(chunk, encoding = this.encoding, callback) {
        chunk = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
        this.len += chunk.length // 每次调用write就统计一下长度
        // 当前写入字节数大于等于highWaterMark时，需要抽干
        this.needDrain = this.highWaterMark <= this.len
        
        if (this.writing) { // 写到缓存
            this.buffer.push({chunk,encoding,callback})
        } else {
            // 当文件写入后 清空缓存区的内容
            this.writing = true
            this._write(chunk,encoding, () => this.clearBuffer())
        }
        return !this.needDrain
    }
    _write(chunk, encoding, callback) {
        if (typeof this.fd !== 'number') {
            fs.once('open',()=> this.write(chunk, encoding, callback))
        }
        fs.write(this.fd, chunk, 0, chunk.length, this.pos, (err, byteWritten) => {
            if (err) {
                this.emit('error')
                this.distory()
            } else {
                this.pos += byteWritten
                this.len -= byteWritten // 写入的长度会减少
                callback()
            }
        })
    }
    clearBuffer() {
        let current = this.buffer.shift()
        if (current) {
            this._write(current.chunk, current.encoding, () => this.clearBuffer())
        } else {
            this.writing = false
            this.needDrain = false
            this.emit('drain')
        }
    }
    distory() {
        if (typeof this.fd === 'number') {
            fs.close(this.fd, ()=>{
                this.emit('close')
            })
            return
        }
        this.emit('close')
    }
    open() {
        fs.open(this.path, this.flags, this.mode, (err,fd) => {
            if (err) {
                this.emit('error', err)
                this.distory()
                return 
            }
            this.fd = fd
            this.emit('open')
        })
    }

}
module.exports = WriteStream
let fs = require('fs')
let EventEmitter = require('events')

class Readable extends EventEmitter{
    constructor(path, options) {
        super()
        this.path = path
        this.flags = options.flags || 'r'
        this.encoding = options.encoding || 'utf8'
        this.autoClose = options.autoClose
        this.highWaterMark = options.highWaterMark || 16 * 1024
        this.start = options.start || 0

        // 如果正在读取就不会再读了
        this.reading = false

        // 当缓存区的内容长度 等于0的时候 触发readable事件
        this.emitReadable = false

        // 缓存区的长度
        this.len = 0

        // 缓存区
        this.arr = []

        // 偏移量
        this.pos = this.start
        this.open()
        this.open('newListener', (type) => {
            if (type === 'readable') {
                this.read()
            }
        })
    }
    read(n){
        // 想读取3个 缓存区只有两个
        if (n > this.len) {
            // 重新计算highWaterMark
            // 继续调 this._read()
        }

        let buffer
        if (n > 0 && n <= this.len) { // 缓存区中的内容是有这么多个的
            buffer = Buffer.alloc(n)
            // 开始读取
            let current
            let index = 0
            let flag = true
            while(flag && (current = this.arr.shift())) {
                for (let i = 0, len = current.length; i < len; i++) {
                    buffer[index++] = current[i]
                    if (index === n) {
                        flag = false
                        let b = current.slice(i+1)
                        this.len -= n
                        // 如果当前buffer有剩余的，就放回缓存数组中，下次可以继续使用
                        if (b.length) this.arr.unshift(b)
                        break
                    }
                }
            }
        }
        // 不传递参数 就默认读取highWaterMark这么多
        if (this.len === 0) {
            this.emitReadable = true
            // this.emit('readable')
        }
        // 如果当前的缓存区大小 小于水位线时 就要读取
        if (this.len < this.highWaterMark) {
            if (!this.reading){
                this.reading = true
                this._read()
            }
        }
        
        buffer = buffer && this.encoding ? buffer.toString(this.encoding) : buffer
        return buffer
    }
    _read() {
        if (typeof this.fd !== 'number') {
            return this.once(() => this._read())
        }
        let buffer = Buffer.alloc(this.highWaterMark)
        fs.read(this.fd, buffer, 0, this.highWaterMark, this.pos, (err, bytesRead) => {
            if (err) {
                this.destory()
                return
            }
            if (bytesRead > 0) {
                this.arr.push(buffer)
                this.len += bytesRead
                this.pos += bytesRead
                this.reading = false
                
                if (this.emitReadable) {
                    this.emitReadable = false
                    this.emit('readable')
                }
            } else {
                this.emit('end')
            }
        })
    }
    destory() {
        if (typeof this.fd !== 'number') {
            this.emit('close')
            return 
        }
        fs.close(this.fd, () => {
            this.emit('close')
        })
    }
    open() {
        fs.open(this.path, this.flags, (err, fd) => {
            if (err) {
                if (this.autoClose) {
                    this.destory()
                }
                return 
            }
            this.fd = fd
            this.emit('open')
        })
    }
}

module.exports = Readable
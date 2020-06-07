// 自定义实现readStream类
let fs = require('fs')
let EventEmitter = require('events')

class ReadStream extends EventEmitter{
    constructor(path, options = {}){
        super()
        this.path = path
        this.autoClose = options.autoClose || true
        this.flags = options.flags || 'r'
        this.encoding = options.encoding || null
        this.start = options.start || 0
        this.end = options.end || null,
        this.highWaterMark = options.highWaterMark || 64*1024
        // 应该有一个读取文件的位置 可变的
        this.pos = this.start

        // 控制当前是否是流动模式
        this.flowing = false

        // 构建读取到的内容存放容器buffer
        this.buffer = Buffer.alloc(this.highWaterMark)

        this.open() // 异步执行

        this.on('newListener', (type)=> {
            if (type === 'data') { // 用户监听了data事件，开始读取
                this.flowing = true
                this.read() // 开始读取
            }
        })
    }
    pipe(dest) {
        this.on('data', (data) => {
            let flag = dest.write(data)
            if (!flag) {
                this.pause()
            }
        })
        dest.on('drain', () => {
            this.resume()
        })
        this.on('end', () => {
            this.distroy()
        })
    }
    distroy() {
        // 判断文件是否打开（将文件关闭）
        if (typeof this.fd === 'number') {
            fs.close(this.fd, () => {
                this.emit('close')
            })
        }
        this.emit('close')
    }
    open() {
        fs.open(this.path, this.flags, (err, fd) => {
            if (err) {
                this.emit('error', err)
                if (this.autoClose) {
                    this.distroy() // 销毁 关闭文件（触发close）
                }
                return
            } else {
                this.fd = fd
                this.emit('open') // 触发文件开启事件
            }
        })
    }
    pause() {
        this.flowing = false
    }
    resume() {
        this.flowing = true
        this.read()
    }
    read() {
        // 这时候文件可能还没有打开呢 等待着文件打开后再去读取
        if (typeof this.fd !== 'number') {
            // 等待着文件打开再调用read方法
            return this.once('open', () => this.read())
        }

        // 开始读取
        // 文件可能有10个字符串
        // start 0      end 4
        // 每次读三个 
        // 第一次读 0-2
        // 第二次读 3,4 只剩下2个，但highWaterMark是2 所以以小的为准
        let howMuchToRead = this.end ? Math.min(this.highWaterMark, this.end - this.pos + 1) : this.highWaterMark
        // 文件描述符 bufer 读取到buffer的哪个位置  往buffer里放几个  
        fs.read(this.fd, this.buffer, 0, howMuchToRead, this.pos, (err, bytesRead) => {
            if (bytesRead > 0) { // 读取到内容了
                if (err) {
                    this.distroy()
                    this.emit('err', err)
                    return
                } else {
                    // 可能真是读到的比howMuchToRead小，emit真是读到的数据
                    let r = this.buffer.slice(0, bytesRead)
                    r = this.encoding ? r.toString(this.encoding) : r
                    this.emit('data', r)
                }
                this.pos += bytesRead
                if (this.flowing) {
                    this.read()
                }
            } else {
                this.emit('end')
                this.distroy()
            }
        })
    }
    
}

module.exports = ReadStream
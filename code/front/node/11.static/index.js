let http = require('http')
let url = require('url')
let path = require('path')
let util = require('util')
let fs = require('fs')

let mime = require('mime') // 内容类型
let debug = require('debug')('hello') // 打印输出 会根据环境变量控制输出
let chalk = require('chalk')
let ejs = require('ejs') // 可以在html中写语法表达式

// console.log(chalk.blueBright('hello'))

// debug('world') // cmd 窗口设置当前环境变量 set debug=hello 运行时会输出 hello world +0ms

// 写一个服务 可以当成静态服务
// 默认情况 写的路径去public下查找，后期public可能会变成任意路径
// proccess.cwd() // 当前执行路径

// dir public port 3000 ip localhost / 127.0.0.1
let stat = util.promisify(fs.stat)
let readdir = util.promisify(fs.readdir)
let config = require('./config')

let templateStr = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8') // 返回值是纯文本内容字符串
// console.log(templateStr)
// let str = ejs.render(templateStr, {name: 'zfpx', arr: [1,2,3]}) // 返回值是将变量替换完后的字符串
// console.log(str)

let zlib = require('zlib')

class Server{
    constructor(options){
        this.config = {...config, ...options} // 所有的属性都挂在实例上
        this.templateStr = templateStr
    }
    async handleRequest(req, res){
        let {pathname} = url.parse(req.url, true)
        // 找到的绝对路径
        let realPath = path.join(this.config.dir, pathname)
        // let realPath = path.join(__dirname, this.config.dir, pathname)
        debug(realPath)
        try {
            let statObj = await stat(realPath) // 文件存在(文件 / 文件夹)
            if (statObj.isFile()) { // 文件
                this.sendFile(req, res, statObj, realPath)
            } else { // 文件夹
                // 读出文件夹下的所有文件
                let dirs = await readdir(realPath)
                // 把目录映射成对象
                dirs = dirs.map(dir => {
                    // path要考虑多级嵌套的情况，多级的话要拼接上当前的请求路径
                    return {name: dir, path: path.join(pathname, dir)}
                })
                let str = ejs.render(this.templateStr, {dirs})
                res.setHeader('Content-Type', 'text/html;charset=utf-8')
                res.end(str)
            }
        } catch (e) {
            this.sendError(req, res, e)
        }
    }
    cache(req, res, statObj, realPath){
        // 强制缓存
        res.setHeader('Cache-Control', 'max-age=10') // 10秒内都有缓存
        res.setHeader('Expires', new Date(Date.now()+10*1000).toGMTString())
        // etag ctime + 文件的大小
        // Last-modified ctime
        let etag = statObj.ctime.toGMTString() + statObj.size
        let lastModified = statObj.ctime.toGMTString()

        res.setHeader('Etag', etag)
        res.setHeader('Last-Modified', lastModified)
        let ifNoneMatch = req.headers['if-none-match']
        let ifModifiedSince = req.headers['if-modified-since']
        // 比较请求和响应头缓存信息是否一致，不一致说明请求内容发生变化了，不取缓存内容
        if(etag !== ifNoneMatch) {
            return false
        }
        if(lastModified !== ifModifiedSince) {
            return true
        }
        return true
    }
    compress(req, res, statObj, realPath){ // 实现压缩功能
        let encoding = req.headers['accept-encoding']
        if (encoding) {
            if (encoding.match(/\bgzip\b/)) {
                res.setHeader('content-encoding', 'gzip')
                return zlib.createGzip()
            } else if (encoding.match(/\bdeflate\b/)) {
                res.setHeader('content-encoding', 'deflate')
                return zlib.createDeflate()
            } else {
                return false
            }
        } else {
            return false
        }

    }
    range(req, res, statObj, realPath){
        let range = req.headers['range']
        if (range) {
            let [,start,end] = range.match(/(\d*)-(\d*)/)
            start = start ? Number(start) : 0
            end = end ? Number(end) :  statObj.size - 1
            
            res.statusCode = 206
            res.setHeader('Accept-Ranges', 'bytes')
            res.setHeader('Content-Range', `bytes ${start}-${end}/${statObj.size}`)
            fs.createReadStream(realPath, {start, end}).pipe(res)
        }  
        return false
    }
    sendFile(req, res, statObj, realPath){ // 专门处理返回的文件
        res.setHeader('Content-Type',mime.getType(realPath)+';charset=utf-8')
        // 1.考虑缓存  有缓存返回true 没缓存返回false
        if (this.cache(req, res, statObj, realPath)) {
            res.statusCode = 304
            res.end()
            return
        }
        // 2.压缩问题 如果有压缩就返回压缩流
        let zip = this.compress(req, res, statObj, realPath)
        if (zip) {
            return fs.createReadStream(realPath).pipe(zip).pipe(res)
        }
        // 3.范围请求 如果有范围请求 就返回部分内容
        if (this.range(req, res, statObj, realPath)) {
            return
        }

        fs.createReadStream(realPath).pipe(res)
    }
    sendError(req, res, e){
        console.log(e)
        res.statusCode = 404
        res.end('Not Found')
    }
    start(){
        let server = http.createServer(this.handleRequest.bind(this))
        let {port, host} = this.config
        server.listen(port, host, function() {
            debug(`server start http://${host}:${chalk.blueBright(port)}`)
        })
    }
}

// let server = new Server(config)
// server.start()

module.exports = Server
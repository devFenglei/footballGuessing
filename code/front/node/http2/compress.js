let zlib = require('zlib')

// gzip压缩 xxx.gz

let fs = require('fs')
let path = require('path')
function gzip(source) {
    let creatGzip = zlib.createGzip() // 流 转化流
    let rs = fs.createReadStream(path.join(__dirname, source))
    rs.pipe(creatGzip).pipe(fs.createWriteStream(path.join(__dirname, source)+'.gz'))
}
gzip('1.txt')

function unGzip(source) {
    let createGunzip = zlib.createGunzip()
    let rs = fs.createReadStream(path.join(__dirname, source))
    fs.pipe(createGunzip).pipe(fs.createWriteStream(path.basename(source, 'gz')))
}
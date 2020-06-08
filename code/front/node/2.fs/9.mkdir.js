let fs = require('fs')
let path = require('path')
// 创建目录
// 创建目录的时候要求父目录必须要存在
// fs.mkdir('a/b/c', err => {
//     console.log(err)
//     if (!err) console.log('创建成功')
// })

// 判断一个文件是否存在
fs.access('b', err=>{
    if (!err) console.log('存在')
})

// 同步方式实现创建文件目录
function mkpSync(dir) {
    let dirs = dir.split(path.sep)
    dirs.forEach((dir,index) => {
        let current = dirs.slice(0, index+1).join(path.sep)
        try{
            fs.accessSync(current)
        } catch {
            fs.mkdirSync(current)
        }
    })
}
// mkpSync(path.join('a','b','c'))

// 异步方式实现创建文件目录
function mkpAsync(dir, callback) {
    let dirs = dir.split(path.sep)
    let index = 1
    // !和~都可以表示自执行函数
    !function next() {
        if (index > dirs.length) return callback()
        let current = dirs.slice(0, index++).join(path.sep)
        fs.access(current, err => {
            if (err) {
                fs.mkdir(current, next)
            } else {
                next()
            }
        })
    }()
}
// mkpAsync(path.join('a','b','c'), ()=> console.log('创建完成'))


// function access(dir) {
//     return new Promise((resolve, reject) => {
//         fs.access(dir, (err)=> err ? reject() : resolve())
//     })
// }

// function mkdir(dir) {
//     return new Promise((resolve, reject) => {
//         fs.mkdir(dir, err=> (err) ? reject() : resolve())
//     })
// }

function promisify(fn) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            fn.call(null, ...args, (err)=> err ? reject() : resolve())
        })
    }
}

// 终极解决方案 async await
function mkp(dir) {
    let dirs = dir.split(path.sep)
    dirs.forEach(async (dir,index) => {
        let current = dirs.slice(0, index+1).join(path.sep)
        try {
            await promisify(fs.access)(current)
        } catch {
            await promisify(fs.mkdir)(current)
        }
    })
}
mkp(path.join('a','b','c'))
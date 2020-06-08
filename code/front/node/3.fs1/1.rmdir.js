let fs = require('fs')
let path = require('path')
let util = require('util')

// 用异步不用同步

// 要删除目录，需要先把这个目录中的内容读出来
// 判断当前目录下 是文件还是文件夹
// 删除目录 fs.rmdirSync 删除文件用fs.unlink

// let files = fs.readdirSync('a')
// console.log(files) // ['b']
// files = files.map(file => path.join('a',file))
// console.log(files)

// files.forEach(file => {
//     let statObj = fs.statSync(file)
//     // isDirectory() 是否是目录
//     if (statObj.isDirectory()) {
//         fs.rmdirSync(file)
//     } else {
//         fs.unlinkSync(file)
//     }
// })

// 1、同步 先序 深度优先
// function rmdirSync(p) {
//     let pStatObj = fs.statSync(p)
//     if (pStatObj.isDirectory()) {
//         let files = fs.readdirSync(p)
//         dirs = files.map(file => path.join(p, file))
//         dirs.forEach(dir => {
//             // 深度 现将子删除，再删除掉自己
//             rmdirSync(dir)
//         })
//         fs.rmdirSync(p)
//     } else {
//         fs.unlinkSync(p)
//     }
// }
// rmdirSync('a')


// 2、promise版 先序 深度优先
// function removeDir(p) {
//     return new Promise((resolve, reject) => {
//         fs.stat(p, (err, statObj)=>{
//             if (statObj.isDirectory()) {
//                 fs.readdir(p, (err,dirs) => {
//                     // 映射路径
//                     dirs = dirs.map(file => path.join(p, file))
//                     // 映射成promise
//                     dirs = dirs.map(dir => removeDir(dir))
//                     Promise.all(dirs).then(() => {
//                         // 删除完子 删除自己
//                         fs.rmdir(p, resolve)
//                     })
//                 })
//             } else {
//                 fs.unlink(p, (err, resolve))
//             }
//         })
//     })
// }
// removeDir('a').then(data => {
//     console.log('删除成功')
// })


// 3、async+await版 先序深度优先
// let stat = util.promisify(fs.stat)
// let readdir = util.promisify(fs.readdir)
// let rmdir = util.promisify(fs.rmdir)
// let unlink = util.promisify(fs.unlink)
// async function removeDirAsync(p){
//     let statObj = await stat(p)
//     if (statObj.isDirectory()) {
//         let dirs = await readdir(p)
//         dirs = dirs.map(dir => path.join(p, dir))
//         dirs = dirs.map(dir => removeDirAsync(dir))
//         await Promise.all(dirs)
//         await rmdir(p)
//     } else {
//         // 要等待文件删除后 才让promise执行完 所以要加await 
//         // 不然直接返回undefind 打印删除完成，但实际是异步的，可能还没删除完
//         await unlink(p)
//     }
// }
// removeDirAsync('a').then(() => {
//     console.log('删除成功')
// })


// 4、回调版 先序深度优先 逻辑稍复杂 不如async+await逻辑清晰
// function removeDir(p, callback) {
//     fs.stat(p, (err, statObj) => {
//         if (statObj.isDirectory()) {
//             fs.readdir(p, (err, dirs) => {
//                 dirs = dirs.map(dir => path.join(p, dir))
//                 // next函数用来递归异步
//                 !function next(index) {
//                     if (index === dirs.length) return fs.rmdir(p, callback)
//                     // 删除目录后 将下一次的删除继续传递
//                     removeDir(dirs[index], () => next(index + 1))
//                 }(0)
//             })
//         } else {
//             fs.unlink(p, callback)
//         }
//     })
// }
// removeDir(p, () => {
//     console.log('删除成功')
// })


// 5、广度优先 先序
function removeDir(p, callback) {
    let arr = [p]
    let index = 0
    let current
    while (current = arr[index++]) {
        let statObj = fs.statSync(current)
        if (statObj.isDirectory()) {
            let dirs = fs.readdirSync(current)
            dirs.forEach(dir => arr.push(path.join(current, dir)))
        }
    }
    for (let i = arr.length; i >= 0; i--) {
        let statObj = fs.statSync(arr[i])
        if (statObj.isDirectory()) {
            fs.rmdirSync(arr[i])
        } else {
            fs.unlinkSync(arr[i])
        }
    }
    callback()
}
removeDir('a',() => {
    console.log('删除成功')
})
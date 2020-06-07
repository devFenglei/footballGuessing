// 在文件中写代码，最外层是有个闭包的
console.log(this) // 是空对象 在文件中this不是global
// 我们在浏览器中不能直接访问global，而是通过window代理
// 在服务端可以直接访问global

// console.log(global)
// console 输出
// process 进程
//   argv 执行参数
//   env 环境变量
//   pid 进程id
//   chdir  改变目录
//   cwd    当前工作目录 
//   nextTick 下一队列
//   stdout 标准输出
//   stderr 错误输出
//   stdin  标准输入
//   kill   杀死进程
//   exit   退出

// Buffer
// clearImmediate
// setImmeidate

process.chdir('node')
console.log(process.cwd()) // d:\珠峰架构第四期\code vscode编译器中会读到根目录 可以用chdir改变

// console.dir(global, {showHidden: true})

// 标准输出 1
// console.log('hello')
// console.info('info')
// 错误输出 2
// console.warn('warnning')
// console.error('error')

// node node.js > 1.log

// process.stdout.write('hello') // 标准输出 和 console.log()调的是同一个接口
// process.stderr.write('error') // 错误输出 和 console.err()
// 标准输入 0
// process.stdin.on('data', function(data) {
//     // data默认是二进制
//     console.log(data.toString())
// })

// node中有一个专门做断言的库 assert
// console.assert(1===1, '错误') // 断言，如果是错误的，打印后边的

// console.time('tag1')
// console.timeEnd('tag1')
// 能计算出两段代码间执行的耗时

// console.dir() // 底层是调用库的方法 util.inspect() 解析打印的详细信息

// console.log(process.argv) // 可以解析执行命令时传递的参数
/*
    [ 'C:\\Program Files\\nodejs\\node.exe',
    'd:\\珠峰架构第四期\\code\\node\\node1.js' ]
*/

// node node1.js --port 3000 --color red
console.log(process.argv)
/*
 [ 'C:\\Program Files\\nodejs\\node.exe',
    'D:\\珠峰架构第四期\\code\\node\\node1.js',
    '--port',
    '3000',
    '--color',
    'red' ]
*/
let obj = {}
process.argv.slice(2).forEach((item, index, arr) => {
    if(item.includes('--')) {
        obj[item.slice(2)] = arr[index + 1]
    }
})
console.log(obj) // { port: '3000', color: 'red' }

// 环境变量 set my=dev && node xxx.js (关闭窗口就消失了)
// 用来区分代码的环境
let url = ''
if (process.env.my === 'dev') {
    url = 'devxxx'
} else {
    url = 'productxxx'
}
console.log(url)

process.kill(2100) // 可以杀死进程，参数是进程id（pid）
process.exit() // 退出进程 退出自己 参数可以是标志

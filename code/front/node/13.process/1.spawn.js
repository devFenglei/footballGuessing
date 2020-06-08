// spawn 产卵 fork 叉子(基于spawn)  execFile 执行文件 exec 执行命令

let {spawn} = require('child_process')
let path = require('path')

// 开启的进程都是回调的方式

// node 1.spawn.js
// node sub_process.js
// 主进程中开启子进程

// stdin 0  stdout 1  stderr 2
// 如果stdio 写的是0，1，2 表示主进程和子进程共用了 标准输入 标准输出 错误输出
let child = spawn('node', ['sub_process1.js', '--port', '3000'], {
  cwd: path.join(__dirname, 'test'),
  // stdio: [process.stdin, process.stdout, process.stderr]
  stdio: ['pipe']
})
child.on('error', (err)=> {
  console.log(err)  
})

child.on('exit', () => {
  console.log('exit')
})

// child.on('close', () => {
//   console.log('close')
// })

child.stdout.on('data', (data) => {
  console.log(data.toString())
})

child.stderr.on('data', (data) => {
  console.log(data.toString())
})
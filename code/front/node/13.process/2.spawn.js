// spawn 产卵 fork 叉子(基于spawn)  execFile 执行文件 exec 执行命令

let {spawn} = require('child_process')
let path = require('path')

// 在主进程中开启两个子进程 先运行第一个子进程给他传递一些参数 将参数取出，返还给主进程
// 主进程再把结果传递给另一个子进程写入到文件中

let child1 = spawn('node', ['1.js', 'a', 'b'], {
  cwd: path.join(__dirname, 'test'),
  // stdio: [0,1,2] // 不能通信，无法获得子进程的结果
  stdio: ['pipe']
})

child1.stdout.on('data', (data) => {
  console.log(data.toString())
  // 结果拿到后 传给第二个子进程
  child2.stdout.write(data.toString())
})

let child2 = spawn('node', ['2.js'], {
  cwd: path.join(__dirname, 'test')
  // stdio不写默认就是pipe
})


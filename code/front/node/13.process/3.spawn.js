
let {spawn} = require('child_process')
let path = require('path')

let child = spawn('node', ['sub_process3.js'], {
  cwd: path.join(__dirname, 'test'),
  // 写一个pipe，默认三个都是pipe
  // ignore 忽略
  // ipc 标准进程通信 api -> send message
  // ipc写的位置随意，只要这几个参数中有一个是ipc 就可以使用send 和 message api通信
  stdio: [0, 1, 2, 'ipc']
})

// 父进程可以杀死子进程 子进程可以自己退出(exit)
child.on('message', (data) => {
  console.log(data)
  child.send('world')
  process.kill(child.pid)
})

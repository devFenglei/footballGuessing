
let {spawn} = require('child_process')
let path = require('path')

let child = spawn('node', ['detach.js'], {
  cwd: path.join(__dirname, 'test'),
  // 独立的，true子进程和父进程断绝关系，独立运行
  detached: true,
  stdio: 'ignore' // 必须这样设置，规定
})

child.unref() // 断绝关系

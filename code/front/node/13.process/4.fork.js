let {fork} = require('child_process')
let path = require('path')
let spawn = require('child_process')

let child = fork('fork.js', ['a','b'], {
    cwd: path.join(__dirname, 'test'),
    // silent 为true时，表示安静，忽略子进程的动作 相当于 stdio参数为ignore
    silent: false
})
child.send('hello')

// 自己实现fork fork就是基于spawn的，默认采用ipc的方式，silent
// function fork(modulePath, args, options) {
//     let stdio = options.silent ? ['ignore', 'ignore', 'ignore', 'ipc'] : [0,1,2,'ipc']
//     return spawn('node', [modulePath, ...args], {
//         ...options,
//         stdio
//     })
// }
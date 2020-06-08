#! /usr/bin/env node

// console.log('hello')
// commander 命令行方式解析命令行内容
// args

let commander = require('commander')

// 监听命令行输入--help时事件，需要放在parse之前
commander.on('--help', function() {
    console.log('\r\n how to use:\r\n')
    console.log('   fl-http-server --port <val> ')
    console.log('   fl-http-server --host <val>')
    console.log('   fl-http-server --dir <val>')
})

// 解析当前进程执行时的参数
commander
    .version('1.0.0')
    .usage('fl-server [options]')
    .option('-p, --port <n>', 'server-port default 3000')
    .option('-o, --host <n>', 'server host default localhost')
    .option('-d, --dir <n>', 'server dir')
    .parse(process.argv)

    // console.log(commander.port, commander.host)

let Server = require('../index.js')
let server = new Server(commander)
server.start()

let {exec} = require('child_process')
console.log(process.platform) // 操作系统平台

if (process.platform === 'win32') {
    exec('start http://localhost:3000')
} else {
    exec('open http://localhost:3000')
}
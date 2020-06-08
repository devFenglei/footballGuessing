let {exec, execFile} = require('child_process')

exec('ls', function(err, stdout, stderr){
    console.log(stdout)
})

// exec是基于 execFile的 直接执行命令
exec('node --version', function(err, stdout, stderr){
    console.log(stdout)
})

// execFile是基于 spawn的 可以通过数组的方式传递参数
execFile('ls', ['-ll'], function(err, stdout, stderr){
    console.log(stdout)
})
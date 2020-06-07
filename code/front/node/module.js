// 模块化（AMD、CMD）规范

/*
    模块化（私有化，互相调用，方面代码维护）
    1、写法都是统一的
    

    单例模式，闭包
    闭包：函数执行后返回一个引用空间这个引用空间被外部引用，此空间无法销毁。

    requireJs、seaJs（不再维护）
    esmodule es6的规范（node里不支持）bable进行转义

    commonJs规范
    1、模拟实现（一个js文件就是一个模块）为了实现模块化的功能，每个文件外面都包含一个闭包
    2、规定如果导出一个模块 module.exports
    3、规定如果导入一个模块 require

    node中有三种模块
    1、核心模块、内置模块 fs http net url util... node提供的，不需要下载的
    2、第三方模块 安装使用的，用法和核心模块一样
    3、文件模块 自己写的

    模块require方法是同步的
*/

let fs = require('fs')
// 访问文件，这个方法会判断文件是否存在，若不存在，会返回一个error
fs.accessSync('package-lock.json') // 默认读根目录

let vm = require('vm') // 沙箱
var a = 1
eval('console.log(a)') // 1 eval会在当前上下文环境中运行
// vm.runInThisContext('console.log(a)') // ReferenceError: a is not defined； runInThisContext不受外界影响

vm.runInThisContext('function b() { return 200 }')
console.log(b()) // 200

// 专门处理路径的
let path = require('path')
console.log(path.join('a', 'b', 'c')) // a\b\c
// join 和 resolve 用法基本一样
console.log(path.join(__dirname, 'a', 'b', 'c')) // __dirname是把当前文件路径拼在前面 d:\珠峰架构第四期\code\node\a\b\c
console.log(path.resolve(__dirname, 'a', 'b', 'c')) // __dirname是把当前文件路径拼在前面 d:\珠峰架构第四期\code\node\a\b\c
console.log(path.basename('a.js', '.js')) // a 第二个参数是除了xxx
console.log(path.extname('a.js')) // .js

console.log(path.sep) // 返回文件路径分隔符 window是 \号 ；mac是 /号
console.log(path.delimiter) // 返回环境变量分隔符 window是 ;号； mac是: 号 
console.log(path.posix.delimiter) // : 返回linux下的环境变量分隔符


/* 
    node中怎么调试
    1、命令行调试 命令行输入 node inspect xxx.js 想执行下一步输入n回车
    2、浏览器调试 命令行输入 node --inspect-brk xxx.js
    3、编译器调试 √

*/


// node介绍，事件环 https://blog.csdn.net/eeewwwddd/article/details/80862682
/*
    进程: 是操作系统分配资源和调度任务的基本单位
    线程: 是建立在进程上的一次程序运行单位，一个进程上可以有多个线程。
*/
Promise.resolve().then(data => {
    console.log('promise1')
    setTimeout(() => {
        console.log('timeout1')
    }, 0)
})
setTimeout(() => {
    console.log('timeout2')
    Promise.resolve().then(data => {
        console.log('promise2')
    })
}, 0)
/*
    浏览器环境执行顺序
        promise1
        timeout2
        promise2
        timeout1

    node中执行顺序
        promise1
        timeout2
        timeout1
        promise2
    默认将timers的阶段的内容全部执行完后，切换阶段时执行微任务
*/

Promise.resolve().then(data => {
    console.log('promise')
})
process.nextTick(() => {
    console.log('nextTick')
})
// 微任务中，最早执行的是nextTick，然后才是peomise.then


setImmediate(() => { // IE支持
    console.log('setImmediate')
})
setTimeout(() => {
    console.log('setTimeout')
}, 0)
// 不一定谁会先执行 因为node执行时，会有准备工作（会浪费一定的时间）

let fs = require('fs')
fs.readFile('./node1.js', 'utf-8', function(data) {
    setTimeout(() => {
        console.log('setTimeout')
    }, 0)
    setImmediate(() => {
        console.log('setImmediate')
    })
})
// 一定会先走setImmediate，因为readFile属于poll阶段，poll阶段的下一阶段是check阶段，check阶段会检查是否有setImmediate，有的话会执行


var a = 1
console.log(global.a) // undefined 因为外边默认包着一个函数形成了闭包


global.a = 10
console.log(a) // 10

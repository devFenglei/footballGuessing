// 事件的“发布” “订阅”
let EventEmitter = require('events')
let e = new EventEmitter()

e.on('newListener', function(type) {
    // 只要绑定时间就会进这个函数
    console.log(type)
    if (type === '水开了') {
        process.nextTick(() => {
            console.log(`绑定了${type}`)
        })
    }
})

e.setMaxListeners(5)
console.log(EventEmitter.defaultMaxListeners) // 10 默认
console.log(e.getMaxListeners()) // 5

// 订阅
e.on('水开了',function(who) { // {水开了: [fn, fn]}
    console.log(`${who}吃泡面`)
})
e.once('水开了',function(who) {
    console.log(`${who}洗脸`) // 触发一次
})

// e.removeListener('水开了', fn)
// e.removeAllListeners('水开了')

console.log(e.eventNames())

// 在前边插入事件绑定
e.prependListener('水开了', function() {
    console.log('吃饭')
})

// e.prependOnceListener('水开了', function() {
//     console.log('prependOnceListener')
// })

// 发布
e.emit('水开了', '我')
e.emit('水开了', '我')

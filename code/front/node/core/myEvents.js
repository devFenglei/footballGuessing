function EventEmitter() {
    this._events = Object.create(null) // 这样创建出来的对象没有多余的属性 __proto__
}

EventEmitter.defaultMaxListeners = 10

EventEmitter.prototype.on = EventEmitter.prototype.addListener = function(eventName, callback, flag) {
    if (!this._events[eventName]) this._events = Object.create(null)
    if(eventName !== 'newListener') {
        if(this._events['newListener'] && this._events['newListener'].length) {
            this._events['newListener'].forEach(fn => fn(eventName))
        }
    }
    if (this._events[eventName]) {
        if (flag) {
            this._events.unshift(callback)
        } else {
            this._events.push(callback)
        }
    } else {
        this._events[eventName] = [callback]
    }

    if (this._events[eventName].length - 1 === this.getMaxListeners()) {
        console.warn(`MaxListenersExceededWarning: Possible EventEmitter
         memory leak detected. ${this._events[eventName].length} ${eventName} listeners added.
          Use emitter.setMaxListeners() to increase limit`)
    }
}

EventEmitter.prototype.once = function(eventName, callback, flag) {
    const fn = (...args) => {
        callback(...args)
        this.removeListener(eventName, fn)
    }
    fn.g = callback
    this.on(eventName, fn, flag)
}

EventEmitter.prototype.prependListener = function(eventName, callback) {
    this.on(eventName, callback, true)
}

EventEmitter.prototype.prependOnceListener = function(eventName, callback) {
    this.once(eventName, callback, true)
}

// 删除某个监听
EventEmitter.prototype.removeListener = function(eventName, callback) {
    this._events[eventName].filter(fn => (fn !== callback && fn.g !== callback))
}

// 删除全部监听
EventEmitter.prototype.removeAllListeners = function(eventName) {
    this._events[eventName] = []
}

// 返回事件的名字
EventEmitter.prototype.eventNames = function() {
    return Object.keys(this._events)
}

// 设置最大监听数
EventEmitter.prototype.setMaxListers = function(n) {
    this.count = n
}

// 获取最大监听数
EventEmitter.prototype.getMaxListeners = function() {
    return this.count || EventEmitter.defaultMaxListeners
}

EventEmitter.prototype.emit = function(eventName, ...args) {
    if (this._events[eventName]) {
        this._events.forEach(fn => fn.call(this, ...args))
    }
}

module.exports = EventEmitter
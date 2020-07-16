function resolvePromise(promise2, x, resolve, reject) {
  if (x === promise2) {
    reject(new TypeError('[TypeError: Chaining cycle detected for promise #<Promise>]'))
  } else {
    if ((x && typeof x === 'object') || typeof x === 'function') {
      let called // 防止别人的promise既调成功又调失败
      try {
        const then = x.then
        if (typeof then === 'function') { // 就是promise
          then.call(x, y => { // y也可能是一个promise
            if (called) return 
            called = true
            // 递归解析，直到返回的是普通值
            resolvePromise(promise2, y, resolve, reject)
          }, r => {
            if (called) return 
            called = true
            reject(r)
          })
        } else { // 普通对象
          resolve(x)
        }
      } catch (e) {
        if (called) return 
        called = true
        reject(e)
      }
    } else { // 普通值
      resolve(x)
    }
  }
}

class Promise{
  constructor(executor) {
    console.log('my')
    this.value = ''
    this.reason = ''
    this.status = 'PENDING'

    this.resolveCallbacks = []
    this.rejectCallbacks = []

    const resolve = (val) => {
      if (this.status === 'PENDING') {
        this.value = val
        this.status = 'FULFILLED'
        this.resolveCallbacks.forEach(fn => fn())
      }
    }

    const reject = (reason) => {
      if (this.status === 'PENDING') {
        this.reason = reason
        this.status = 'REJECTED'
        this.rejectCallbacks.forEach(fn => fn())
      }
    }

    try {
      executor(resolve, reject)
    } catch(e) {
      reject(e)
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
    onRejected = typeof onRejected === 'function' ? onRejected : err => {throw err}
    const promise2 = new Promise((resolve, reject) => {
      if (this.status === 'FULFILLED') {
        setTimeout(() => {
          try{ // 防止执行then中抛出错误
            const x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
      if (this.status === 'REJECTED') {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      }
      if (this.status === 'PENDING') {
        this.resolveCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })
        this.rejectCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          })
        })
      }
    })
    return promise2
  }
}

Promise.defer = Promise.deferred = function() {
  let dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}

module.exports = Promise
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 500)
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(2)
  }, 1000)
})

Promise.race = (promises) => {
  console.log('my')
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      const promise = promises[i]
      if (promise && typeof promise.then === 'function') {
        promise.then(resolve, reject)
      } else {
        resolve(promise)
      }
    }
  })
}

Promise.race([3, p1, p2]).then(data => {
  console.log(data)
})
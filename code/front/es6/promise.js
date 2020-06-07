/*
    1。promise 可以链式调用
    2、可以支持处理多个并发的请求
    3、可以解决异步的问题，本身不能说promise是异步的

    Promise只有一个参数 叫excutor执行器 默认new时就会调用
    每一个promise实例都有一个then方法，then方法有两个参数，一个参数叫成功的函数，一个方法叫失败的函数
    promise中发生错误，就会执行reject
    then方法是异步调用的
    一个promise的实例可以then多次

    promise.all()、promise.race()会返回一个新的promise
*/
let p = new Promise((resolve, reject) => {
    resolve('1');
    // reject('2'); // 一旦状态发生了变化，状态就不可改变，这句不会执行，被屏蔽了
});
p.then((value) => {

}, (value) => {

})

p.then((value) => {

}, (value) => {

})

p.then((value) => {

}, (value) => {

})

let p1 = Promise.all([promise1, promise2])
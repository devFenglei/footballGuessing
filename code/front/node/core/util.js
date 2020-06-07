// util工具、包 核心内置模块
let util = require('util')
let fs = require('fs')
// console.log(util)
util.promisify // 将带回调的方法转为promise的方法
let rd = util.promisify(fs.readFile)
async function read (url) {
    let p = await rd(url, 'utf8')
    console.log(p)
}
// read('node/core/test.js')

// util继承 类的继承
// 继承实力的属性和公有属性
function Parent() {
    this.name = 'parent'
}
Parent.prototype.eat = '吃'
function Child() {

}
util.inherits(Child, Parent) // 是继承公有属性的
// Object.setPrototypeOf(Child.prototype, Parent.prototype)
// Child.prototype.__proto__ = Parent.prototype
let child = new Child
console.log(child.name) // undefined
console.log(child.eat) // 吃

// extends

util.isArray
util.isString
util.isDate
util.isNull
util.isNumber
util.isBoolean

util.inspect() // 
console.log(util.inspect({name: 1},{showHidden: true, depth: 1})) // 底层调用的是congsole.dir


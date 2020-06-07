// 高阶函数形式一，函数内部返回函数
function isType(type) {
    return function(content){
        let t = Object.prototype.toString.call(content).replace(/\[object\s|\]/g, '');
        return t === type;
    }
}
let arr = ['String', 'Number', 'Array', 'Object', 'Null'];
let util = {};
arr.forEach(item => {
    util[`is${item}`] = isType(item);
})
console.log(util);
console.log(util.isString('qwer'));


// 高阶函数形式二，函数当做方法参数，典型的callback
function after(times, callback){
    return function(){
        if(--times === 0) {
            callback();
        }
    }
}
let fn = after(3, () => {
    console.log('回调执行了');
});
fn();
fn();
fn();
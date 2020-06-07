let name = 'fl';
let age = 18;
let str = fn`hello~${name}今年${age}岁了。`
function fn() {
    console.log(arguments) // { '0': [ 'hello~', '今年', '岁了。' ], '1': 'fl', '2': 18 }
    const strings = arguments[0];
    const values = [].slice.call(arguments, 1);
    let str = '';
    for (let i = 0, len = values.length; i < len; i++) {
        str += `${strings[i]}*${values[i]}*`;
    }
    str += strings[strings.length - 1];
    return str
}
console.log(str)

// includes
// startsWith
// endsWith
// padStart 补全
// padEnd

/* slice多层数组的话是浅拷贝，如果是一层数组的话是深拷贝
    ...也是浅拷贝
    JSON.parse(JSON.stringify(jsonObj)) 对于非json格式对象非json属性会丢掉
*/

// 实现深拷贝 保留继承关系 可以实现各种类型的拷贝 实现递归拷贝


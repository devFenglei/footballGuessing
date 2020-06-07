// base64 编码的转化
// md5 摘要算法 (不可逆)
// 加密算法

let crypto = require('crypto')
console.log(crypto.getHashes())

// 对一个文件声明一个字段 字段是唯一的 如果文件变了 就会更改

// md5 特点
/*
    1.摘要的内容不一样 出来的结果就不一样
    2.文件的内容一样 出来的结果就一样
    3.md5结果是定长的
    4.不可逆
*/

let str = 'hello'
let r = crypto.createHash('md5').update(str).digest('base64') // update 参数可以是字符串或buffer digest 参数是输出格式 hex 16进制
console.log(r)

// 大文件加密   可以多次调用update方法更新
let result = crypto.createHash('md5').update('h').update('ell').update('o').digest('hex')
console.log(result)

// hmac算法 加盐算法 (秘钥) 不能丢失秘钥
let mac = crypto.createHmac('sha256', 'zfpx')
mac.update('hello')
let r2 = mac.digest('hex')
console.log(r2)
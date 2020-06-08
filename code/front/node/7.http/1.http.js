// url 完整的路径
// http://username:passwork@www.baidu.com:8080/src/index.html?a=1&b=2#hash      
// hash服务器端是获取不到的

// let url = require('url')
// let str = 'http://username:passwork@www.baidu.com:8080/src/index.html?a=1&b=2#hash'

// // 第二个参数true时，可以将query的值变为对象
// let urlObj = url.parse(str, true)
// console.log(urlObj)

// Url {
//     protocol: 'http:',
//     slashes: true,
//     auth: 'username:passwork',
//     host: 'www.baidu.com:8080', // 主机
//     port: '8080',
//     hostname: 'www.baidu.com', // 主机名
//     hash: '#hash',
//     search: '?a=1&b=2',
//     query: 'a=1&b=2',          // 问号后面的内容
//     pathname: '/src/index.html', // 路径，可以根据不同的路径返回不同的内容
//     path: '/src/index.html?a=1&b=2',
//     href: 'http://username:passwork@www.baidu.com:8080/src/index.html?a=1&b=2#hash' 
// }


// let s = 'a=1&b=2&c=3'
// let queryObj = {}
// s.replace(/([^=&])=([^=&])/g, (a,b,c) => {
//     queryObj[b] =c
// })
// console.log(queryObj)

// 请求方法
// GET PUT DELETE POST (restful API)

// Request Headers中
/*
    Accept: 可以接收的类型
    Accept-Encoding: 可以接收返回内容的压缩格式
    Accept-Language: 可以接收的语言
    Cache-Control: 是否需要缓存
*/
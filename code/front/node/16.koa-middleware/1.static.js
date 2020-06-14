let fs = require('fs')
let path = require('path')
// let ejs = require('ejs')

let result = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8')

let renderObj = {
    name: 'zfpx',
    age: 10
}

// let str = ejs.render(result, renderObj)

// [\s\S]*?表示匹配任意字符，且只匹配一次，即懒惰匹配；
// 如果是[\s\S]*没有带?号，也表示匹配任意字符，但允许匹配任意次，即贪婪匹配。
let str = result.replace(/<%=([\s\S]*?)%>/g, function() {
    return renderObj[arguments[1]]
})
console.log(str)

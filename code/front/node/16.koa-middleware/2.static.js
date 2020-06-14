let fs = require('fs')
let path = require('path')

// with(renderObj) {
    //     const name = name
    //     console.log(name)
    // }
    
    // 第一个参数是参数，第二个参数是函数体
    // let fm = new Function('obj', `console.log(obj)`)
    
let renderObj = {name: 'zfpx',age: 10,arr: [1,2,3]}
let result = fs.readFileSync(path.join(__dirname, 'index1.html'), 'utf8')
function render(renderObj) {
    let head = "let templ; \r\n"
    head += "with (renderObj){ \r\n templ+=`"
    let content = result.replace(/<%([\s\S]*?)%>/g,function() {
        return '${' + arguments[1] + '}'
    })
    content = result.replace(/<%([\s\S]*?)%>/g,function() {
        return "`\r\n" + arguments[1] + "\r\ntempl="
    })
    let tail = "`} \r\n return templ"
    return head + content + tail
}
render(renderObj)

let fn = new Function('renderObj', render())
fn(renderObj)
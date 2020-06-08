let fs = require('fs')
// utf8
// readFile是把整个文件作为一个整体
fs.readFile('./1.txt', {encoding: 'utf8'},function(err, data) {
    console.log(err)
    console.log(data)
})

let result = fs.readFileSync('./1.txt', {encoding: 'utf8'})
console.log(result)

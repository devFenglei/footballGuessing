const fs = require('fs')
function copy(src, dest, callback) {
    fs.readFile(src,(err,data) => {
        fs.writeFile(dest,data,callback)
    })
}
copy('3.txt', '4.txt', (data) => {
    console.log('copy完成')
})
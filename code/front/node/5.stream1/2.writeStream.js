let fs = require('fs')

let ws = fs.createWriteStream('./15.txt', {
    flags: 'w',
    encoding: null,
    mode: 0o666,
    highWaterMark: 3,
    start: 0,
    autoClose: true
})

for(let i = 0; i < 9; i++) {
    let flag = ws.write(i+ '', 'utf8', ()=>{})
    console.log(flag)
}

let i = 9
function write() {
    let flag = true
    while (i < 9 && flag) {
        flag = ws.write(i + '', () => {})
    }
}
// write()
ws.on('drain', () => {
    
})
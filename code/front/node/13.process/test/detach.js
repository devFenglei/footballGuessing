let fs = require('fs')

setInterval(() => {
    fs.appendFileSync('1.txt', 'hello')
}, 1000);
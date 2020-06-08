let fs = require('fs')
process.stdout.on('data', (data) => {
    fs.appendFileSync('xxx.txt', data)
})
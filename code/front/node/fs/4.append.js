let fs = require('fs')
fs.appendFile('./4.txt', '678', (err,data) => {
    console.log(data)
})

fs.writeFile('./4.txt', '901', {flag: 'a'}, () => {

})
let fs = require('fs')
fs.writeFile('./2.txt', '123', {encoding: 'utf8'}, function(data){
    console.log(data) // null
})

fs.writeFileSync('./3.txt','345')
let net = require('net')

let client = net.createConnection({port: 3000})

client.write('hello')

client.on('data',function(data) {
    console.log(`服务端说${data}`)
})
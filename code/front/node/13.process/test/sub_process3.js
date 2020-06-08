process.send('hello')
process.on('message', (data) => {
    console.log(data)
})
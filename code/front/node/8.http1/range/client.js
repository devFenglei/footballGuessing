// 定时发起请求 把请求到的结果 写入到download.txt中

let http = require('http')
let fs = require('fs')

let config = {
    host:'localhost',
    port:3000
}

let pause = false
process.stdin.on('data', (data) => {
    if (data.toString().includes('p')) {
        pause = true
    } else if (data.toString().includes('r')) {
        pause = false
    }
})

let ws = fs.createWriteStream(__dirname+'/download.txt')
let start = 0
function download() {
    config.headers = {
        'Range': `bytes=${start}-${start+4}`
    }
    start += 5
    let client = http.request(config, res=>{
        let buffers = []
        res.on('data', data=>{
            buffers.push(data)
        })
        res.on('end', ()=>{
            ws.write(Buffer.concat(buffers))
            setTimeout(() => {
                let total = res.headers['content-range'].split('/')[1]
                if (pause && start < total) {
                    download()
                }
            }, 1000)
        })
    })
    client.end() // 必须调用end否则不会结束
}
download()
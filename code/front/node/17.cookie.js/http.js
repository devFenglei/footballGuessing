let http = require('http')

/**
 * domain 限制访问的允许域
 * path 可以访问的路径
 * expires 过期时间 单位为毫秒
 * max-age 过期时间 单位为秒
 * httoOnly 为true时只能服务端修改cookie的值
 */
http.createServer(function(req, res){
    if (req.url === '/read') {
        res.end(req.headers['cookie'])
    } else if (req.url === '/write') {
        res.setHeader('Set-Cookie', [
            'name=zfpx; Domain=cs.portal; httpOnly=true',
            `age=10; expires=${new Date(Date.now() + 1000*10).toGMTString()}`,
            `address=${encodeURIComponent('中文')}; max-age=10`
        ])
        res.end('wirte end')
    } else {
        res.end('no cookie')
    }
}).listen(3000)
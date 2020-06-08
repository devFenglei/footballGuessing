## 可读流文件 (fs.read)
- on('open')
- on('close')
- on('data')
- on('end')
- rs.pause()
- rs.resume()


## 可写流 (fs.write)
- 第一次写入 就是真的写入 之后的写入就放到了缓存中
- highWaterMark <= 缓存区的长度比
- write('content', encoding, clearBuffer)

## pipe

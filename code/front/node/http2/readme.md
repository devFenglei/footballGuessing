## 范围请求
- 客户端请求：range: bytes=0-5
- 服务端响应：
    - Accept-Ranges: bytes
    - Content-Range: bytes 0-5/750

## 多语言
- 客户端请求：Accept-Language:zh-CN,zh;q=0.9
- 服务端响应：content-language:zh-CN

## refer    referred
- 判断当前内容的引用来源

## 缓存
- 强制缓存 cache-control:'max-age=10'  Expires:绝对时间
- 对比缓存 服务端设置：Etag 客户端自带的：if-none-match 如果两个值相等 取缓存
- Last-modified     if-modified-since

## host虚拟主机
- 每次请求时都会带一个host主机，可以通过不同的主机访问不同的服务

## 请求体的内容类型
- content-type: 'x-www-form-urlencoded'
- content-type: 'application/json'
- content-type: 'multiple/form-part'

## compress服务端压缩 转换流
- 客户端请求：Accept-Ecoding: gzip, deflate, br
- 客户端响应：content-ecoding: gzip

> zlib模块

## 命令行工具
- 要判断当前我们请求的路径是文件还是文件夹
- 如果是文件就打开文件，如果是文件夹就列出文件夹的内容
- http-server
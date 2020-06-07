## http

## 状态码类别
- 类别      原因短语
- 1xx       Informational(信息性状态码)
- 2xx       Success(成功状态码)
- 3xx       Redirection(重定向)
- 4xx       Client Error(客户端错误状态码)
- 5xx       Server Error(服务器错误码)

## 2xx 成功
- 200       OK 客户端发过来的数据被正常处理
- 204       Not Content 正常响应，没有实体
- 206       Partial Content 返回请求，返回部分数据，响应报文中由Content-Range指定实体内容

## 3xx 重定向
- 301       Moved Permanently 永久重定向
- 302       Found 临时重定向，规范要求 方法名不变，但是都会改变
- 303       See Other 和302类似，但必须用GET方法

## 4xx 客户端错误
- 400       Bad Request 请求报文语法错误
- 401       Unauthorized 需要认证
- 403       Forbidden 服务器拒绝访问对应的资源
- 404       Not Found 服务器上无法找到资源

## 5xx 服务端错误
- 500       Internal Server Error 服务器故障
- 503       Service Unavaliable 服务器处于超负载或正在停机维护
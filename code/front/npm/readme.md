## npm 

## 文件模块的查找规范
- 包都有个pack.json  npm init -y
- 先去找文件名（包）没有的话才会去找文件

## 怎么实现全局模块
- 先初始化包 npm init -y
```
"bin": {
    "zfpx": "./bin/www.js"
}
```
- 脚本文件中头配置 #! /usr/bin/env node 按照Node方式运行
- npm link 链接到全局的npm中

## 怎么发布一个包
- 官网地址 https://www.npmjs.com/ 注册账号
- package.json文件目录下执行 npm addUser lei.feng 520Wyt1314! 18210621339@613.com
- npm publish
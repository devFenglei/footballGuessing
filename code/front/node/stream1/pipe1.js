let ReadStream = require('./ReadStream')
let WriteStream = require('./WriteStream')

let rs = new ReadStream('./16.txt')
let ws = new WriteStream('./17.txt')

rs.pipe(ws)
// 不必担心淹没内存了
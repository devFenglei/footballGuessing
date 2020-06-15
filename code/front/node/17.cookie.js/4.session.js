let Koa = require('koa')
let Router = require('koa-router')
const { v4: uuidv4 } = require('uuid')

let app = new Koa()
let router = new Router()

let session = {}
const cardName = 'CARD_NAME'
// session是基于cookie的 相对于cookie是安全的 因为session是存在服务端的
router.get('/towash', (ctx, next) => {
    let cardId = ctx.cookies.get(cardName)
    if (cardId) { // 消费
        if (session[cardId]) {
            session[cardId].count -= 1
            ctx.body = `您的卡号是${cardId}，次数是${session[cardId].count}`
        } else { // 可能是伪造的
            let cardId = uuidv4()
            session[cardId] = {count: 5}
            ctx.cookies.set(cardName, cardId)
            ctx.body = `您的卡号是${cardId}，次数是${session[cardId].count}`
        }
    } else { // 办卡
        let cardId = uuidv4()
        session[cardId] = {count: 5}
        ctx.cookies.set(cardName, cardId)
        ctx.body = `您的卡号是${cardId}，次数是${session[cardId].count}`
    }
})

app.use(router.routes())
app.listen(3000)
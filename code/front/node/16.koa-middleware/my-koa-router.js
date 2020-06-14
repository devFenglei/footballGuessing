class Layer{
    constructor(path, fn) {
        this.path = path
        this.fn = fn
    }
    match(p) {
        return this.path === p
    }
}

class Router{
    constructor() {
        // 存放每一个路由
        this.layers = []
    }
    get(path, fn) {
        // 存放在类中，后期可以随意扩展
        this.layers.push(new Layer(path,fn))
    }
    routes() {
        return async (ctx,next) => {
            // 筛选出路径相同的路由
            let handlers = this.layers.filter(layer => {
                // 过滤出匹配的路由
                return layer.match(ctx.path)
            })
            let handlersFns = handlers.map(item => item.fn)
            // 把函数合在一起
            this.compose(ctx,next,handlersFns)
        }
    }
    compose(ctx,next,handlersFns) {
        // next方法是koa自己原生的next
        function dispatch(index) {
            if (index >= handlersFns.length) return next()
            let route = handlersFns[index]
            route(ctx, () => dispatch(index+1))
        }
        dispatch(0)
    }
}
module.exports = Router
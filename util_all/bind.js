// 这是工具函数
export function bind (fn ,ctx){
    return function (){
        fn.apply(ctx, arguments)
    }
}

Object.prototype.bind = function (fn){
    let ctx = this
    return function () {
        fn.apply(ctx, arguments)
    }
}

// 测试 Object.prototype.bind
var c  = {
    name:'huagtao'
}
function a (){
    name = 'hello'
    console.log('aa', this.name)
}
// a.bind(c)()
let b = a.bind(c)
b()

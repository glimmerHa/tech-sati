/**
 * 函数参数数组[]
 * arguments
 * Arguments 类的对象，在函数内部会自动声明并初始化；在全局中是 undefined
 * 
 * 详细的说
 * Arguments 对象 不是数组，但它拥有 数值属性和lenth属性，数值属性可当做是 数组元素。
 * 调用函数时，会自动创建一个 局部变量，并初始化， 是Arguments对象-> arguments
 * arguments 主要用途是： 有多少参数 传入函数。
 * arguments 不是 Array的实例。  (判断题)
 * Arguments.length 是只读的，无其他行为。不可改变大小。
 * arguments 的属性有： callee 数值属性值和 length
*/

function test(a,b){
    // arguments 是函数内部变量
    console.log(a)
    console.log(b)
    console.log(arguments)
}
test(1,2)

/**
 * arguments.callee： 代表当前正在执行的函数。 
 * 指代当前正在执行的函数，可以通过它引用匿名函数自身。该属性 只定义在函数体中
*/

var factorial = function (x){
    if(x < 2) return 1
    else return arguments.callee(x-1) * x
}
console.log(factorial(5))

/**
 * arguments.length： 代表传入给当前函数的 参数个数。
 * 该属性 只定义在函数体中
*/

function check (args) {
    var actual = args.length 
    var expected = args.callee.length
    if(actual != expected){
        console.log('参数个数有误')
    }
}

function f(x,y,z,a){
    console.log(arguments.length) // 3
    console.log(arguments.callee.length) // 2
    // check(arguments)
    return x+y+z
}
f(1,2,3)




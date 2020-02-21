/**
 * arguments[] 
 * 
 * caller
 * 
 * length
 * 
 * prototype
 * 
 * apply() // function.apply(thisobj, args)
 * 
 * bind()
 * 
 * call()
 * 
 * toString()
 */

Object.prototype.toString.apply(o)
var data = [1,2,3,4,5,6,7,8]
Math.max.apply(null,data)

// bind 得到一个函数
var g = f.bind(o, 1,2,3)

g(3) === f.call(o, 1,2,3)



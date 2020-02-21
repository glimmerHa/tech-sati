/**
 * Array： 对数组的内置支持
 * 构造函数：
 * new Array() // 返回空数组，length=0
 * new Array(size)// size 是数组元素个数。 length = size 
 * new Array(ele1, ele2,ele3 ..., elen) // length = n
*/

// Array.map 不改变原数组
var maparr = [1,2,3,5]
maparr.map(function(item){
    return item*item
})

// array.reverse 改变原数组
var reversearr = [1,2,3,4,5,6,7,[1,2,3,4,5]]
reversearr.reverse()

// 位置 数组尾。
var weiarr = [1,2,3,4,5,6,7,8]

weiarr.push(1,2,3,4)
weiarr.pop()
// weiarr = : [1,2,3,4,5,6,7,8,1,2,3]

// 位置 数组头
var touarr = [1,2,3,4,5,6,7,8]
touarr.unshift(5,3,2,1,2,3,54)
touarr.shift()
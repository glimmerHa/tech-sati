/**
 * new Error()
 * new Error(message)
 */

/**
 * toString()
 */

/** 
 * name
*/

/**
 * 子类
 * SyntaxError
 * RangeError
 * EvalError
 */

function factorial(x){
    if(x < 0) throw new Error('factorial: x must be >= 0')
    if(x <= 1) return 1;
    else return x*factorial(x-1)
}
// 捕获异常
try{

}catch(e){
    if(e instanceof Error){
        console.log('e.name:'+e.name+ e.message )
    }
}
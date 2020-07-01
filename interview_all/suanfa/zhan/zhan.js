/**
 * 栈 类
 */

 function Stack(){
     // 栈中的属性
    this.items = []
    // 栈的操作
 }
 Stack.prototype.push = function(element){
     this.items.push(element)
 }
 Stack.prototype.pop = function(){
     return this.items.pop()
 }
 Stack.prototype.peek = function(){
     return this.items[this.items.length-1]
 }
 Stack.prototype.isEmpty = function(){
     return this.items.length === 0
 }
 Stack.prototype.size = function(){
     return this.items.length
 }
 Stack.prototype.toString = function(){
    //  return this.items.toString()
     // 循环输出 20 10 8 19 
     let resultStr = ''
     for(var i = 0 ;  i < this.items.length; i ++){
         resultStr = this.items[i] + ''
     }
     return resultStr
 }
 // 栈的使用
 var s = new Stack()

 function dec2bin(decNum){
     var stack = new Stack()
     while(decNum>0){

        stack.push(decNum % 2)
        decNum = Math.floor(decNum / 2)
     }
    //  return stack
     var binaryString = ''
     while(!stack.isEmpty()){
         binaryString += stack.pop()
     }
     return binaryString
 }

 console.log(dec2bin(100))
/**
 * 队列
 */
function Queue(){
    this.items = []
}
Queue.prototype.enqueue = function(element){
    this.items.push(element)
}
Queue.prototype.dequeue = function(){
    return this.items.shift()
}
Queue.prototype.front = function(){
    return this.items[0]
}
Queue.prototype.isEmpty = function(){
    return this.items.length === 0
}
Queue.prototype.size = function(){
    return this.items.length
}
Queue.prototype.toString = function (){
    let resultStr = ''
     for(var i = 0 ;  i < this.items.length; i ++){
         resultStr = this.items[i] + ''
     }
     return resultStr
}

var q = new Queue()
q.enqueue(2)
q.enqueue(9)
q.enqueue(22)
q.dequeue()
console.log(q)

function passGame(nameList, num){
    var que = new Queue()
    for(let i = 0; i < nameList.length; i ++){
        que.enqueue(nameList[i])
    }
    console.log(que)
    while(que.size() > 1){
        for(var  i  = 0 ; i < num -1; i++){
            que.enqueue(que.dequeue())
        }
        que.dequeue()
    }
    return que.front()
}
console.log(
passGame([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30], 3)
)

var arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
var num = 3
function demo(arr,num){
    while(arr.length > 1){
        for(var i = 0 ; i < num - 1 ; i++){
            arr.push(arr.shift())
        }
        arr.shift()
    }
    console.log(arr.length, arr, arr[0])
}
demo(arr,num)
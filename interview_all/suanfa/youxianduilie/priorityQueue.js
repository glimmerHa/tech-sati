function PriorityQueue(){
    function QueueElement(element,priority){
        this.element = element;
        this.priority = priority;
    }
    this.items = []
}
PriorityQueue.prototype.enqueue = function(element, priority){
    var queEl = new QueueElement(element, priority)
    // 判断队列是否为空
    if(this.items.length === 0) {
        this.items.push(queEl)
    } else {
        var added = false
        for (let index = 0; index < this.items.length; index++) {
            if(queEl.priority < this.items[index].priority){
                this.items.splice(i, 0, queEl)
                added = true
                break;
            }
        }
        if(!added){
            this.items.push(queEl)
        }
    }
}
PriorityQueue.prototype.dequeue = function(){
    return this.items.shift()
}
PriorityQueue.prototype.front = function(){
    return this.items[0]
}
PriorityQueue.prototype.isEmpty = function(){
    return this.items.length === 0
}
PriorityQueue.prototype.size = function(){
    return this.items.length
}
PriorityQueue.prototype.toString = function (){
    let resultStr = ''
    for(var i = 0 ;  i < this.items.length; i ++){
        resultStr = this.items[i].element + '-'+this.items[i].priority+' '
    }
    return resultStr
}
var arr = new PriorityQueue()

arr.enqueue(abc, 10)
arr.enqueue(abc, 11)
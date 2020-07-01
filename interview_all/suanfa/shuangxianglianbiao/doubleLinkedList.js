function Node(data) {
    this.prev = null;
    this.next = null
    this.data = data
}
function DoublyLinkedList() {
    this.head = null
    this.tail = null
    this.length = 0
}
DoublyLinkedList.prototype.append = function (data) {
    var newnode = new Node(data)
    if (this.length === 0) {
        this.head = newnode
    } else {
        // 寻找最后一个节点
        newnode.prev = this.tail
        this.tail.next = newnode
    }
    this.tail = newnode
    this.length += 1
}
DoublyLinkedList.prototype.insert = function(data,position){
    if(position < 0 || position > this.length) return false
    var newnode = new Node(data)
    if(this.length ===0 ){
        this.head = newnode
        this.tail = newnode
    }else{
        if(position === 0){
            newnode.next = this.head
            this.head.prev = newnode
            this.head = newnode
        }
        else if(position === this.length){
            newnode.prev = this.tail
            this.tail.next = newnode
            this.tail = newnode
        } else {
            var current = this.head;
            var previous = null
            var index = 0
            while(index++ < position){
                previous = current
                current = current.next
            }
            newnode.next = current
            newnode.prev = previous
            current.prev = newnode
            previous.next = newnode
            // 使用一个 current的方案
            /*
            nextnode.next = current
            newnode.prev = current.prev
            current.prev.next = newnode
            current.prev = newnode
             */
        }
    }
    this.length +=1

}
// position 如果 < length/2 从头开始   > length/2 从尾巴开始
DoublyLinkedList.prototype.get = function(position){
    if(position  < 0 || position >= this.length) return false
    if(position*2 <= this.length){
        var index = 0;
        var current = this.head
        while(index++ < position){
            current = current.next
        }
    }else{
        var index = this.length -1
        var current = this.tail
        while(index-- > position){
            current = current.prev
        }
    }
    return current.data
}
DoublyLinkedList.prototype.indexOf = function(data){
    // 从前往后 || 从后向前 都可
    // 这里是 从前往后
    let index = 0
    let current = this.head
    while(current){
        if(current.data === data){
            return index
        }else{
            index+=1
            current = current.next
        }
    }
    return -1
}
DoublyLinkedList.prototype.update = function(data,position){
    // 可以预测下 position 位置
    if(position < 0 || position >= this.length) return false
    if(position *2 <= this.length){
        var index = 0
        var current = this.head
        while(index ++ < position){
            current = current.next
        }
    }else{
        var index = this.length - 1
        var current = this.tail
        while(index-- > position){
            current = current.prev
        }
    }
    current.data = data
    return true
}
DoublyLinkedList.prototype.removeAt = function(postion){
    if(position < 0 || position >= this.length || this.length === 0) return false
    var current = head
    if(this.length === 1){
        this.head = null;
        this.tail = null;
    }else{
        if(position === 0 ){
            this.head.next.prev = null
            this.head = this.head.next
            /* 
            // 这种方案不对吗？
            this.head = this.head.next
            this.head.prev = null
            好像都可以
            */
        }else if(position === this.length -1){
            current = this.tail
            this.tail.prev.next = null
            this.tail = this.tail.prev
            /* 
            // 这种方案不对吗？
            this.tail = this.tail.prev
            this.tail.next = null
            好像都可以
            */
        }else{
            var index = 0;
            while(index++ < postion){
                current = current.next
            }
            current.next.prev = current.prev
            current.prev.next = current.next
            // 没有引用指向它 可以不管他内部的next 和prev 的处理
            /*current.next = null
            current.prev = null*/
        }
    }
    this.length -= 1
    return current.data
}
DoublyLinkedList.prototype.remove = function(data){
    return this.removeAt(this.indexOf(data))
}
DoublyLinkedList.prototype.isEmpty = function(){
    return this.length === 0
}
DoublyLinkedList.prototype.size = function(){
    return this.length
}
DoublyLinkedList.prototype.getHead = function(){
    return this.head.data
}
DoublyLinkedList.prototype.getTail = function(){
    return this.tail.data
}
DoublyLinkedList.prototype.toString = function(){
    return this.backwardString()
}

DoublyLinkedList.prototype.forwardString = function(){
    var current = this.tail
    var resultStr = ''
    while(current){
        resultStr += current.data + ' '
        current = current.prev
    }
    return resultStr
}
// 向后遍历，从 index  0  到 index this.length
DoublyLinkedList.prototype.backwardString = function(){
    var current = this.head
    var resultStr = ''
    while(current){
        resultStr += current.data + ' '
        current  = current.next
    }
    return resultStr
}

 var ll = new DoublyLinkedList()
 ll.append('123')
 ll.append('234')
console.log(ll.toString())


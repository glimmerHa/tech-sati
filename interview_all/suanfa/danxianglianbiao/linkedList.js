function LinkedList(){
    function Node(data){
        this.data = data;
        this.next = null;
    }
    this.head = null;
    this.length = 0;
    LinkedList.prototype.append = function(data){
        var node = new Node(data)
        if(this.head === null){
            this.head = node
        } else{
            var current = this.head
            while(current.next){
                current = current.next;
            }
            current.next = node;
        }
        this.length += 1
    }
    LinkedList.prototype.insert = function(data,position){
        if(position < 0 || position > this.length) return false
        var node  = new Node(data)
        if(position === 0){
            node.next = this.head
            this.head = node
        }else{
            var index = 0
            var previous = null
            var current = this.head
            while(index ++ < position){
                previous = current
                current = current.next
            }
            node.next = current
            previous.next = node
        }
    }
    
}


LinkedList.prototype.get = function(position){
    if(position <0 || position >= this.length) return false
    var index = 0;
    var current = this.head
    while(index ++ < position){
        current = current.next;
    }
    return current.data
}
LinkedList.prototype.indexOf = function(data){
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
LinkedList.prototype.update = function( data, position){
    if(position < 0 || position >= this.length) return false
    var index = 0
    var current = this.head
    while(index ++ < position){
        current = current.next
    }
    current.data = data
    return true
}
LinkedList.prototype.removeAt = function(position){
    if(position < 0 || position >= this.length) return false
    if(position === 0 ){
        this.head = this.head.next
    }else{
        var index = 0 ;
        var current = this.head
        var previous = null;
        while(index ++ < position){
            previous = current
            current = current.next;
        }
        previous.next = current.next
    }
    this.length -=1
    return true
}
LinkedList.prototype.remove = function(data){
    this.removeAt(this.indexOf(data))
}
LinkedList.prototype.isEmpty = function(){
    return this.length === 0
}
LinkedList.prototype.size = function(data){
    return this.length
}
LinkedList.prototype.toString = function(){
    var current = this.head;
    var listString = ''
    while(current){
        listString += current.data + ' '
        current = current.next
    }
    return listString
}
var ll = new LinkedList()
ll.append('abc')
ll.append('cde')
ll.append('efg')
ll.append('ghi')

console.log(ll.toString())
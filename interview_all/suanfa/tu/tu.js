// 边： edge 顶点 vertex
function Graph(){
    this.vertices = [] // 顶点集合
    this.edges = new Map() // 边集合
}
Graph.prototype.addVertex = function(v){
    this.vertices.push(v)
    this.edges.set(v, [])
}

Graph.prototype.addEdge = function(v,w){
    let vEdge = this.edges.get(v)
    vEdge.push(w)
    let wEdge = this.edges.get(w)
    wEdge.push(v)
    this.edges.set(v,vEdge)
    this.edges.set(w,wEdge)
}
/**
 * 深度遍历
 */
Graph.prototype.dfs = function(){
    let deeparr = []
    let marked = []
    let that = this
    
    for(let i = 0 ; i < this.vertices.length ; i ++){
        if(!marked[this.vertices[i]]){
            dfsVisit(this.vertices[i])
        }
    }
    function dfsVisit(u){
        let edges = that.edges
        marked[u] = true
        deeparr.push(u)
        console.log(u, that.edges)
        let neighors = edges.get(u)
        for(var  i = 0 ; i < neighors.length; i ++){
            var w = neighors[i]
            if(!marked[w]){
                dfsVisit(w)
            }
        }
    }
    return deeparr
    
}
Graph.prototype.bfs = function(v){
    var queue = [];
    var marked = []
    marked[v] = true
    queue.push(v)
    while(queue.length>0){
        var s = queue.shift()
        console.log(s)
        let neighbors = this.edges.get(s)
        for(let i =0; i < neighbors.length; i++){
            let w = neighbors[i]
            if(!marked[w]){
                marked[w] = true
                queue.push(w)
            }
        }
    }
    return queue
}
Graph.prototype.toString = function(){
    var s = ''
    for(let i = 0 ; i < this.vertices.length; i ++) {
        s += this.vertices[i] + '->\t'
        let neighors = this.edges.get(this.vertices[i])
        for(let j = 0; j < neighors.length; j ++){
            s += neighors[j]+ '\t'
        }
        s+= '\n'
    }
    return s
}

var graph = new Graph()
var vertices = [1, 2, 3, 4, 5]
for (var i=0; i<vertices.length; i++) {
    graph.addVertex(vertices[i])
}
graph.addEdge(1, 3);
graph.addEdge(1, 4); //增加边
graph.addEdge(2, 3);
graph.addEdge(2, 5);

console.log(graph.toString())
console.log(graph.dfs())
console.log(graph.bfs(1))
let widthTraversal2 = function(node){
    let stack = []
    let nodes = []
    if(node){
        stack.push(node)
        while(stack.length){
            let item  = stack.shift()
            let children = item.children
            nodes.push(item)
            for(let i = 0; i < children.length; i++){
                stack.push(children[i])
            }
        }
    }
    return nodes
}
console.log(widthTraversal2(document.querySelector('.parent')))
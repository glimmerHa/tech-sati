let deepTraversal1 = function(node, nodeList){
    if (node !== null){
        nodeList.push(node)
        let children = node.children
        for(let i = 0 ; i < children.length; i++){
            deepTraversal1(children[i], nodeList)
        }
    }
    return nodeList
}

let deepTraversal2 = function(node){
    let nodes = []
    if(node !== null) {
        nodes.push(node)
        let children = node.children
        for(let i = 0 ; i< children.length; i++){
            nodes = nodes.concat(deepTraversal2(children[i]))
        }
    }
    return nodes
}

let deepTraversal3 = function (node){
    let stack = []
    let nodes = []
    if(node) {
        stack.push(node)
        while(stack.length){
            let item = stack.pop()
            let children = item.children
            nodes.push(item)
            for(let i  =children.length-1; i >= 0; i--){
                stack.push(children[i])
            }
        }
    }
    return nodes
}
console.log(deepTraversal3(document.querySelector('.parent')))
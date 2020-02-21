/**
 * JSON
 * JSON.parse() // 研究下
 * JSON.stringify()
 */

function deepcopy(o){
    return JSON.parse(JSON.stringify(o))
}

var data = JSON.parse(text, function(name, value){
    if(name[0] == '_') return undefined
    if(typeof value ==='string' && /^\d\d\d\d-\d\d-\d\d-\d\dT\d\d:\d\d:\d\d.\d\d\dZ$/.test(value))
    return new Date(value);
    return value
});

var text = JSON.stringify(data)
var text = JSON.stringify(address, ["city", "state", "country"])
var text = JSON.stringify(patterns, function(key,value){
    if(value.constructor === RegExp) return value.toString()
    return false
})
RegExp.prototype.toJSON = function (){
    return this.toString()
}

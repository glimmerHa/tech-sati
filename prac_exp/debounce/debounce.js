var count = 1;
var container = document.getElementById('container');

function debounce1 (func, wait){
    var timer = null
    return function(){
        clearTimeout(timer)
        timer = setTimeout(func, wait)
    }
}
function debounce2(func, wait){
    console.log('lalala')
    var timer;
    return function(){
        console.log('嘿')
        var that = this
        clearTimeout(timer)
        timer = setTimeout(function(){
            func.apply(that)
        },wait)
    }
}
/**
 * 较为完整的防抖
 * @param {}} func 
 * @param {*} wait 
 */
function debounce3(func, wait){
    var timer;
    return function(){
        var that = this
        var args = arguments;
        clearTimeout(timer)
        timer = setTimeout(function(){
            func.apply(that,args)
        },wait)
    }
}
function debounce4(func,wait,immediate){
    var timer = null;
    return function(){
        var that = this
        var arg = arguments
        if(timer) clearTimeout(timer)
        if(immediate) {
            var callNow = !timeout;
            timer = setTimeout(function(){
                timeout = null;
            }, wait)
            if(callNow){
                func.apply(that, arg)
            }
        }else{
            timer = setTimeout(function(){
                func.apply(that, arg)
            }, wait);
        }

    }
}
// 有返回值
function debounce5(func,wait,immediate){
    var timer = null;
    var result;
    return function(){
        var that = this
        var arg = arguments
        if(timer) clearTimeout(timer)
        if(immediate) {
            var callNow = !timeout;
            timer = setTimeout(function(){
                timeout = null;
            }, wait)
            if(callNow){
                result = func.apply(that, arg)
            }
        }else{
            timer = setTimeout(function(){
                func.apply(that, arg)
            }, wait);
        }
        console.log('result',result)
        return result
    }
}

function debounce6(func,wait,immediate){
    var timer = null;
    var result;
    var debounced = function(){
        var that = this
        var arg = arguments
        if(timer) clearTimeout(timer)
        if(immediate) {
            var callNow = !timeout;
            timer = setTimeout(function(){
                timeout = null;
            }, wait)
            if(callNow){
                result = func.apply(that, arg)
            }
        }else{
            timer = setTimeout(function(){
                func.apply(that, arg)
            }, wait);
        }
        console.log('result',result)
        return result
    }
    debounced.cancel = function(){
        clearTimeout(timer)
        timer = null
    }
    return debounced;
}

let timeout
function debounce(func, wait) {
    return function () {
        clearTimeout(timeout)
        timeout = setTimeout(func, wait)
    }
}

function getUserAction(e) {
    console.log(e);
    container.innerHTML = count++;
    return count
    // if(demo&& demo.cancel){
    //     demo.cancel()
    // }
    // var demo = debounce6(()=>{
    //     console.log('6')
    //     container.innerHTML = count++;
    // },1000)()
    // debounce2(()=>{
    //     console.log('2')
    //     container.innerHTML = count++;
    // },1000)()
    // debounce1(()=>{
    //     console.log('1')
    //     container.innerHTML = count++;
    // },1000)()
    // debounce(()=>{
    //     console.log('1')
    //     container.innerHTML = count++;
    // },1000)()
};
// container.onmousemove = getUserAction;
// container.onmousemove = debounce1(getUserAction,1000);
// container.onmousemove = debounce2(getUserAction,1000);
// container.onmousemove = debounce3(getUserAction,1000);
// container.onmousedown = debounce4(getUserAction,1000,true);
// container.onmousemove = debounce4(getUserAction,1000);

// container.onmousedown = debounce5(getUserAction,1000,true);
// container.onmousemove = debounce5(getUserAction,1000);


var setUseAction = debounce6(getUserAction, 2000);

container.onmousemove = setUseAction;

document.getElementById("button").addEventListener('click', function(){
    setUseAction.cancel();
})

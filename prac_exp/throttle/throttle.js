var count = 1;
var container = document.getElementById('container');

function getUserAction(e) {
    console.log(e);
    container.innerHTML = count++;
    // return count
};

function throttle1(func, wait) {
    var context, args;
    var previous = 0;

    return function() {
        var now = +new Date();
        context = this;
        args = arguments;
        if (now - previous > wait) {
            func.apply(context, args);
            previous = now;
        }
    }
}

function throttle2(func, wait) {
    var timeout;
    var previous = 0;

    return function() {
        context = this;
        args = arguments;
        if (!timeout) {
            timeout = setTimeout(function(){
                timeout = null;
                func.apply(context, args)
            }, wait)
        }

    }
}
// container.onmousemove = getUserAction;
container.onmousemove = throttle1(getUserAction, 1000);
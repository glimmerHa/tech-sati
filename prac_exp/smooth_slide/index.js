(function(){
    var slideDom = document.querySelector('#slide-outer')
    slideDom.addEventListener('touchstart', touchstartHandler, false)
    slideDom.addEventListener('touchmove', touchmoveHandler, false)
    slideDom.addEventListener('touchend', touchendHandler, false)

    function touchstartHandler(){
        console.log('touchstartHandler')
    }
    function touchmoveHandler (){
        console.log('touchmoveHandler')
    }
    function touchendHandler () {
        console.log('touchendHandler')
    }
})()
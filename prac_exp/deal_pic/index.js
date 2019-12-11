function conimg(norW,norH,w,h,ele){
    if(w >= h){
        if(w / h > norH / norW ){
            $(ele).css({'width': norH +'px','height':norW +'px' });
        }else{
            $(ele).eq(0).css({'height':norW+'px','width': w* norW / h +'px' });
        }
    }else{
        if(w / h < norW / norH){
            $(ele).css({'width':norW+'px','height': w * norW / h +'px' });
        }else{
            $(ele).css({'width': norW +'px','height':norH +'px' });
            // $('.contentDataBox .conImage').css({'width': norW +'px','height':norH +'px' });
        }
    }
}
/**
 * [computedImage description]
 * @param  {[type]} ruleObj   [标准对象]
 * @param  {[type]} imageData [图片数据]
 * @return {[type]}           [style string]
 */
function computedImage (ruleObj, imageData) {
    // 第一步 判断 是 横图 w > h  还是 竖图 w < h
    // 横图 高宽比 <1
    if(imageData.width >=imageData.height){
        // 高宽比 > 标准的  短长比 0.75 就说明 图片宽度 还没到 相应比例，接近 正方形
        if(imageData.height/imageData.width >= ruleObj.shortSide/ruleObj.longSide){
            var divWidth = parseInt(imageData.width * ruleObj.shortSide / imageData.height)
            return 'style="width:'+divWidth+'px;font-size:0;"'
        }
        // 高宽比 <  标准的  短长比 0.75 就说明 图片宽度 还没到 相应比例，接近 长方形
        else{
            let changeWidth = parseInt(imageData.width * ruleObj.shortSide / imageData.height)
            if(changeWidth <= ruleObj.longSide ){
                var divWidth = ruleObj.changeWidth //imageData.width
                return 'style="width:'+divWidth+'px;font-size:0;"'
            }
            else{
                var divWidth = ruleObj.longSide //imageData.width
                var divHeight = ruleObj.shortSide
                return 'style="width:'+divWidth+'px;height:'+divHeight+'px;font-size:0;"'
            }
        }
    }else{
        // 竖图
        //  宽高比 >= 0.75 图片偏 正方形
        if(imageData.width/imageData.height >= ruleObj.shortSide/ruleObj.longSide){
            var divWidth = ruleObj.shortSide //imageData.width
            return 'style="width:'+divWidth+'px;font-size:0;"'
        }
        // 宽高比 < 0.75 图片偏 长方形
        else{
            // 图片宽 小于 标准 ==放大
            
            let changeHeight = imageData.height * ruleObj.shortSide / imageData.width
            console.log('changeHeight，放大', changeHeight)
            // 放大宽后，比较放大高与 标准，标准内
            if(changeHeight <= ruleObj.longSide){
                var divWidth = ruleObj.shortSide //imageData.width
                return 'style="width:'+divWidth+'px;font-size:0;"'
            }
            // 标准外
            else{
                var divWidth = ruleObj.shortSide //imageData.width
                var divHeight = ruleObj.longSide
                return 'style="width:'+divWidth+'px;height:'+divHeight+'px;font-size:0;"'
            }
        }
    }
}
var $topicItem = $('<div class="topic-item"></div>')
var image = {
    // "url":"http://indivi-cdn.shouji.sogou.com/wapdl/static/daodao/201910/24/31a.jpg",
    // "height":426,
    // "width":440
    // "url":"http://indivi-cdn.shouji.sogou.com/wapdl/static/daodao/201910/24/73a.png",
    // "height":411,
    // "width":427
    // "url":"http://indivi-cdn.shouji.sogou.com/wapdl/static/daodao/201910/24/89a.jpg",
    // "height":211,
    // "width":202
    // "url":"http://indivi-cdn.shouji.sogou.com/wapdl/static/daodao/201910/24/82a.png",
    // "height":736,
    // "width":423
    // "url":"http://indivi-cdn.shouji.sogou.com/wapdl/hole/201910/30/2019103010234079546246.jpg",
    // "height":631,
    // "width":569
    // url:'https://raw.githubusercontent.com/glimmerHa/echarts-demo/master/src/assets/logo.png',
    // width: 200,
    // height: 200
    
    // 横图
    url:'https://raw.githubusercontent.com/glimmerHa/echarts-demo/master/src/assets/hengtu01.png',
    width: 1000,
    height: 360
    // url:'https://raw.githubusercontent.com/glimmerHa/echarts-demo/master/src/assets/hengtu02.png',
    // width: 398,
    // height: 358
    // url:'https://raw.githubusercontent.com/glimmerHa/echarts-demo/master/src/assets/hengtu03.png',
    // width: 1040,
    // height: 780
    // url:'https://raw.githubusercontent.com/glimmerHa/echarts-demo/master/src/assets/hengtu05.png',
    // width: 1100,
    // height: 800
    // url:'https://raw.githubusercontent.com/glimmerHa/echarts-demo/master/src/assets/hengtu06.png',
    // width: 880,
    // height: 800
    
    // 竖图
    // url:'https://raw.githubusercontent.com/glimmerHa/echarts-demo/master/src/assets/shutu01.png',
    // width: 362,
    // height: 992
    // url:'https://raw.githubusercontent.com/glimmerHa/echarts-demo/master/src/assets/shutu02.png',
    // width: 358,
    // height: 398
    // url:'https://raw.githubusercontent.com/glimmerHa/echarts-demo/master/src/assets/shutu03.png',
    // width: 780,
    // height: 1040
    // url:'https://raw.githubusercontent.com/glimmerHa/echarts-demo/master/src/assets/shutu05.png',
    // width: 800,
    // height: 1100
    // url:'https://raw.githubusercontent.com/glimmerHa/echarts-demo/master/src/assets/shutu06.png',
    // width: 800,
    // height: 880
    // "url":"http://indivi-cdn.shouji.sogou.com/wapdl/hole/201912/09/2019120914575432634408.jpg",
    // "height":552,
    // "width":368
}
var $detailTie = ''
var $topicItem1 = $topicItem.clone(true)
$detailTie = $('<div class="contentDataBox"><div class="conText">开心第三方哈市电话费开始搭建发大厦咖啡机试等会</div><div class="conImage"><img src="'+ image.url +'"/></div></div>')
//
var cropRuleOfTie = {
    longSide:520,
    shortSide:390,
    longHeight:2000
}
var cropRuleOfAns = {
    longSide:340,
    shortSide:256,
    longHeight:2000
}
// $detailTie = $('<div class="contentDataBox"><div class="conText">开心第三方哈市电话费开始搭建发大厦咖啡机试等会</div>'+computedImage(cropRuleOfTie, image)+'</div>')
$detailTie = $('<div class="contentDataBox"><div class="conText">开心第三方哈市电话费开始搭建发大厦咖啡机试等会</div>'+'<div class="conImage" '+computedImage(cropRuleOfTie, image)+'><img src="'+ image.url +'"/></div>'+'</div>')
$topicItem1.append($detailTie).appendTo($('.tu_wrapper'))
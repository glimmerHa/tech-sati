var rgbToHex = function(rgb) {
    // rgb(x, y, z)
    var color = rgb.toString().match(/\d+/g); // 把 x,y,z 推送到 color 数组里
    var hex = "#";

    for (var i = 0; i < 3; i++) {
        // 'Number.toString(16)' 是JS默认能实现转换成16进制数的方法.
        // 'color[i]' 是数组，要转换成字符串.
        // 如果结果是一位数，就在前面补零。例如： A变成0A
        hex += ("0" + Number(color[i]).toString(16)).slice(-2);
    }
    return hex;
};

var hexToRgb = function(hex) {
    var color = [], rgb = [];

    hex = hex.replace(/#/,"");

    if (hex.length == 3) { // 处理 "#abc" 成 "#aabbcc"
        var tmp = [];
        for (var i = 0; i < 3; i++) {
            tmp.push(hex.charAt(i) + hex.charAt(i));
        }
        hex = tmp.join("");
    }

    for (var i = 0; i < 3; i++) {
        color[i] = "0x" + hex.substr(i * 2, 2);
        rgb.push(parseInt(Number(color[i])));
    }
    return "rgb(" + rgb.join(",") + ")";
};

var hexToRgb = function(hex) {
    var rgb = [];

    hex = hex.substr(1);//去除前缀 # 号

    if (hex.length === 3) { // 处理 "#abc" 成 "#aabbcc"
        hex = hex.replace(/(.)/g, '$1$1');
    }

    hex.replace(/../g, function(color){
        rgb.push(parseInt(color, 0x10));//按16进制将字符串转换为数字
    });

    return "rgb(" + rgb.join(",") + ")";
};
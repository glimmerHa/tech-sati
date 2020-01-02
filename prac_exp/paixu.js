var arr = ["2019-12-20", "2019-12-21", "2019-12-22", "2019-12-23", "2019-12-24", "2019-12-25", "2019-12-26", "2019-12-27","2019-12-28","2019-12-29"]
var arr1 = [
    {
        "id":37943,
        "time":"2019-12-20",
        "value":"459368525",
    },
    {
        "id":38483,
        "time":"2019-12-23",
        "value":"468715652",
        
    },
    {
        "id":39033,
        "time":"2019-12-26",
        "value":"456832467",
        
    },
    {
        "id":38303,
        "time":"2019-12-22",
        "value":"468638295",
    },
    {
        "id":38851,
        "time":"2019-12-25",
        "value":"458011102",
    },
    {
        "id":38123,
        "time":"2019-12-21",
        "value":"465097565",
    },
    {
        "id":38665,
        "time":"2019-12-24",
        "value":"459099742",
    },
    {
        "id":39215,
        "time":"2019-12-27",
        "value":"456173825",
    }
]

console.log(arr)
console.log(arr1)
function paixu(arr, arr1){
    var data = []
    for(var i = 0 ; i < arr.length; i ++){
        console.log('i====', i)
        let timeItem = arr[i]

        for(var j = arr1.length-1; j>= 0; j --){
            console.log('j====', j)
            // 比较 timeItem arr1[j].time
            let item = arr1[j]
            
            if(timeItem === item.time){
                data.push(item)
                break;
            }
            if(j == 0 ){
                data.push({
                    value:0,
                    time: timeItem
                })
            }
        }
    }
    console.log('data', data)
}
paixu(arr, arr1)

/**
 * new Date()
 * new Date(milliseconds)
 * new Date(datestring)
 * new Date(year, month, day, hours, minutes, seconds, ms)
 */

 /**
  * 获取时间的 各方法
  * 
  * get[UTC]FullYear()
  * 
  * get[UTC]Month()
  * 
  * get[UTC]Date()
  * 
  * get[UTC]Hours()
  * 
  * get[UTC]Minutes()
  * 
  * get[UTC]Seconds()
  * 
  * get[UTC]Milliseconds()
  * 
  * get[UTC]Day()
  * 
  * getTime()
  * 
  * getTimezoneOffset()
  */

  /**
   *  设置时间的 各方法
   * 
   * set[UTC]FullYear() // 参数year,可选 month, date
   * 
   * set[UTC]Month() // 参数 month, 可选 date
   * 
   * set[UTC]Date() // 参数 date, 日期 1-31
   * 
   * set[UTC]Hours() // 参数hours,可选 minutes, seconds, millis
   * 
   * set[UTC]Minutes() // 参数 minutes,可选 seconds, millis
   * 
   * set[UTC]Seconds() // 参数 seconds,可选 millis
   * 
   * set[UTC]Milliseconds() // 参数 millis
   * 
   * setTime() // 参数 millis 年开始到毫秒的 一个 毫秒值设置
   */

   /**
    * to 把Date 做各种转换
    * 
    * toDateString()
    * 
    * toGMTString()
    * 
    * toISOString()
    * 
    * toJSON()
    * 
    * toLocaleDateString()
    * 
    * toLocaleString()
    * 
    * toLocaleTimeString()
    * 
    * toString()
    * 
    * toTimeString()
    * 
    * toDateString()
    * 
    * toUTCString()
    * 
    * valueOf() // === getTime() 返回值
    */

    /**
     * Date.now()
     * 
     * Date.parse()
     * 
     * Date.UTC() // 参数(year month day hours minutes seconds ms)
     */

var d = new Date()
document.write('today is:' + d.toLocaleDateString()+'.')
document.write('the time is:' + d.toLocaleTimeString()+'.')
var dayOfWeek = d.getDay()
var weekend = (dayOfWeek == 0) || (dayOfWeek === 6) // 是周末吗？

// 判断两个时间差
var today = new Date()
var christmas = new Date()
christmas.setMonth(11)
christmas.setDate(25)
if(today.getTime()  < christmas.getTime()){
    var difference = christmas.getTime() - today.getTime()
    difference = Math.floor(difference / (1000 * 60*60*24 ))
    document.write('距离圣诞节还有：' + difference + '天了')
}

// Date.now 实现
Date.now = function (){
    return new Date().getTime()
}


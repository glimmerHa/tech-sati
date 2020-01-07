
### 题目

###### js的数据类型有哪些
>
> 基本类型
1. number
2. string
3. boolean
4. undefined
5. null
6. symbol (es6新增)

>
> 引用类型
1. object

###### js中typeof 的类型有哪些？

###### js 常用检查类型的方式有哪些？

###### js中 常用 类型转换 方式 有哪些？

###### 双等于号"==" 与 三等于号 "===" 的使用场景，以及异同？

###### 如何 准确判断 一个变量是 数组类型？

##### 各类型相互转换
1. 字符串 转 数字的方式
>
> String

##### 数组
1. 求数组最大值的方法
    ```JavaScript
    // 挂载的原型链上，遍历
    Array.prototype.max = function (){
        let max = this[0];

        this.forEach((item, index)=> {
            max = max > item ? max :item
        })

        return max
    }

    // sort() 排序
    function arrMaxFromSort(arr){
        return arr.sort((a,b)=>{
            return b-a
        })[0]
    }

    // 使用内置库 Math.max,用 apply 方法调用，call是 多个参数
    function arrMaxFromMath(arr){
        retrun Math.max.apply(null,arr)
    }
    
    // 扩展运算符 es6
    function arrMaxFromEs6(arr){
        return Math.max(...arr)
    }

    ```
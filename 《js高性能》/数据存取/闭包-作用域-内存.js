//闭包
function assignEvents(){
    var id = '123'
    document.querySelector('.btn').onclick=function(event){
        console.log(id)
        fn(id)
    }
}

// assignEvents()函数给一个DOM元素设置事件处理函数。这个事件处理函数就是一个闭包
// 为了能访问所属作用域的id变量，必须创建一个特定的作用域链  [[Scoped]]

// 要理解一件事，以上函数会产生闭包，但是在执行完后作用域链会回归原始状态，也就是说不会造成内存泄露等问题,而下面的例子则会

// 闭包无法内存回收的经典函数
// 变量a没有销毁，仍存在outer函数的作用域链上
function outer () {
    var a = 'property of outer scope'
    
    return function inner () {
        console.log(a)
    }
 }
var inner = outer() 
inner() 

console.log(inner.prototype) 
//可以看到里面的[[Scoped]] 为 ：
//  [
//     Closure (outer) {a: 'property of outer scope'},
//     Global {...}
// ]

// 解决闭包: 
// inner=null
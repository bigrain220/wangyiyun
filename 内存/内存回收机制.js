//内存主要就是存储变量等数据等的
//局部变量当程序执行结束时，且没有引用当时候就会随着消失
//局部变量不是调用完就回收，是会自动回收或者内存溢出导致强制回收
//全局对象会始终存活直到程序运行结束时才会回收

// 内存优化技巧：
// 1.尽量不要定义全局变量；
// 2.全局变量记得销毁（赋值为null或undefined);
// 3.用匿名自执行函数变全局为局部:(function(){}());
// 4.尽量避免使用闭包；

// 引起内存泄漏的操作：
// 1.滥用缓存
// 2.全局变量过多
// 3.闭包
// 4.被遗忘的定时器或者回调
// 5.没有清理DOM元素引用


//js node环境下检测内存到方法：
function getme() {
    var mem = process.memoryUsage();
    var format = function (bytes) {
        return (bytes / 1024 / 1024).toFixed(2) + 'MB';
    }
    // console.log(mem)//内存对象,单位为字节
    console.log('heapTotal: ' + format(mem.heapTotal) + '      heapUsed: ' + format(mem.heapUsed))
}

var size = 20 * 1024 * 1024;

// 全局变量
// var arr1 = new Array(size);
// getme();
// var arr2 = new Array(size);
// getme();
// var arr3 = new Array(size);
// getme();
// var arr4 = new Array(size);
// getme();
// var arr5 = new Array(size);
// getme();
// var arr6 = new Array(size);
// getme();
// var arr7 = new Array(size);
// getme();
// var arr8 = new Array(size);
// getme();
//第九个会内存溢出报错；
// var arr9 = new Array(size);
// getme();

// 局部变量
// var a = [];
// var b = function () {
//     var arr1 = new Array(size);
//     var arr2 = new Array(size);
//     var arr3 = new Array(size);
//     var arr4 = new Array(size);
// };
// b();
// for (var index = 0; index < 8; index++) {
//     a.push(new Array(size));
//     getme();
// }

//闭包只有在引用时才会内存泄漏
// function a() {
//     var _size = 20 * 1024 * 1024;
//     var _arr = new Array(_size);
//     return _arr;
// }

//无论调用多少次都不会内存泄漏
// a(); a(); a(); a(); a(); a(); a(); a(); a();
//下面被引用后就会内存泄漏，函数里面都局部变量在外面不要引用（‘=’）

// var e = a();
// var f = a();
// var g = a();
// var h = a();
// var i = a();
// var j = a();
// var k = a();
// var l = a();
// var m = a();
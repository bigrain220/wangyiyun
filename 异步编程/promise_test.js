// 总结： 
// 1.创建promise的简便方法： Promise.resolve(value); 等同于 new Promise((resolve, reject) => {resolve(value)});
// 2.Promise里面要有resolve()，才能用then进行下一步，如果要传值，则resolve(value)
// 3.then里面要写函数才有效果，而且如果要传值的话则需要 return value

// 注意点：
// 1.then,catch返回的promise是新的promise,不是原来的promise
// 2.Promise对象的错误会冒泡,直到捕获为止,错误会被下一个catch语句捕获。所以只要在最后加一个catch语句就可以了

// promise A+规范状态：(一个promise的状态一旦改变就不能再改变了)
// promise有三种状态：pending,fulfilled,reject。
// pending带上value值可以转为fulfilled状态；
// pending带上reason可以转为reject状态；





// 片段1
const promise = new Promise((resolve, reject) => {
    console.log(1);
    resolve();
    console.log(2);
});

promise.then(() => {
    console.log(3);
});
console.log(4);

//打印结果： 1 2 4 3   1 2 4 是线程任务同步执行，3是微任务里面打印的

// 片段2
const promise0 = Promise.
resolve(1).
then(2).
then(Promise.resolve(3)).
then(console.log);

const promise1 = Promise.resolve(1); // resolve的值为1,做为下一个then的参数
const promise2 = promise1.then(2); //then里面的不是函数，就会忽略，不起作用，依然resolve的值为1
const promise3 = promise2.then(Promise.resolve(3)); //then里面的不是函数，就会忽略，不起作用，依然resolve的值为1
// const promise4 = promise3.then(console.log);  //这边的console.log打印的是then接受到的参数
//和下面的效果一样
const promise4 = promise3.then(res => {
    console.log(res);
    return res
    //如果then里面是函数，要有return值下一个then才能接受到。不然下一个then接受到的是undefined;   
})

//打印结果： 1 1 
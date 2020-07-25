// 代码一

// console.log(1); //任务队列
// setTimeout(() => {
//     console.log(2) //任务队列
// }, 0);
// Promise.resolve().then(() => {
//     console.log(3) //promise 属于微任务 
// });
// console.log(4); //任务队列


// 1 4 3  2 
// 整段script代码是一个宏任务,首先执行任务队列里的宏任务,打印1和4,然后执行微任务打印3,最后执行任务队列里的宏任务打印2


// 代码二
console.log('start');
setTimeout(() => {
    console.log('setTimeout');
    new Promise(resolve => {
        console.log('promise inner1');
        resolve();
    }).then(() => {
        console.log('promise then1')
    })
}, 0)
new Promise(resolve => {
    console.log('promise inner2');
    resolve();
}).then(() => {
    console.log('promise then2');
});
console.log('end');


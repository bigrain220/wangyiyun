// 考查event loop的执行顺序

// 宏任务：宏任务 1.1
// 微任务：微任务 1.1 微任务 1.2 微任务 2.1
// logs:  1 3 7 9,0 2,8,4 5,6

// 1.首先产生宏任务1.1
// 2.执行任务队列async1(),打印1,然后产生微任务1.1;  
// 3.执行async2()里面的同步任务打印3，继续往下执行任务队列
// 4.Promise里面的参数是同步的,then回调才是异步的，所以按顺序执行任务队列打印7,产生微任务1.2,然后打印9
// 5.此时任务队列为空,按顺序执行微任务1.1，打印出0和2
// 6.执行完微任务1.1后执行微任务1.2,打印出8，此时微任务队列为空，执行之前的宏任务
// 7.执行宏任务1.1,打印出4和5，产生微任务2.1
// 8.此时任务队列为空，执行微任务2.1,打印出6

// tips:async函数在await之前的代码都是同步执行的，可以理解为await之前的代码属于new Promise时传入的代码，await之后的所有代码都是在Promise.then中的回调

async function async1() {
    console.log('1');
    // 微任务 1.1
    console.log(await async2());
    console.log('2');
}

async function async2() {
    console.log('3');
    return '0';
}

//宏任务 1.1
setTimeout(() => {
    console.log('4');
    new Promise(resolve => {
        console.log('5');
        resolve();
    }).then(() => {
        //微任务 2.1
        console.log('6');
    })
});

async1();

new Promise(resolve => {
    console.log('7');
    resolve();
}).then(() => {
    //微任务 1.2
    console.log('8');
});

console.log('9');
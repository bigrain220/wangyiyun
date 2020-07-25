//promise的resolve里面如果不是一个thenable对象，则直接把值传出去，如果是thenable对象则要有改变状态的代码(fullfill),否则promise一直处于pending状态不会执行then。

// 代码一   
//考查点：resolve 一个不规范的thenable的情况
Promise.resolve({
    then: function () {
        console.log('a')
    }
}).then(() => {
    console.log('b')
})

//打印出 a

//代码二
//考查点：resolve 一个规范的thenable的情况

Promise.resolve({
    then:function(fullfill){
        fullfill('a');    //把promise的状态改为resolved，传值为'a'
        console.log('b'); 
        throw new Error('c'); //不会执行，因为promise的状态只能改变一次，这个会改变promise的状态，所以不会在执行
        console.log('d');
    }
}).then(
    (d)=>{
        console.log(d);
    },
    (err)=>{
        console.log(err.message)
    }
);

//打印出 b a
// 函数防抖(debounce)： 
// 当持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次，如果设定的时间到来之前，又一次触发了事件，就重新开始延时。

let deBounce = (fn, delay) => {
    let timer = null;
    return function (...args) {
        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => {
            fn(...args);
        }, delay)
    }
}
// 函数节流(throttle): 
// 当持续触发事件时，保证一定时间段内只调用一次事件处理函数

let throttle = (fn, delay) => {
    let flag = true;
    return function (...args) {
        if (!flag) return;
        flag = false;
        setTimeout(() => {
            fn(...args);
            flag = true;
        }, delay)
    }
}

// 结合应用场景

// debounce
// search搜索联想，用户在不断输入值时，用防抖来节约请求资源。
// window触发resize的时候，不断的调整浏览器窗口大小会不断的触发这个事件，用防抖来让其只触发一次

// throttle
// 鼠标不断点击触发，mousedown(单位时间内只触发一次)
// 监听滚动事件，比如是否滑到底部自动加载更多，用throttle来判断
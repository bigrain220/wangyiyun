// 原型链编程
function fn(arr) {
    this.arr = arr;
}
fn.prototype.add = function (params) {
    let res = this.arr.map(item => item + params);
    console.log(res)
    return res;
}
fn.prototype.multi = function (params) {
    let res = this.arr.map(item => item * params);
    console.log(res)
    return res;
}
const arr = [1, 3, 5, 7]
let func = new fn(arr);
func.add(5);
func.multi(4)



// 函数式编程思想
// let arr = [1, 2, 3, 4];
// let newArr = (arr, fn) => {
//   let res = [];
//   for (let i = 0; i < arr.length; i++) {
//     res.push(fn(arr[i]));
//   }
//   return res;
// }
// let add = item => item + 5;
// let multi = item => item * 5;
// let sum = newArr(arr, add);
// let product = newArr(arr,multi);
// console.log(sum);
// console.log(product);
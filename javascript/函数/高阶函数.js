// 高阶函数：
//  高阶函数是对其它函数进行操作的函数，可以将他们作为参数或者返回它们。
//  简单来说，高阶函数是一个函数，它接收函数作为参数或将函数作为输出返回。

// map/reduce/filter/flat

// map
// const arr = [1, 2, 3, 4, 5];
// const arr3 = arr1.map(function (item, index, arr) {
//   // console.log(item,index,arr);
//   return item * 2;
// })
 
// console.log(arr3);
// const arr4 = arr1.map(item => item * 2);
// console.log(arr4);
 
// reduce
let arr1 = [1, 2, 3, 4, 5, 5, 5, 5, 6, 4];
let arr2 = [1,2,3,4,5];
let sum = arr2.reduce((prev, cur) => {
// console.log('prev:',prev,'cur:',cur)
  return prev + cur;
}, 0);
 
console.log(sum);

//  数组去重
let newArr = arr1.reduce((prev, cur) => {
  // console.log('prev:',prev,'cur:',cur)
  prev.indexOf(cur) === -1 && prev.push(cur);
  return prev;
}, [])
console.log(newArr);
//  数组去重
let res =[...new Set(arr1)]

 
// filter
// let persons = [
//   { 'name': 'Peter', age: 21 },
//   { 'name': 'Mark', age: 28 },
//   { 'name': 'Josn', age: 19 },
//   { 'name': 'Jane', age: 31 },
//   { 'name': 'Tony', age: 35 }
// ]
// let newAge = persons.filter(item => item.age > 21);
// console.log(newAge);
 
 
 
// flat 把多维数组转成一维数组
// let arr = [1, 2, 3, 4, [5, 6, [7, 8, [9, 10, [11, 12, [13, 14]]]]]];
// let arr1 = arr.flat(Infinity);
// console.log(arr1);
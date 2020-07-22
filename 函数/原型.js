// 原型

// 获取对象的原型属性
// Object.getPrototypeOf(obj)
let a = {};
// console.log(Object.getPrototypeOf(a) === Object.prototype)  //true

// 设置对象的原型属性
// Object.setPrototypeOf(obj,prototype)
let b={x:1};
let c={};
Object.setPrototypeOf(c,b);
// console.log(Object.getPrototypeOf(c) === b)   //true

// 检测是否为某个对象的原型
// someObj.isPrototypeOf(anotherObj)
let d={x:1};
let e=Object.create(d);
console.log(d.isPrototypeOf(e));                 //true
console.log(Object.prototype.isPrototypeOf(e));  //true





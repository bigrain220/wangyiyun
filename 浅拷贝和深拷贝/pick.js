const _  = require('underscore');

let obj = {
  name:'开心',
  age:30
}

// 返回了一个obj 的副本。
let age = _.pick(obj,'age');
console.log(age);
console.log(obj);
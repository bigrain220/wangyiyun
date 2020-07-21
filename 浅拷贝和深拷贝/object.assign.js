// Object.assign 可以把n 个源对象拷贝到目标对象中去

/* 
es6中的方法

Object.assign是深拷贝还是浅拷贝
*/

let kaixin = {
  name: '开心',
  info: {
    gender: '女',
    hobby: '吃饭睡觉打豆豆'
  }
}

// 第一级属性是深拷贝，以后级别浅拷贝
let lincancan = Object.assign({}, kaixin);
console.log(lincancan);

lincancan.name = '林灿灿';
console.log(kaixin.name);  // 开心
lincancan.info.hobby = '吃猪扒';
console.log(kaixin.info.hobby); // 吃猪扒
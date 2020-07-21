//  递归实现深拷贝
let deepClone = obj => {
  let newObj = Array.isArray(obj) ? [] : {};
  if (obj && typeof obj === 'object') {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] && typeof obj[key] === 'object') {
          newObj[key] = deepClone(obj[key]);
        } else {
          // 如果不是对象直接拷贝
          newObj[key] = obj[key];
        }
      }
    }
  }
  return newObj;
}

let richGirl = {
  name: '开心',
  car: ['宝马', '奔驰', '保时捷'],
  deive: function () { },
  age: undefined
}

let richBoy = deepClone(richGirl);
// console.log(richBoy);

richBoy.deive = '渣男开大G';
richBoy.name = '小明';
richBoy.car = ['哈罗单车', '膜拜'];
richBoy.age = 20;

console.log(richGirl);
console.log(richBoy);
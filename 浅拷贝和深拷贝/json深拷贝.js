let obj = {
  name: '小明',
  dog: ['小花', '旺财']
}

// 
let obj1 = JSON.parse(JSON.stringify(obj));
obj1.name = '小华';
obj1.dog[0] = '小白';
// console.log(obj1,obj)

let richGirl = [{
  name:'开心',
  car:['宝马','奔驰','保时捷'],
  deive:function (){},
  age:undefined
}]

let richBoy = JSON.parse(JSON.stringify(richGirl));
console.log(richBoy);

// 纯的JSON数据，不包含循环引用
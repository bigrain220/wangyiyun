let obj = {};
obj.name = '班班开心';

console.log(obj.hasOwnProperty('name'));// 非继承
// delete obj.name;
// console.log(obj.hasOwnProperty('name'));// 非继承


// 构造，
function People(name){
  this.name = name;
  this.say = function (){
    console.log(`我是网易${this.name}`)
  }
}

// 通过原型去继承
People.prototype.run = function (){
  console.log('跑步减肥去');
}

let pengyuyan = new People('彭于晏');
pengyuyan.say();
pengyuyan.run();

for(let i in pengyuyan){
  console.log(i)
}


console.log(pengyuyan.hasOwnProperty('run'));// 返回false ,run方法不是pengyuyan对象自身的属性，是通过继承来的



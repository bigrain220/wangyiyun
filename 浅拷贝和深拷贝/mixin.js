let mixin = {
  say() {
    console.log(`${this.name}在说话`);
  },

  sing() {
    console.log(`${this.name}在唱歌`);
  },

  run() {
    console.log(`${this.name}在跑步`);
  }
}

// 没有任何方法的
class Student {
  constructor(name) {
    this.name = name;
  }
}


// 拷贝,不通过集成去扩展方法,
Object.assign(Student.prototype, mixin);
let student = new Student('王二柱');
student.run();
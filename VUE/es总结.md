
### 函数 length 属性值

- 函数 length 属性通常用来表示函数参数的个数，当引入函数默认值之后，length 表示的就是第一个有默认值参数之前的普通参数个数

```js
const funcA = function (x, y) {};
console.log(funcA.length); // 输出结果：2

const funcB = function (x, y = 1) {};
console.log(funcB.length); // 输出结果：1

const funcC = function (x = 1, y) {};
console.log(funcC.length); // 输出结果 0
```

### 参数作用域

- 当给函数的参数设置了默认值之后，参数在被初始化时将形成一个独立作用域，初始化完成后作用域消解:

```js
let x = 1;
function func(x, y = x) {
  console.log(y);
}
// 这里最终会打印出2。在函数调用时，参数 x, y 将形成一个独立的作用域，所以参数中的y会等于第一个参数中的x，而不是上面定义的1。
func(2);
```

```js
const Fn = (params) => {
  console.log("Fn", params);
  const childFn = (params) => {
    console.log("childFn", params);
  };
  return childFn;
};
//childFn函数的参数params只和调用传递的值有关
Fn(1)();
// Fn   1
// childFn undefined
```

### 模块化

- 导入导出复合用法:

1.  先导入后导出:

```js
export { foo, bar } from "one.js";
// 等同于
import { foo, bar } from "one.js";
export { foo, boo };
```

2. 整体先导入再导出

```js
// one.js文件
export const a=1
export const b=2
export default function defaultTest(){
  console.log('defaultTest')
}
// --------------情况1--------------

// two.js文件
export * from 'one.js';  //在本文件中导出 one.js 文件中的所有模块 (不包含default)
export { default } from 'one.js'; // 在本文件中导出 one.js 文件中的default模块

//three.js文件
import * as all from 'two.js' // 接收所有导出,包含default
import {a} from 'two.js' // 接收指定的模块。 不能通过import {default} from 'two.js'来接受default
import alias from 'two.js' // 接收default。alias可以随便命名

// --------------情况2--------------

// two.js文件
export * as all from 'one.js';// 在本文件中导出 one.js 文件中的所有模块 (包含default)
//three.js文件
import {all} from 'two.js' //接收所有导出,包含default
```

### Object.xxx

- 在 ES5 中就引入了 Object.keys 方法，在 ES8 中引入了跟 Object.keys 配套的 Object.values 和 Object.entries，作为**遍历一个对象**的补充手段，供`for...of`循环使用。

```js
let obj = {
  id: 1,
  name: "hello",
  age: 18,
};
console.log(Object.keys(obj)); // 输出结果: ['id', 'name', 'age']
console.log(Object.values(obj)); // 输出结果: [1, 'hello', 18]
console.log(Object.entries(obj)); // 输出结果: [['id', 1], ['name', 'hello'], ['age', 18]]

const array = [
  ["id", 1],
  ["name", "hello"],
  ["age", 18],
];
console.log(Object.fromEntries(array)); //输出结果：{id: 1, name: 'hello', age: 18}
```

- `Object.fromEntries()`方法可以把键值对列表转换为一个对象。该方法相当于 Object.entries() 方法的逆过程。
- `Object.hasOwn()`方法检查属性是否直接设置在对象上`Object.hasOwn(obj, keyName)`,返回一个布尔值。

### for await…of

- `for await...of` 方法被称为异步迭代器，该方法是主要用来遍历异步对象。
- `for await...of` 语句会在异步或者同步可迭代对象上创建一个迭代循环，包括 String，Array，类数组，Map， Set 和自定义的异步或者同步可迭代对象。这个语句只能在 async function 内使用：

```js
function Gen(time) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      resolve(time);
    }, time);
  });
}

async function test() {
  let arr = [Gen(2000), Gen(100), Gen(3000)];
  for await (let item of arr) {
    console.log(Date.now(), item);
  }
}
test();
```

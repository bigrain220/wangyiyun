//一、export 和 import

//export.js

// 写法一
export var m = 1;
export function f() { console.log('i am function') };

// 写法二(推荐)
var m = 1;
function f() { console.log('i am function') };
export { m, f };

// 写法三(重命名)
var n = 1;
function f() { console.log('i am function') };
export {n as m,f};

// tips: 
//  1.export语句输出的接口，与其对应的值是动态绑定关系，即通过该接口，可以取到模块内部实时的值。
//  2.export命令可以出现在模块的任何位置，只要处于模块顶层就可以(不能处于块级作用域内)。

//import.js(也可以使用as实现重命名)

//写法一
import {m} from "./module.js/index.js"
import {f} from "./module.js/index.js"

console.log(m,f()) // 1, i am function

// 写法二
import { m, f } from "./module.js/index.js";

console.log(m,f()) // 1, i am function

//写法三(整体加载配合重命名,*表示所有)
import * as getResult from './module.js/index.js';

console.log(getResult.m,getResult.f()) // 1, i am function


//二、export default 和 import
// 使用import命令的时候，用户需要知道所要加载的变量名或函数名，否则无法加载。
// 为了解决这个问题，可以使用export default命令，为模块指定默认输出。

// export-default.js

//写法一：
export default function () {
    console.log('我是export default输出内容');
  }

//写法二(可以加函数名称，但是不起作用，加了等于没加):
export default function foo() {
    console.log('我是export default输出内容');
  }

// 写法三(和export不一样，不需要加{},是foo，而不是{foo}):
  function foo() {
    console.log('我是export default输出内容');
  }

  export default foo;

  //import.js（selfName是随意取的，而且不需要加{}）
  import selfName from './export-default.js'; 

  selfName() //我是export default输出内容
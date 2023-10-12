# 知识点

## 基础知识

- `<div :title="toTitleDate(date)">{{formatDate(date)}}</div>`
  绑定在表达式中的方法在组件每次更新时都会被重新调用，因此不应该产生任何副作用，比如改变数据或触发异步操作。

- 模版中的表达式将被沙盒化，仅能够访问到有限的全局对象列表：（https://github.com/vuejs/core/blob/main/packages/shared/src/globalsAllowList.ts#L3）。
  如果想访问其它的，可以在`app.config.globalProperties`上显式的添加

- `<script setup>` 中的顶层的导入、声明的变量和函数可在同一组件的模板中直接使用。
  你可以理解为模板是在同一作用域内声明的一个 JavaScript 函数——它自然可以访问与它一起声明的所有内容

### _ref()_

- `ref` 是一个函数， 在 template 中 ref 的参数变量可以直接读写，在 script 中 ref 声明的参数变量需要加上.value 才可以
- `ref`作用：当一个组件首次渲染时，Vue 会追踪在渲染过程中使用的每一个 ref。然后，当一个 ref 被修改时，它会触发追踪它的组件的一次重新渲染
- 使用`ref`而不是普通的变量的原因：
  1. 在 js 中，检测普通变量的访问或修改是行不通的。然而，我们可以通过 getter 和 setter 方法来拦截对象属性的 get 和 set 操作。`.value` 属性给予了 Vue 一个机会来检测 ref 何时被访问或修改
  2. 与普通变量不同，你可以将 ref 传递给函数，同时保留对最新值和响应式连接的访问。

### _reactive()_

- `reactive` 是一个函数， 与将内部值包装在特殊对象中的 ref 不同，reactive() 将使对象本身具有响应性
- `reactive()` 返回的是一个原始对象的 Proxy，它和原始对象是不相等的
- 局限性：
  1. 它只能用于对象类型 (对象、数组和如 Map、Set 这样的集合类型)。它不能持有如 string、number 或 boolean 这样的原始类型
  2. 不能替换整个对象。Vue 的响应式跟踪是通过属性访问实现的，因此我们必须始终保持对响应式对象的相同引用
  3. 对解构操作不友好。当我们将响应式对象的原始类型属性解构为本地变量时，或者将该属性传递给函数时，我们将丢失响应性连接

### _computed()_

- `computed()` 方法期望接收一个 getter 函数，返回值为一个计算属性 ref。和其他一般的 ref 类似，你可以通过.value 访问计算结果。计算属性 ref 也会在模板中自动解包，因此在模板表达式中引用时无需添加 .value。
- 计算属性默认是只读的。在某些特殊场景中你可能需要用到“可写”的属性，你可以通过同时提供 `getter` 和 `setter` 来创建

### _watch()_

`watch(source, callback, configObj)`

- `watch()` 的第一个参数可以是不同形式的“数据源”：它可以是一个 ref (包括计算属性)、一个响应式对象、一个 getter 函数、或多个数据源组成的数组
- 不能直接侦听响应式对象的**属性值**

```javascript
const obj = reactive({ count: 0 });
// 错误，因为 watch() 得到的参数是一个 number
watch(obj.count, (count) => {});
// 正确写法：提供一个 getter 函数
watch(
  () => obj.count,
  (count) => {}
);
```

- 直接给 watch() 传入一个响应式对象(reactive())，会隐式地创建一个深层侦听器——该回调函数在所有嵌套的变更时都会被触发
- 一个返回响应式对象的 getter 函数，只有在返回不同的对象时，才会触发回调。`watch(state.someObject, (newValue, oldValue) => {}) // 仅当 state.someObject 被替换时触发`
- 上面的情况强制转成深层侦听器,使用 watch 函数第三个参数`{ deep: true }`。`watch(state.someObject, (newValue, oldValue) => {},{ deep: true })`
- watch 函数第三个参数`{immediate: true}` 选项来强制侦听器的回调立即执行

### _watchEffect()_

`watchEffect(callback,configObj)`

- `watchEffect(()=>{})` 允许我们自动跟踪回调的响应式依赖。回调会立即执行，不需要指定 immediate: true
- `watchEffect()` 仅会在其同步执行期间，才追踪依赖。在使用异步回调时，只有在第一个 await 正常工作前访问到的属性才会被追踪。

**_要在侦听器回调中能访问被 Vue 更新之后的 DOM，你需要指明 `{flush: 'post'}` 选项,配置在上面`configObj`对象里面,`watchEffect`可以简写为`watchPostEffect(callback)`_**
**_如果用异步回调创建一个侦听器，那么它不会绑定到当前组件上，你必须手动停止它，以防内存泄漏。调用 watch 或 watchEffect 返回的函数即可`const unWatch = watch(()=>{})  在需要的地方调用unWatch()`_**

### _v-for_

- `v-for`可以解构写法：`v-for="{ id } in items`,`v-for="({ id }, index) in items`
- 可以使用 `of` 作为分隔符来替代 in: `v-for="item of items"`
- `v-for`可以遍历对象。`v-for="(value, key, index) in myObject"`

### _v-model_

- `v-model`的原理：`<input :value="text" @input="event => text = event.target.value">` 相当于 `<input v-model="text">`
- `<input v-model.lazy="msg" />` 默认情况下，v-model 会在每次 input 事件后更新数据。你可以添加 lazy 修饰符来改为在每次 change 事件后更新数据
- `<input v-model.number="age" />` 输入自动转换为数字,如果该值无法被 parseFloat() 处理，那么将返回原始值
- `<input v-model.trim="msg" />` 默认自动去除用户输入内容中两端的空格
- `v-model`在自定义组件上的使用: https://cn.vuejs.org/guide/components/v-model.html#v-model-arguments

### _@click/v-on:click_

- `@click="handler"` 事件处理器 (handler) 的值可以是：
  1. 内联事件处理器：事件被触发时执行的内联 JavaScript 语句 (与 onclick 类似)。
  2. 方法事件处理器：一个指向组件上定义的方法的属性名或是路径。
- 在内联事件处理器中访问事件参数(原生 DOM 事件):
  1. 使用特殊的 $event 变量: `@click="fn('xxx', $event)"`
  2. 使用内联箭头函数: `@click="(event) => fn('xxx', event)"`

## 路由相关

- 如果路由通过 require 引入会报错,换成 import 不会。
  引入方式:component: (resolve) => require(["@/pages/home"], resolve))
  报错：Cannot read properties of undefined (reading 'apply')

## 组件相关

- 浏览器会自动将标签和属性由大写转成小写。所以需要注意组件标签名称和属性的大小写：

  1. 当使用 DOM 内嵌模板 (直接写在 HTML 文件里的模板) 时 只能使用 kebab-case
  2. .vue（单文件组件（SFC）） 文件中，可以使用 kebab-case 和 PascalCase

- **全局注册**，但并没有被使用的组件无法在生产打包时被自动移除 (也叫“tree-shaking”)。如果你全局注册了一个组件，即使它并没有被实际使用，它仍然会出现在打包后的 JS 文件中
- `v-bind`用来响应式地绑定一个属性: `v-bind:xxx=value`简写成`:xxx=value` ;<br>
  不带参数可以绑定多个属性: `v-bind=objectOfAttrs`相当于`:attr1=objectOfAttrs.attr1 :attr2=objectOfAttrs.attr2`
- `defineProps()` 宏中的参数不可以访问 `<script setup>` 中定义的其他变量，因为在编译时整个表达式都会被移到外部的函数中。
- boolean 类型转换:`<MyComponent disabled />` 等同于传入 `:disabled="true"`, `<MyComponent />` 等同于传入 `:disabled="false"`
- **事件(emit)**
  1. `<template>`里面可以直接使用 `$emit`方法触发自定义事件
  2. `<script>`里面可以显式地通过 `defineEmits()` 宏来声明它要触发的事件,`const emit = defineEmits(['inFocus', 'submit'])`。触发方式:调用函数`emit('submit')`
  3. `defineEmits()`可以对声明的事件参数做验证,通过返回一个布尔值：`defineEmits({  inFocus:null,  submit(params){ return !!params }  })`


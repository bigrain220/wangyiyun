import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// jsx:
// 1.将jsx语法包裹在括号中,避免到自动插入分号;
// 2.可以安全地在 JSX 当中插入用户输入内容。
// 因为React DOM 在渲染所有输入内容之前，默认会进行转义。它可以确保在你的应用中，永远不会注入那些并非自己明确编写的内容。
// 所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 XSS（cross-site-scripting, 跨站脚本）攻击。
// 3.JSX 其实是一个对象。Babel 会把 JSX 转译成一个名为 React.createElement() 函数调用。

// 元素渲染
// 1.与浏览器的 DOM 元素不同，React 元素是创建开销极小的普通对象。React DOM 会负责更新 DOM 来与 React 元素保持一致
// 2.React 元素是不可变对象。一旦被创建，你就无法更改它的子元素或者属性。更新 UI 唯一的方式是创建一个全新的元素，并将其传入 ReactDOM.render()。
// 3.React DOM 会将元素和它的子元素与它们之前的状态进行比较，并只会进行必要的更新来使 DOM 达到预期的状态。


// 组件&props
// 1.组件名称必须以大写字母开头
// 2.所有 React 组件都必须像纯函数一样保护它们的 props 不被更改。
// 3.每次组件更新时 render 方法都会被调用，但只要在相同的 DOM 节点中渲染一个组件 ，就仅有一个该组件的 class 实例被创建使用。
// 也就是说 数据改变render会再调用 但是class实例不会再创建，这也就产生了生命周期的概念

// 事件处理
// 1.在 React 中另一个不同点是你不能通过返回 false 的方式阻止默认行为。你必须显式的使用 preventDefault 
// 2.class 的方法默认不会绑定 this,绑定this的方法：
// 2.1  bind方法：this.handleClick = this.handleClick.bind(this);
// 2.2  class fields方法: handleClick = () => {console.log('this is:', this)} //Create React App 默认启用此语法
// 2.3  箭头函数方法：<button onClick={() => this.handleClick()}></button> //如果该回调函数作为 prop 传入子组件时，这些组件可能会进行额外的重新渲染，导致性能不好
// 3.向事件处理程序传递参数
// <button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
// <button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
// 如果通过箭头函数的方式，事件对象必须显式的进行传递，而通过 bind 的方式，事件对象以及更多的参数将会被隐式的进行传递。

// 表单
// 在受控组件上指定 value 的 prop 会阻止用户更改输入。eg: ReactDOM.render(<input value="hi" />, mountNode);
// 如果你指定了 value，但输入仍可编辑，则可能是你意外地将value 设置为 undefined 或 null。eg:  ReactDOM.render(<input value={null} />, mountNode);

// 状态提升
// 在 React 中，将多个组件中需要共享的 state 向上移动到它们的最近共同父组件中，便可实现共享 state。这就是所谓的“状态提升”。

// 组合
// 1.在 React 中没有“槽(slot)”这一概念的限制，你可以将任何东西作为 props 进行传递。
// 运行 ./node_modules/.bin/tslint 编译ts
// 然后运行 node ./dist/index.js运行编译后的js
// 可使用 ts-node 插件合并以上两个命令

console.log('你好,typescript')

let a = 1 + 2
let b = a + 3
let c = {
  apple: a,
  banana: b,
}
let d = c.apple * 4

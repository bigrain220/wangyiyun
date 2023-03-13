// 运行 ./node_modules/.bin/tsc 编译ts
// 然后运行 node ./dist/index.js运行编译后的js
// 可使用 ts-node 插件合并以上两个命令

console.log('你好1,typescript')

const test = () => {
  let a = 1 + 2
  let b = a + 3
  let c = {
    apple: a,
    banana: b,
  }
  let d = c.apple * 4
}
test()


function squareOf(n: number) {
  return n * n
}
// 'z'是字符串，将会报错
// squareOf('z')

const anyFn = () => {
  let abc: readonly number[] = [1, 2, 3]

}

anyFn()


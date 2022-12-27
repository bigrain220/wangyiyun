/**
 * loopFn
 */
function number() {
  console.log('我被调用了')
  return 100000
}
// 以下代码，控制台打印了一次‘我被调用了’
for (let i = number(); i < 0; i--) {}

// 以下代码，控制台打印了100000次‘我被调用了’
for (let i = 0; i < number(); i++) {}

// 顺序可以这样优化就和倒序差不多
let len = number()
for (let i = 0; i < len; i++) {}
//  倒序并不是快于正序，之所以我们看到的倒序更快，是因为写法原因导致的，通常我们正序会直接把array.length直接写进终止条件里，而倒序则是写在变量声明阶段。所以这种情况下倒序快于正序。

/**
 * judgeFn
 * 通过嵌套的if-else减少判断次数
 */
// 优化前：
if (value === 0) {
  return result0
} else if (value === 1) {
  return result1
} else if (value === 2) {
  return result2
} else if (value === 3) {
  return result13
} else if (value === 4) {
  return result4
} else if (value === 5) {
  return result5
} else if (value === 6) {
  return result6
} else if (value === 7) {
  return result7
} else if (value === 8) {
  return result8
}

// 优化后(此例使用二分法)：
if (value < 5) {
  if (value < 3) {
    if (value === 0) {
      return result0
    } else if (value === 1) {
      return result1
    } else {
      return result2
    }
  } else {
    if (value === 3) {
      return result3
    } else {
      return result4
    }
  }
} else {
  if (value < 7) {
    if (value === 5) {
      return result5
    } else {
      return result6
    }
  } else {
    if (value === 7) {
      return result7
    } else if (value === 8) {
      return result8
    }
  }
}

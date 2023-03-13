<!-- 类型全解 -->

**类型：一系列值及可以对其执行的操作**
**类型字面量：仅表示一个值的类型**

- `any`：可以为任意类型。（如果想让 ts 在遇到隐式`any`类型时报错，在`tsconfig.json`中启用`noImplicitAny`标志，或者启用`strict`）。
- `unknown`：与`any`类似，unknown 也表示任何值,但是 ts 会要求你再做检查，细化类型：

  ```javascript
  let a: unknown = 30 //unknown
  let b = a === 123 //boolean
  let c = a + 10 //报错：“a”的类型为“未知”
  if (typeof a === 'number') {
    let d = a + 10 //number
  }
  ```

  unknown 声明方式总结：

  1. TS 不会把任何值推导为 unknown 类型，必须显式注解(`a`)
  2. unknown 类型的值可以比较(`b`)
  3. 执行操作时不能假定 unknown 类型的值为某种特定类型(`c`)，必须先向 TS 证明一个值确实是某个类型(`d`)

- `boolean`：该类型值为`true`和`false`。可以比较(`==、===、||、&&、?`),还可以否定(`!`)

  ```javascript
  let a = true //boolean
  var b = false //boolean
  const c = true //true
  let d: boolean = true //boolean
  let e: true = true //true
  let f: true = false //报错：不能将类型“false”分配给类型“true”
  ```

  boolean 声明方式总结：

  1. 可以让 ts 推导出值的类型为 boolean(`a`和`b`)。 [推荐]
  2. 可以让 ts 推导出值为某个具体的布尔值(`c`)。 [推荐]
  3. 可以明确告诉 ts，值的类型为 boolean(`d`)。 [不推荐使用]
  4. 可以明确告诉 ts，值为某个具体的布尔值(`e`和`f`)，使用**类型字面量**量显示注解了变量。 [极少数情(如需要额外提升类型安全时)使用]
     **_注意，let 和 const 推导出的类型不同，上面例子 a 为 boolean，c 为 true_**

- `number`: 包括所有数字:整数、浮点数、正数、负数、Infinity、NaN 等。可以做算数运算(+、-、%、<等)。

  ```javascript
  let a = 1234 //number
  var b = Infinity * 0.1 //number
  const c = 5678 //5678
  let d = a < b //boolean
  let e: number = 100 //number
  let f: 26.218 = 26.218 //26.218
  let g: 26.218 = 10 //报错：不能将类型“10”分配给类型“26.218”
  ```

  number 声明方式总结：

  1. 可以让 ts 推导出值的类型为 number(`a`和`b`)。 [推荐]
  2. 可以使用 const，让 ts 推导出值为某个具体的数字(`c`)。 [推荐]
  3. 可以明确告诉 ts，值的类型为 number(`e`)。 [不推荐使用]
  4. 可以明确告诉 ts，值为某个具体的数字(`f`和`g`)。 [推荐]

- `bigint`: 这是 js 和 ts 新引入的类型，在处理较大的整数时,不用再担心舍入误差。`number` 类型表示的整数最大为 2^53,`bigint` 没有限制。bigint 类型包含所有的 BigInt 数，可以做算数运算(+、-、%、<等)。

  ```javascript
  let a = 1234n //bigint
  const b = 5678n //5678n
  var c = a + b //bigint
  let d = a < 1235 //boolean
  let e = 88.5n //报错：BigInt 字面量必须是整数。
  let f: bigint = 100n //bigint
  let g: 100n = 100n //100n
  let h: bigint = 100 //报错：不能将类型“number”分配给类型“bigint”
  ```

- `string`: 包含所有的字符串,以及可以对字符串执行的操作,例如+、.slice 等。

  ```javascript
  let a = 'hello' //string
  var b = 'billy' //string
  const c = '!!!' //!!!
  let d = a + '' + b + c //string
  let e: string = 'zoom' //string
  let f: 'join' = 'join' //'join'
  let g: 'join' = 'zoe' //报错：不能将类型“"zoe"”分配给类型“"join"”
  ```

- `symbol`：用于替代对象和映射的字符串键,确保使用正确的已知键,以防键被意外设置。

- `对象`：ts 的对象类型表示对象的结构。 （通过对象类型无法区分不同的简单对象(使用{}创建)或复杂的对象(使用 new 生成)）

  **_注意，let 和 const 对对象推导出的类型相同，而基本类型(number、string、boolean、bigint、symbol)会受影响_**

  ```javascript
  const a: { b: number } = {
    b: 12, //{b:number} 而不是{b:12}
  }
  const c: { b: number } = {
    b: 12, //{b:number}
  }
  ```

  **_添加额外的属性和缺少必要的属性会报错_**

  ```javascript
  let a: { b: number }
  a = {} //报错：类型 "{}" 中缺少属性 "b"，但类型 "{ b: number; }" 中需要该属性
  a = {
    b: 1,
    c: 2, //报错：不能将类型“{ b: number; c: number; }”分配给类型“{ b: number; }”。对象字面量只能指定已知属性，并且“c”不在类型“{ b: number; }”中。
  }
  ```

  **_告诉 ts 某个属性是可选的，或者实际的属性可能比计划的多,如下例子：_**

  ```javascript
  let a: {
    b: number  //a有个类型为number的属性b
    c?:string //a可能有个string类型的属性c。如果有属性c,其值可以为undefined
    [key:number]:boolean //a可能有任意多个数字属性,其值为布尔值

    // [key:T]:U 句法称为索引签名，表示在这个对象中，类型为T的键对应的值为U类型
    // 因为是对象的键名,索引签名参数T的类型必须是 “string”、“number”、“symbol”或模板文本类型,
    // 不一定用`key`，还可以为任何词
  }
  ```

  **_空对象类型(`{}`)和(`Object`)除了 `null` 和 `undefined` 之外,其它任何类型都可以赋值，应该避免使用_**

  ```javascript
  let danger: {}
  danger = {}
  danger = 1
  danger = null //报错：不能将类型“null”分配给类型“{}”
  let warning: Object
  warning = {}
  warning = 1
  warning = null //报错：不能将类型“null”分配给类型“Object”
  ```

  对象 声明方式总结：

  1. 对象字面量表示法(`{a:string}`),也称对象的结构。如果知道对象有哪些字段，或者对象的值都为相同的类型，使用这种方式。 [推荐]
  2. 空对象字面量表示法(`{}`)。 [不推荐使用]
  3. `object`类型。如果需要一个对象，但对对象的字段没有要求，使用这种方式。 [推荐]
  4. `Object`类型。 [不推荐使用]

- `数组`: 特殊类型的对象，支持 js 数组的操作,例如 push、slice 等。注解数组类型有两种方式: `T[]` 和 `Array<T>`

- `元组`: 元组是 array 的子类型，用来表示已知元素数量和类型的数组，各元素的类型不必相同，对应位置的类型需要相同。

  ```javascript
  let a: [string, number] = ['1', 2] //[string, number]
  let b: [string, number, boolean] = ['1', 2] //报错：不能将类型“[string, number]”分配给类型“[string, number, boolean]”。源具有 2 个元素，但目标需要 3 个。
  //可选
  let c: [string, number, boolean?] = ['1', 2] //[string, number, (boolean | undefined)?]
  //剩余元素(至少有一个元素)
  let d: [string, ...string[]] = ['1']
  //只读数组(可以使用readonly、Readonly、ReadonlyArray)
  let e: readonly number[] = [1, 2, 3]
  ```

- `null`: 表示对象值缺失。

- `undefined`: 用于初始化变量为一个未定义的值

- `void`: 函数没有返回值，这个函数的类型为`void`

- `never`: `never`类型表示的是那些永不存在的值的类型.例如， `never`类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是 `never`类型，当它们被永不为真的类型保护所约束时。

- `枚举`: 对 JavaScript 标准数据类型的一个补充。 像 C#等其它语言一样，使用枚举类型可以为一组数值赋予友好的名字。
  ```javascript
   enum Language {
    English = 0,
    Spanish = 1,
    Russian = 2
  }
   enum Language {
    English = 'test',
    Spanish = '1',
    Russian = 20
  }
  ```
  1. 枚举名称一般首字母大写，枚举中的键也是
  2. 元素编号默认为 0,1,2...。也可以手动设置任意编号。编号值也可以为字符串。
  3. 一个枚举可以分成几次声明，TS 会自动各部门合并

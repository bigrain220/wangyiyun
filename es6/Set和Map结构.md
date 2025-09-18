# set 

## 基本用法

ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。
`Set`本身是一个构造函数，用来生成 Set 数据结构。

- 数组去重： `[...new Set(array)]`
- 数组去重： `Array.from(new Set(array));` ( `Array.from()` 方法可以将 `Set` 结构转为数组。)
- 字符串去重：`[...new Set(string)].join()`
- 实现并集、交集、差集：
```javascript
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// （a 相对于 b 的）差集
let difference = new Set([...a].filter(x => !b.has(x)));
// Set {1}
```

### Set 实例的属性和方法
Set 结构的实例有以下属性。

- `Set.prototype.constructor`：构造函数，默认就是`Set`函数。
- `Set.prototype.size`：返回`Set`实例的成员总数。

Set 实例的方法:操作方法（用于操作数据）

- `Set.prototype.add(value)`：添加某个值，返回 Set 结构本身。(添加的`NaN`是相等的，只能得到一个;添加的对象`{}`不相等)
- `Set.prototype.delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功。
- `Set.prototype.has(value)`：返回一个布尔值，表示该值是否为`Set`的成员。
- `Set.prototype.clear()`：清除所有成员，没有返回值。

Set 实例的方法:遍历方法（用于遍历成员）

- `Set.prototype.keys()`：返回键名的遍历器
- `Set.prototype.values()`：返回键值的遍历器
- `Set.prototype.entries()`：返回键值对的遍历器
- `Set.prototype.forEach()`：使用回调函数遍历每个成员


`keys`方法、`values`方法、`entries`方法返回的都是遍历器对象，可以使用 `for of` 遍历(也可以用它直接遍历Set 实例)
由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以`keys`方法和`values`方法的行为完全一致。


## WeakSet
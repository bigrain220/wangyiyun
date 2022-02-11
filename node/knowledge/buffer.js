// Buffer 是内存区域。
// 它表示在 V8 JavaScript 引擎外部分配的固定大小的内存块（无法调整大小）。
// 可以将 buffer 视为整数数组，每个整数代表一个数据字节。

// 为什么需要buffer
// Buffer 被引入用以帮助开发者处理二进制数据，在此生态系统中传统上只处理字符串而不是二进制数据。
// Buffer 与流紧密相连。 当流处理器接收数据的速度快于其消化的速度时，则会将数据放入 buffer 中。
// 一个简单的场景是：当观看 YouTube 视频时，红线超过了观看点：即下载数据的速度比查看数据的速度快，且浏览器会对数据进行缓冲。

// buffer的创建方法：
// Buffer.from(array)
// Buffer.from(arrayBuffer[, byteOffset[, length]])
// Buffer.from(buffer)
// Buffer.from(string[, encoding])
// 也可以只初始化 buffer（传入大小）。 以下会创建一个 1KB 的 buffer：
// Buffer.alloc(1024)
// Buffer.allocUnsafe(1024)

const buf = Buffer.from('Hey!')
console.log(buf) 
console.log(buf[0]);
console.log(buf.length);
// 属于可迭代对象
for (const num of buf) {
    console.log(num);
}

// 更改buffer
// 1. write()修改整体：
const buf1 = Buffer.alloc(4)
buf1.write('Hey!')
// 2.修改部分
const buf2 = Buffer.from('Hey!')
buf2[1] = 111 //o
// 3.copy()复制buffer
const buf3 = Buffer.from('Hey!')
let bufcopy = Buffer.alloc(4) //分配 4 个字节。
buf3.copy(bufcopy)
// 默认情况下，会复制整个 buffer。 另外的 3 个参数可以定义开始位置、结束位置、以及新的 buffer 长度：
const buf4 = Buffer.from('Hey!')
let bufcopy = Buffer.alloc(2) //分配 2 个字节。
buf4.copy(bufcopy, 0, 0, 2)
bufcopy.toString() //'He'


// 切片 buffer 通过slice()方法
const buf5 = Buffer.from('Hey!')
buf5.slice(0).toString() //Hey!
const slice = buf5.slice(0, 2)
// console.log(slice.toString()) //He
buf5[1] = 111 //o
// console.log(slice.toString()) //Ho

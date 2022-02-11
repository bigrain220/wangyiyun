// 流是为 Node.js 应用程序提供动力的基本概念之一。
// 它们是一种以高效的方式处理读/写文件、网络通信、或任何类型的端到端的信息交换。

// Node.js 的 stream 模块 提供了构建所有流 API 的基础。 所有的流都是 EventEmitter 的实例。

// 流的主要优点：
// 内存效率: 无需加载大量的数据到内存中即可进行处理。
// 时间效率: 当获得数据之后即可立即开始处理数据，这样所需的时间更少，而不必等到整个数据有效负载可用才开始。


// Node.js，Stream 有四种流类型：
// Readable - 可读操作。
// Writable - 可写操作。
// Duplex - 可读可写操作.
// Transform - 操作被写入数据，然后读出结果。

// 所有的 Stream 对象都是 EventEmitter 的实例。常用的事件有：
// data - 当有数据可读时触发。
// end - 没有更多的数据可读时触发。
// error - 在接收和写入过程中发生错误时触发。
// finish - 所有数据已被写入到底层系统时触发。


var fs = require("fs");
var fileName = __dirname + "/data.json";


// 从流中读取数据
var data = '';
// 创建可读流
var readerStream = fs.createReadStream(fileName);
// 设置编码为 utf8。
readerStream.setEncoding('UTF8');
// 处理流事件 --> data, end, and error
readerStream.on('data', function(chunk) {
   data += chunk;
});
readerStream.on('end',function(){
   console.log(data);
});
readerStream.on('error', function(err){
   console.log(err.stack);
});

// 写入流
var data1 = '666';
// 创建一个可以写入的流，写入到文件 output.txt 中
var writerStream = fs.createWriteStream('output.txt');
// 使用 utf8 编码写入数据
writerStream.write(data1,'UTF8');
// 标记文件末尾
writerStream.end();
// 处理流事件 --> finish、error
writerStream.on('finish', function() {
    console.log("写入完成。");
});
writerStream.on('error', function(err){
   console.log(err.stack);
});

// 管道流 pipe():它获取来源流，并将其通过管道传输到目标流
var readerStream = fs.createReadStream('input.txt');
var writerStream = fs.createWriteStream('output.txt');
// 管道读写操作
// 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
readerStream.pipe(writerStream);


var zlib = require('zlib');

// 压缩 input.txt 文件为 input.txt.gz
fs.createReadStream('input.txt')
  .pipe(zlib.createGzip())
  .pipe(fs.createWriteStream('input.txt.gz'));
  console.log("文件压缩完成。");
// 解压 input.txt.gz 文件为 input.txt
// fs.createReadStream('input.txt.gz')
// .pipe(zlib.createGunzip())
// .pipe(fs.createWriteStream('input.txt'));
// console.log("文件解压完成。");
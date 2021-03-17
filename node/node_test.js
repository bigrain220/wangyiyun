var fs = require('fs');
var http = require('http');

var userData="";
// 读文件
fs.readFile('../file/file1.txt','utf-8', function (error, data) {
    // console.log(data.toString())
    userData=data.toString();
})
fs.writeFile('../file/file2.txt','i am ironman',function(error){
    // console.log(error)
})

var server = http.createServer();

server.on('request',function(request,response){
    let url = request.url
    console.log('收到客户端的请求了，请求路径是:'+url.toString());

    response.write('hello');
    response.write('world');
    response.write(userData);
    response.end();
});
server.listen(3000,function(){
    console.log('服务器启动成功，可通过http://127.0.0.1:3000 来访问');
});
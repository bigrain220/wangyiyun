//  全局安装，不然路径有问题 npm install nodemon -g
//  CMD运行 nodemon start.js
//  全局安装 npm install concurrently -g 然后可以运行package.json中的指令

const app = require('./http')
const dataAll = require('./data/index')
const bodyParser = require('body-parser')

// 添加json解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
//热更新
var debug = require('debug')('my-application'); // debug模块
app.set('port', process.env.PORT || 3000); // 设定监听端口

function request(methods, url, data) {
  const method = methods.toLowerCase();
  let options = {
    get() {
      return app.get(url, (req, res) => {
        //console.log(req.query)
        res.status(200)
        res.json(data)
      })
    },
    post() {
      return app.post(url, (req, res) => {
        //console.log(req.body)
        res.status(200)
        res.json(data)
      })
    }
  }
  try {
    return options[method]();
  } catch (error) {
    throw new Error(methods + " is not defined in methods!")
  }
}

Object.keys(dataAll).map(item => {
  request(dataAll[item].methods, item, dataAll[item].data)
})

//启动监听
var server = app.listen(app.get('port'), function () {
  debug('Express server listening on port ' + server.address().port);
});
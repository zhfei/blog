var express = require('express')
var fs = require('fs')
var path = require('path')
var bodyParser = require('body-parser')
var router = require('./router')
var session = require('express-session')
var topicRouter = require('./routers/topic')
require('./models_mysql/base/creat_table')
require('./models_mysql/user_db')

var app = express()


//1.配置模板引擎
app.engine('html', require('express-art-template'))

//2.设置模板查询views目录
app.set('views', path.join(__dirname, './views/'))

//3.放开public目录资源
app.use('/public/', express.static(path.join(__dirname,'./public/')))
app.use('/node_modules/', express.static(path.join(__dirname,'./node_modules/')))

//4.配置post请求解析
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//5.创建会话session， 通过这个插件可以为req对象添加一个req.session对象
app.use(session({
    //在内部加密算法的基础上，再追加一个自定义字符串，增加破解难度，更安全
    secret: 'bluesky',
    resave: false,
    //true: 当用户浏览这个域名时，无论是否往session中保存信息，都会创建一个cookie，分配一把钥匙
    saveUninitialized: false
}))

//6.挂载路由容器
app.use(router)
app.use(topicRouter)

//7.配置统一404处理中间件
app.use(function (req, res) {
    res.render('404.html')
})

//8.配置全局错误处理中间件
app.use(function (err, req, res, next) {
    console.log(err)
    res.status(500).json({
        err_code:500,
        message:err.message
    })
})

app.listen(3000, function () {
    console.log('server start...')
})
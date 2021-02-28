var express = require('express')
var router = express.Router()

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blog', {useNewUrlParser: true, useUnifiedTopology: true});
var User = require('./models/user')
var TopicModel = require('./models/topic')
let UserDB = require('./models_mysql/user_db')
let TopicDB = require('./models_mysql/topic_db')


var md5 = require('blueimp-md5')


router.get('/', function (req, res, next) {
    //req.session.user 进入主页时，验证会话是否登录

    TopicDB.findAndSort({
        updated_time:'desc'
    } ,function (err, topics) {

        if (err) {
            return next(err)
        } else {
            res.render('index.html',{
                user:req.session.user,
                topics:topics
            })
        }
    })

})

router.get('/login', function (req, res) {
    res.render('login.html', {
        name:"商品列表"
    })
})

router.post('/login', function (req, res, next) {
    console.log(req.body)
    var body = req.body


    UserDB.findOne({
        email:body.email,
        password:md5(md5(body.password))
    },function (err, user) {
        if (err) {
            // return res.status(500).json({
            //     err_code:500,
            //     message:err.message
            // })
            //使用全局报错处理中间件处理
            return next(err)
        } else {
            if (user){
                req.session.user = user

                return res.status(200).json({
                    err_code:0,
                    message:'success'
                })
            } else {
                return res.status(200).json({
                    err_code:1,
                    message:'Email or Password is fail'
                })
            }
        }
    })
})

router.get('/register', function (req, res) {
    res.render('register.html', {
        name:"商品列表"
    })
})

// router.post('/register', function (req, res) {
//     res.render('register.html',{
//         message:'邮箱或昵称重复',
//         formData:req.body
//     })
// })

router.post('/register', function (req, res, next) {
    console.log(req.body)
    var body = req.body

    //md5重复加密，防止暴力破解
    body.password =  md5(md5(body.password))


    UserDB.findOne({
        email:body.email,
        nickname:body.nickname
    },function (err, data) {

        if (err) {
            //res.json(),底部将json对象转成字符串并发送
            //替换res.status(500).send(JSON.stringify({err_code:400}))
            // return res.status(500).json({
            //     err_code:500,
            //     message:err.message
            // })

            //使用全局报错处理中间件处理
            return next(err)

        } else  {
            if (data) {
                if (data.email === body.email) {
                    return res.status(200).json({
                        err_code:1,
                        message:'Email is exist'
                    })
                } else {
                    return res.status(200).json({
                        err_code:2,
                        message:'Nickname is exist'
                    })
                }

            } else {

                UserDB.save(body,function (err,user) {

                    if (err) {
                        // return res.status(500).json({
                        //     err_code:500,
                        //     message:'Server error'
                        // })

                        //使用全局报错处理中间件处理
                        return next(err)
                    } else {

                        //服务端创建session记录用户的状态, 同时返回客户端cookie
                        req.session.user = user

                        return res.status(200).json({
                            err_code:0,
                            message:'success'
                        })

                        //异步请求，服务器重定向无效
                        //res.redirect('/')
                    }
                })
            }
        }
    })

})

router.get('/logout', function (req, res) {
    //清除登录状态
    req.session.user = null
    //重定向到登录页面
    res.redirect('/login')
})


router.get('/settings/admin', function (req, res) {
    res.render('./settings/admin.html',{
        user:req.session.user
    })
})

router.get('/settings/profile', function (req, res) {
    res.render('./settings/profile.html',{
        user:req.session.user
    })
})




module.exports = router
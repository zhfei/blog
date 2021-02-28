//路由分类
//存放 增加话题，删除话题，修改话题，查询话题，查询话题列表等路由

var express = require('express')
var TopicModel = require('../models/topic')
let TopicDB = require('../models_mysql/topic_db')
let ReplayDB = require('../models_mysql/replay_db')
var ObjectId = require('mongodb').ObjectId

var router = express.Router()

router.get('/topic/new', function (req, res) {
    console.log(req.query)

    res.render('./topic/new.html',{
        user:req.session.user
    })
})

router.post('/topic/new', function (req, res, next) {
    TopicDB.save(req.body,function (err, topic) {
        if (err) {
            return next(err)
        } else {
            console.log(topic)
            res.status(200).json({
                err_code:0,
                message:'success'
            })
        }
    })
})

router.get('/topics/show', function (req, res, next) {
    TopicDB.findOne({
        id:req.query.id
    }, function (err, topic) {
        if (err) {
            return next(err)
        }

        res.render('./topic/show.html',{
            user:req.session.user,
            topic:topic
        })
    })


})

router.post('/topic/add_replay', function (req, res, next) {
    var body = req.body

    //保存评论信息
    ReplayDB.save(body,function (err, replay) {
        console.log("err: ",err)
        console.log("replay: ",replay)

        if (err) {
            return next(err)
        }
        //查询文章信息
        TopicDB.findOne({
            id:body.topicId
        },function (err, topic) {
            if (err) {
                return next(err)
            }
            //更新文章信息
            let replaystr = topic.replies + '|' + String(replay.insertId)
            TopicDB.update({
                id:body.topicId
            },{
                replies:replaystr
            },function (err,result) {
                if (err) {
                    return next(err)
                }
                res.status(200).json({
                    err_code:0,
                    message:"success"
                })
            })
        })

    })

})



module.exports = router
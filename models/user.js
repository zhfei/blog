var mongoose = require('mongoose')

var Schema = mongoose.Schema

var userSchema = new Schema({
    email:{
        type:String,
        required:true,
    },
    nickname:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    created_time:{
        type:Date,
        //这里设置了方法Date.now， 而不是调用Date.now()方法，如果使用now()会让值固定
        default:Date.now
    },
    last_modified_time:{
        type:Date,
        default:Date.now
    },
    birthday:{
        type:Date
    },
    avatar:{
        type:String,
        //头像
        default:'/public/img/avatar-default.png',
    },
    bio:{
        type:String,
        //个人简介
        default:'',
    },
    gender:{
        type:Number,
        //性别
        enum:[-1, 0, 1],
        default:-1
    },
    status:{
        type:Number,
        //状态
        //0 无限制，正常
        //1 限制评论
        //2 限制登录，封号
        enum:[0, 1,2],
        default:0
    }
})

var User = mongoose.model('User', userSchema)

//导出Model
module.exports = User
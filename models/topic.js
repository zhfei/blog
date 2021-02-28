var mongoose = require('mongoose')

var Schema = mongoose.Schema

var replaySchema = new Schema({
    reply_email:{
        type:String,
        required:true,
    },
    reply_nickname:{
        type:String,
        required:true,
    },
    reply_content:{
        type:String,
        required:true,
    },
    reply_time:{
        type:Date,
        default:Date.now
    }
})


var topicSchema = new Schema({
    email:{
        type:String,
        required:true,
    },
    nickname:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
        //头像
        default:'/public/img/avatar-default.png',
    },
    plate:{
        type:Number,
        required:true,
        default:0
    },
    title:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    created_time:{
        type:Date,
        default:Date.now
    },
    replies:[ { type: mongoose.Schema.Types.ObjectId, ref: 'replaySchema' } ],
    followers :{
        type:Number,
        default:0
    },
    browsers:{
        type:Number,
        default:0
    },

})

var topicModel = mongoose.model('Topic',topicSchema)
module.exports = topicModel
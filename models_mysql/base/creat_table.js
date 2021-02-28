let sql = require('./init')

//创建用户表
let createUserTable = `CREATE TABLE IF NOT EXISTS \`user\`(
   \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增id',
   \`email\` VARCHAR(100) NOT NULL COMMENT '邮箱地址',
   \`nickname\` VARCHAR(100) NOT NULL COMMENT '昵称',
   \`password\` VARCHAR(100) NOT NULL COMMENT '密码',
   \`avatar\` VARCHAR(100) NOT NULL DEFAULT '/public/img/avatar-default.png' COMMENT '头像',
   \`bio\` VARCHAR(255) NOT NULL DEFAULT ''  COMMENT '个人简介',
   \`gender\` INT NOT NULL DEFAULT -1 COMMENT '性别',
   \`status\` INT NOT NULL DEFAULT -1 COMMENT '账号状态',
   \`birthday\` TIMESTAMP COMMENT '生日',
   \`created_time\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
   \`last_modified_time\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
   PRIMARY KEY ( \`id\` )
)ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT '用户表';`

sql.do(createUserTable, function (error, results, fields) {
    if (error) {
        console.log(error)
    } else {
        console.log('创建用户表成功');
    }
})

//创建文章表
let createTopicTable = `CREATE TABLE IF NOT EXISTS \`topic\`(
   \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增id',
   \`email\` VARCHAR(100) NOT NULL COMMENT '邮箱地址',
   \`nickname\` VARCHAR(100) NOT NULL COMMENT '昵称',
   \`avatar\` VARCHAR(100) NOT NULL DEFAULT '/public/img/avatar-default.png' COMMENT '头像',
   \`title\` VARCHAR(100) NOT NULL COMMENT '文章标题',
   \`plate\` INT NOT NULL DEFAULT '0' COMMENT '平台',
   \`content\` VARCHAR(255) NOT NULL DEFAULT ''  COMMENT '文章内容',
   \`followers\` INT NOT NULL DEFAULT '0' COMMENT '评论个数',
   \`browsers\` INT NOT NULL  DEFAULT '0' COMMENT '浏览个数',
   \`replies\` VARCHAR(255) NOT NULL DEFAULT '' COMMENT '回复对象id数组',
   \`created_time\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
   \`updated_time\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
   PRIMARY KEY ( \`id\` )
)ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT '文章表';`

sql.do(createTopicTable, function (error, results, fields) {
    if (error) {
        console.log(error)
    } else {
        console.log('创建文章表成功 ');
    }
})

//创建评论表
let createReplayTable = `CREATE TABLE IF NOT EXISTS \`replay\`(
   \`id\` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '自增id',
   \`topicId\` VARCHAR(100) NOT NULL DEFAULT '' COMMENT '文章id',
   \`replyEmail\` VARCHAR(100) NOT NULL DEFAULT '' COMMENT '邮箱地址',
   \`replyNickname\` VARCHAR(100) NOT NULL DEFAULT '' COMMENT '昵称',
   \`replyContent\` VARCHAR(255) NOT NULL DEFAULT ''  COMMENT '文章内容',
   \`replyTime\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
   PRIMARY KEY ( \`id\` )
)ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8 COMMENT '评论表';`

sql.do(createReplayTable, function (error, results, fields) {
    if (error) {
        console.log(error)
    } else {
        console.log('创建评论表成功 ');
    }
})


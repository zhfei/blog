let db = require('./base/utility_db')

let table_name = 'user'

//增
function save(condition,callback) {
    console.log(condition)
    db.save(table_name,condition,function (err, results) {
        if (err) {
            return callback(err)
        } else {
            callback(err,results)
        }
    })
}

//删
//条件种类比较多，由外部拼好传入
function deleteOneAndMany(condition,callback) {
    db.deleteOneAndMany(table_name,condition,function (err, results) {
        if (err) {
            return callback(err)
        } else {
            callback(err,results)
        }
    })
}

//改
function update(condition_where, condition_value,callback) {
    db.update(table_name,condition_where, condition_value,function (err, results) {
        if (err) {
            return callback(err)
        } else {
            callback(err,results)
        }
    })
}


//查
function find(callback) {
    db.find(table_name,condition,function (err, results) {
        if (err) {
            return callback(err)
        } else {
            callback(err,results)
        }
    })
}

function findAndSort(sort_condition, callback) {
    //ASC: 升序， DESC：降序
    db.findAndSort(table_name, sort_condition,function (err, results) {
        if (err) {
            return callback(err)
        } else {
            callback(err,results)
        }
    })
}

function findOne(condition, callback) {
    db.findOne(table_name,condition,function (err, result) {
        if (err) {
            return callback(err)
        } else {
            callback(err,result)
        }
    })
}


exports.save = save
exports.deleteOneAndMany = deleteOneAndMany
exports.update = update
exports.find = find
exports.findAndSort = findAndSort
exports.findOne = findOne




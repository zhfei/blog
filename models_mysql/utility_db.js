let sql = require('./init')


//增
function save(table_name, condition,callback) {
    var keystr = ''
    var valuestr = ''
    for (let key in condition) {
        let value = condition[key]
        keystr += (key + ',')
        valuestr += ( ' "'+value+'" ' + ',')
    }

    keystr = keystr.substring(0, keystr.length-1)
    valuestr = valuestr.substring(0, valuestr.length-1)

    let sqlstr = 'INSERT INTO '+ table_name +' (' +
        keystr + ') VALUES (' + valuestr +')';

    console.log(sqlstr)
    sql.do(sqlstr,function (err, results) {
        callback(err,results)
    })
}
//删
//条件种类比较多，由外部拼好传入
function deleteOneAndMany(table_name, condition,callback) {
    var keystr = ''
    for (let key in condition) {
        let value = condition[key]
        keystr += (key + '=' +' "'+value +'" '+ ' and ')
    }
    keystr = keystr.substring(0, keystr.length-1)

    let sqlstr = 'delete from ' + table_name + ' where ' + keystr

    sql.do(sqlstr,function (err, results) {
        callback(err,results)
    })
}

//改
function update(table_name, condition,callback) {
    var keystr = ''
    for (let key in condition) {
        let value = condition[key]
        keystr += (key + '=' +' "'+value +'" '+ ',')
    }
    keystr = keystr.substring(0, keystr.length-1)

    let sqlstr = 'upate ' + table_name + ' set ' + condition


    sql.do(sqlstr,function (err, results) {
        callback(err,results)
    })
}


//查
function find(table_name, callback) {
    let sqlstr = `select * from `+ table_name

    sql.do(sqlstr,function (err, results) {
        callback(err,results)
    })
}

function findOne(table_name, condition, callback) {
    var keystr = ''
    for (let key in condition) {
        let value = condition[key]
        keystr += (' '+ key + '=' +' "'+value +'" '+ 'and')
    }
    keystr = keystr.substring(0, keystr.length-3)

    let sqlstr = 'select * from '+ table_name +' where ' + keystr + ' limit 1'

    sql.do(sqlstr,function (err, results) {
        if (results.length > 0) {
            callback(err,results[0])
        } else {
            callback(err)
        }
    })
}

exports.save = save
exports.deleteOneAndMany = deleteOneAndMany
exports.update = update
exports.find = find
exports.findOne = findOne
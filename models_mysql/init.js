let mysql      = require('mysql');
let env = {
    host     : 'localhost',
    user     : 'root',
    password : 'root123456',
    database : 'User'
};

//1.创建连接池
let pool =mysql.createPool(env);

exports.do = function (sql, callback){
    this.getConnection(function (err, connection){
        console.log('sql: ',sql)
        connection.query(sql, function (){

            callback.apply(connection, arguments);

            connection.release();

        });

    })

}.bind(pool)

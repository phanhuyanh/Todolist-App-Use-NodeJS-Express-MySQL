const mysql = require('mysql')

const connect = mysql.createConnection({
    host: 'remotemysql.com',
    user: 'GRvvMThAho',
    password: 'CKzBSZUGP3',
    database: 'GRvvMThAho',
    port: '3306'
})

connect.connect(function(err) {
    if(err) console.log(`error connect: ${err.stack}`)
    console.log(`Connect database success`)
})

module.exports = connect
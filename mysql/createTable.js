const mysql = require('mysql')
const connect = require('./connect')

var sql = `CREATE TABLE IF NOT EXISTS todo (
    id int auto_increment primary key,
    name varchar(255) not null,
    state varchar(255) not null
)`

connect.query(sql, function(err, results) {
    if(err) console.log(`create table error: ${err}`)
    console.log(`create table success`)
})
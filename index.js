const express = require('express')
const app = express()
const connect = require('./mysql/connect')
require('./mysql/createTable')

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.use(express.urlencoded())
app.use('/public', express.static('public'))

var list = []

app.get('/', function(req, res) {
    var sql = `select * from todo`
    connect.query(sql, function(err, results) {
        if(err) {
            console.log('index.js::16')
            throw err
        }
        list = results
        res.render('index', {list: list})
    })
})

app.post('/', function(req, res) {
    if(res.body == undefined) res.redirect('/')
    var todo = req.body.todo || ''
    var sql = `insert into todo (name, state) values('${todo}', 'active')`
    connect.query(sql, function(err, results) {
        if(err) {
            console.log('index.js::33')
            throw err
        }
        list.push({name: todo, id: results.insertId, state: 'active'})
    })
    res.redirect('/')
})

app.post('/del', function(req, res) {
    var id = req.body.id
    if(id == undefined) res.redirect('/')

    var sql = `delete from todo where id = '${id}'`
    connect.query(sql, function(err, results) {
        if(err) {
            console.log(`err index.js::49`)
            throw err
        }
        console.log(`delete success`)
    })
    res.redirect('/')
})

app.post('/updateState', function(req, res) {
    var state = req.body.state
    var id = req.body.id
    if(id == undefined) res.redirect('/')

    var sql = `update todo set state = '${state == 'active' ? 'inactive' : 'active'}' where id = '${id}'`
    connect.query(sql, function(err, results) {
        if(err) {
            console.log(`err index.js::65`)
            throw err
        }
        console.log('update state success')
    })

    res.redirect('/')
})

app.listen(4000, () => console.log(`Server is running at http://localhost:4000`))
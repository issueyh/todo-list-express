// 載入 express 
const express = require('express')
const mongoose = require('mongoose') // 載入 mongoose
const exphbs = require('express-handlebars')
const app = express() //建構應用程式伺服器
mongoose.connect('mongodb://localhost/todo-list', { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB，過渡期時 MongoDB 透過 DeprecationWarning 發出警告，需調整程式

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
    console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
    console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// 設定首頁路由
app.get('/', (req, res) => {
    res.render('index')
})

// 設定 port 3000
app.listen(3000, () => {
    console.log('App is running on http://localhost:3000')
})
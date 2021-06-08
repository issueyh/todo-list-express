// 載入 express 
const express = require('express')
const mongoose = require('mongoose') // 載入 mongoose
const exphbs = require('express-handlebars')
const Todo = require('./models/todo') // 載入 Todo model
const bodyParser = require('body-parser') // 引用 body-parser
const methodOverride = require('method-override')
const routes = require('./routes') // 引用路由器

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

app.use(express.urlencoded({ extended: true })) // 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(methodOverride('_method')) // 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(routes) // 將 request 導入路由器




// 設定 port 3000
app.listen(3000, () => {
    console.log('App is running on http://localhost:3000')
})
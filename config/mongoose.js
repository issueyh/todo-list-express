const mongoose = require('mongoose') // 載入 mongoose

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/todo-list'

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB，過渡期時 MongoDB 透過 DeprecationWarning 發出警告，需調整程式

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

module.exports = db
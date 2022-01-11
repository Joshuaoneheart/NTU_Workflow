const express = require('express');
const expressGraphQL = require('express-graphql');
const session = require('express-session');
const passport = require('passport');
const schema = require('./schema');

// 建立一個 express app
const app = express();

// 設定 session ，會解析 client 所帶來的 cookie (通常只有 session id) ，
// 然後從資料庫 (沒有設定就預設記憶體) 比對 session id 是否合法
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: 'aaabbbccc'
  })
);

// 將 passport 以 middleware 方式導入 app ，每當 request 進來就會檢查 request.session
// 並從中解析出 user 並放到 'req.user' 中
app.use(passport.initialize());
app.use(passport.session());

app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log('Listening');
});


var express = require('express');
var app = express();

var indexRouter = require('./routes/index');
var accountsRouter = require('./routes/account');
var permission = require('./permission')

var bodyParser = require('body-parser');

const expressSession = require('express-session');

// 使用express-session
app.use(expressSession({
    secret: 'secret hello world',// cookie签名 这个属性是必须的 具体配置和`cookie-parser`一样
    saveUninitialized: true, // 是否自动初始化 默认为true
    resave: false,// 当用户session无变化的时候依然自动保存
    cookie: { // cookie的信息具体操作和`cookie-parser`一样
        maxAge: 30 * 60 * 1000// 30分钟后过期
    },
    rolling: true// 每次请求的时候覆写cookie
}))


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());


//静态资源路由
app.use(permission.staticAccess, express.static('static'));

//路由
app.use('/account', accountsRouter);
app.use('/', permission.accessValid, indexRouter);




app.listen(10000);
console.log('listen to port 10000');

var express = require('express');
var router = express.Router();
var path = require('path');
var query = require("../db");
var UserSql = require("../sql/UserSql");

class MyResponse {
    constructor(success, msg) {
        this.success = success;
        this.message = msg;
    }
}

//Routers
router.get('/login', function (req, res, next) {
    res.sendFile(path.resolve(__dirname, '../static', "html/login.html"));
})
router.get('/register', function (req, res, next) {
    res.sendFile(path.resolve(__dirname, '../static', "html/register.html"));
})
router.get('/code', function (req, res, next) {//验证码
    var captcha = require("../validCode").getCode()
    req.session.captcha = captcha.text.toLowerCase();
    res.send(new MyResponse(true, captcha.data));
})

//Apis
router.post('/login', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var validCode = req.body.validCode;
    var isValid = formatValid(username, password);
    if (!isValid.success) { res.send(isValid); return; }
    if (validCode == null || validCode.toLowerCase() != req.session.captcha) {
        res.send(new MyResponse(false, "无效的验证码！")); return;
    }
    var md5String = require('crypto').createHash('md5').update(password).digest('hex'); // md5加密
    query.query(UserSql.queryByNameAndPwd, [username, md5String], function (err, result) {
        if (result.length != 0) {
            req.session.username = username;
            res.send(new MyResponse(true, null));
        }
        else {
            res.send(new MyResponse(false, "用户名或密码错误"));
        }
    });
});

router.post('/register', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var isValid = formatValid(username, password);
    if (!isValid.success) { res.send(isValid); return; }
    query.query(UserSql.queryByName, [username], function (err, result) {
        if (result.length == 0) {
            var md5String = require('crypto').createHash('md5').update(password).digest('hex'); // md5
            query.query(UserSql.insertNewUser, [username, md5String], function (err, result) { });
            res.send(new MyResponse(true, "注册成功！"));
        } else {
            res.send(new MyResponse(false, "用户名已存在！"));
        }
    });
})

//private func
function formatValid(username, password) {
    if (username == null || password == null || username.trim() == "" || password.trim() == "") {
        return new MyResponse(false, "用户名或密码不能为空！");
    }
    var uPattern = /^[a-zA-Z0-9_-]{4,16}$/; //字母数字下划线和减号
    if (!uPattern.test(username)) {
        return new MyResponse(false, "无效的用户名！");
    }
    //密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字
    var pPattern = /^.*(?=.{8,16})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/;
    if (!pPattern.test(password)) {
        return new MyResponse(false, "无效的密码！");
    }
    return new MyResponse(true, null);
}

//export
module.exports = router;
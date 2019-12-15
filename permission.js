var accessValid = function (req, res, next) {
    if (req.session.username) {
        next();
    } else {
        res.redirect('/account/login');
    }
};


var staticAccess = function (req, res, next) {
    var suffix = /(\.html)$/g;//禁止访问的后缀格式指定
    if (suffix.test(req.path)) {
        console.log('请求非法后缀');
        return res.send('<h style="color:red">FBI warning!!!!</h>');
    } else {
        next();
    }
};

module.exports = {
    accessValid,
    staticAccess
}
var svgCaptcha = require('svg-captcha');

exports.getCode = () => {
    var codeConfig = {
        size: 5,// 验证码长度
        ignoreChars: '0o1i', // 验证码字符中排除 0o1i
        noise: 2, // 干扰线条的数量
        height: 45,
        width: 120,
        fontSize: 40
    }
    return svgCaptcha.create(codeConfig);
}
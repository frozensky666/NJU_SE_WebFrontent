//Common functions for register and login
import { hex_md5 } from "./md5.js"
class MyResponse {
    constructor(success, msg) {
        this.success = success;
        this.message = msg;
    }
}

function uformatValid(username) {
    if (username == null || username.trim() == "") {
        return new MyResponse(false, "用户名不能为空！");
    }
    if (username.length < 4) return new MyResponse(false, "用户名过短（4-16位）");
    if (username.length > 16) return new MyResponse(false, "用户名过长（4-16位）");
    var uPattern = /^[a-zA-Z0-9_-]{4,16}$/; //字母数字下划线和减号
    if (!uPattern.test(username)) {
        return new MyResponse(false, "用户名只能包含字母、数字、下划线和短横线");
    }
    return new MyResponse(true, null);
}

function pformatValid(password) {
    if (password == null || password.trim() == "") {
        return new MyResponse(false, "密码不能为空！");
    }
    if (password.length < 8) return new MyResponse(false, "密码过短（8-16位）");
    if (password.length > 16) return new MyResponse(false, "密码过长（8-16位）");
    //密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字
    var pPattern = /^.*(?=.{8,16})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/;
    if (!pPattern.test(password)) {
        return new MyResponse(false, "密码必须包含大小写字母和数字！");
    }
    return new MyResponse(true, null);
}

function encrypt(password) {
    let salt = "frozensky";
    return hex_md5(salt[2] + salt[7] + password + salt[3]);
}

export { uformatValid, pformatValid, encrypt }
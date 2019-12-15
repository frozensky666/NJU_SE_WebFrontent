import { ajax } from './ajax.js';
import { encrypt } from "./common.js"

codeRefresh();

document.getElementById('loginbtn').addEventListener('click', (event) => login());

document.getElementById('code-refresh').addEventListener('click', (event) => codeRefresh());

function login() {
    let dataObj = {
        'username': document.getElementById("username").value,
        'password': document.getElementById("password").value,
        'validCode': document.getElementById("code").value
    };
    if (dataObj.username == null || dataObj.username == "") {
        alert("用户名不能为空！"); return;
    } else if (dataObj.password == null || dataObj.password == "") {
        alert("密码不能为空！"); return;
    } else if (dataObj.validCode == null || dataObj.validCode == "") {
        alert("验证码不能为空！"); return;
    }
    dataObj.password = encrypt(dataObj.password);
    ajax('post', '/account/login', dataObj, function (res) {
        if (res.success) {
            window.location = "/";
        } else {
            alert(res.message);
        }
    }, true);
}

function codeRefresh() {
    ajax('get', '/account/code', null, (res) => {
        document.getElementById("code-embed").innerHTML = res.message;
    }, true)
}
import { pformatValid, uformatValid, encrypt } from "./common.js"
import { ajax } from './ajax.js';

function paformatValid() {
    return document.getElementById("password").value == document.getElementById("password_again").value;
}
function checkAll() {
    var isValid = uformatValid(document.getElementById('username').value);
    if (!isValid.success) { document.getElementById("info").innerHTML = isValid.message; return false; }
    isValid = pformatValid(document.getElementById('password').value);
    if (!isValid.success) { document.getElementById("info").innerHTML = isValid.message; return false; }
    if (!paformatValid()) { document.getElementById("info").innerHTML = "密码不一致"; return false; }
    document.getElementById("info").innerHTML = ""; return true;
}

document.getElementById('username').addEventListener('keyup', function (event) {
    var isValid = uformatValid(document.getElementById('username').value);
    if (!isValid.success) { document.getElementById("info").innerHTML = isValid.message; return; }
    document.getElementById("info").innerHTML = "";
});

document.getElementById('password').addEventListener('keyup', function (event) {
    var isValid = uformatValid(document.getElementById('username').value);
    if (!isValid.success) { document.getElementById("info").innerHTML = isValid.message; return; }
    isValid = pformatValid(document.getElementById('password').value);
    if (!isValid.success) { document.getElementById("info").innerHTML = isValid.message; return; }
    document.getElementById("info").innerHTML = "";
});

document.getElementById('password_again').addEventListener('keyup', function (event) {
    checkAll();
});

document.getElementById('loginbtn').addEventListener('click', function (event) {
    if (checkAll()) {
        let dataObj = {
            'username': document.getElementById("username").value,
            'password': encrypt(document.getElementById("password").value)
        };
        ajax('post', '/account/register', dataObj, function (res) {
            if (res.success) {
                confirm("注册成功！") && (window.location = '/account/login');
            } else {
                alert(res.message);
            }
        }, true);
    }
});


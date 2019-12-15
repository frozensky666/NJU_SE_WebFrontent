import { ajax } from './ajax.js';

codeRefresh();

document.getElementById('loginbtn').addEventListener('click', (event) => login());

document.getElementById('code-refresh').addEventListener('click', (event) => codeRefresh());

function login() {
    let dataObj = {
        'username': document.getElementById("username").value,
        'password': document.getElementById("password").value,
        'validCode': document.getElementById("code").value
    };
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
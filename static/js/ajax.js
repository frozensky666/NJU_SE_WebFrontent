function createXHR() {
    if (typeof XMLHttpRequest !== 'undefined') {
        return new XMLHttpRequest();
    } else if (typeof ActiveXObject !== 'undefined') {
        // 支持IE7之前的版本
        if (typeof arguments.callee.activeXString !== 'string') {
            var versions = ['MSXML2.XMLHttp.6.0', 'MSXML2.XMLHttp.3.0', 'MSXML2.XMLHttp'];
            for (var i = 0; i < versions.length; i++) {
                try {
                    new ActiveXObject(versions[i]);
                    arguments.callee.activeXString = versions[i];
                    break;
                } catch (e) {
                    //
                }
            }
        }
        return new ActiveXObject(arguments.callee.activeXString);
    } else {
        throw new Error("No XHR Object available!");
    }
}


/**
 *
 * @param type 请求类型：get,post,...
 * @param url
 * @param dataObj 请求参数：对象字面量{key:value,...}
 * @param callback
 * @param async 是否异步
 */
function ajax(type, url, dataObj, callback, async) {
    var paramsStr = buildParamsStr(dataObj), xhr = null;
    if (type === 'get' && dataObj) {
        url = addURLParams(url, paramsStr);
    }
    xhr = createXHR();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var status = xhr.status;
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                // console.log(xhr.responseText);
                callback && callback(JSON.parse(xhr.responseText));
            } else {
                console.log("请求异常！状态码：" + xhr.status);
            }
        }
    };
    xhr.open(type, url, async); // open()方法启动一个请求以备发送；
    if (type == 'get') {
        xhr.send(null);
    } else {
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        xhr.send(paramsStr);
    }
}

function buildParamsStr(paramsObj) {
    var str = '';
    for (let key in paramsObj) {
        // 排除原型中属性
        if (paramsObj.hasOwnProperty(key)) {
            // 对查询字符串中每个参数名称和值用encdoeURIComponent()进行编码
            str += "&" + encodeURIComponent(key) + "=" + encodeURIComponent(paramsObj[key]);
        }
    }
    return str.slice(1);
}
function addURLParams(url, paramsStr) {
    url += (url.indexOf('?') === -1) ? '?' : '&';
    url += paramsStr + '&' + new Date().getTime();
    return url;
}


export { ajax }
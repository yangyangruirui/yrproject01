$.ajaxPrefilter(function(options) {
    // console.log(options.url);
    options.url = "http://www.liulongbin.top:3007" + options.url;
    //统一为有权限的请求设置headers请求头
    if (options.url.indexOf('/my') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token')
        }
    }

    //统一验证身份信息
    //无论请求成功还说失败，ajax请求都会调用complete函数
    options.complete = function(res) {
        // console.log(res);
        //如果返回的responseJSON 身份认证失败 就直接跳转回登录界面。
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            //清空token
            localStorage.removeItem('token');
            location.href = "login.html";
        }
    }

})
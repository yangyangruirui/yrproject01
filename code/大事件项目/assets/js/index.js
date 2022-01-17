$(function() {
        var layer = layui.layer;
        getuserInfo();
        //点击退出按钮
        $('.logout').on('click', function() {
            layer.confirm('确定退出?', { icon: 3, title: '提示' }, function(index) {
                //do something
                //清空本地存储的token
                localStorage.removeItem('token');
                //跳转至登录页面
                location.href = "login.html";
                //关闭弹出框
                layer.close(index);
            });
        })
    })
    //获取基本信息
function getuserInfo() {
    var layer = layui.layer;
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        //设置请求头
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg("获取信息失败！");
            }
            console.log(res);
            //渲染用户信息到界面
            renderMes(res.data);
        },
        //无论请求成功还说失败，ajax请求都会调用complete函数
        // complete: function(res) {
        //     // console.log(res);
        //     //如果返回的responseJSON 身份认证失败 就直接跳转回登录界面。
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
        //         //清空token
        //         localStorage.removeItem('token');
        //         location.href = "login.html";
        //     }
        // }
    })
}
//渲染用户信息到界面
function renderMes(user) {
    //获取用户名
    var name = user.nickname || user.username;
    $('.name').html("欢迎&nbsp&nbsp" + name);
    //获取图片头像。
    //没有图片就将昵称的首字母提出来，如果是英文即转为大写
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.fontbg').hide();
    } else {
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.fontbg').html(first).show();
    }

}
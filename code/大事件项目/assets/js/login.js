$(function() {
    // 点击去注册
    $('#goreg').click(function() {
        $('#login-box').hide();
        $('#reg-box').show();
    });

    // 点击去登录
    $('#gologin').click(function() {
        $('#login-box').show();
        $('#reg-box').hide();
    })

    //自定义验证规则
    var form = layui.form;
    //自定义弹窗消息
    var layer = layui.layer;
    form.verify({
            //定义密码验证规则
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            repwd: function(value) {
                var pwdval = $("#pwd").val();
                if (pwdval !== value) {
                    return "两次输入的密码不一致！";
                }
            }
        })
        //注册用户
    $('#register').on('submit', function(e) {
        //阻止表单默认行为
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/api/reguser",
            data: {
                username: $('#register [name = username]').val(),
                password: $('#register [name = password]').val()
            },
            success: function(res) {
                // console.log(res);
                if (res.status == 1) {
                    // console.log(res.message);
                    return layer.msg(res.message);
                } else {
                    layer.msg("注册成功，去登录");
                    $('#gologin').click();
                    // location.href = "index.html";
                }

            }
        })
    })

    //登录验证
    $('#gologin').submit(function(e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/api/login",
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status == 0) {
                    layer.msg("登录成功");
                    //设置token
                    localStorage.setItem('token', res.token);
                    location.href = "index.html";
                } else {
                    return layer.msg(res.message);
                }
            }
        })
    })
})
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
})
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
})
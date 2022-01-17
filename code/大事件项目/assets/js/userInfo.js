$(function() {
    //自定义验证规则
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        nicname: function(value) {
            if (value.length > 6) {
                return "昵称长度必须在1～6之间"
            }
        }
    })
    getuserInfo1();
    //获取用户的基本信息
    function getuserInfo1() {
        $.ajax({
            method: "GET",
            url: "/my/userinfo",
            success: function(res) {
                // console.log(res);
                //给表单赋值 form.val('filter', object);
                form.val("userform", res.data);
            }
        })
    };

    //点击重置
    $('.reset').on('click', function(e) {
        //阻止reset的默认行为
        e.preventDefault();
        //将信息重新填入表单中
        getuserInfo1();
    })

    //监听表单的submit事件
    $('.layui-form').on('submit', function(e) {
        //阻止submit的默认行为
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg("修改失败");
                }
                console.log("cg");
                layer.msg("修改用户信息成功！")
                    //调用父元素的getuserInfo方法
                window.parent.getuserInfo();
            }
        })
    })
})
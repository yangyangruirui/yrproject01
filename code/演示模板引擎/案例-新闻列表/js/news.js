$(function(){
    getnews();
    function getnews(){
        $.ajax({
            methods:"get",
            url:"http://www.liulongbin.top:3006/api/news",
            success:function(res){
                if (res.status !==200) {
                    return alert("获取信息失败");
                }
                for (let i = 0; i < res.data.length; i++) {
                    res.data[i].tags = res.data[i].tags.split(",");
                }
                // console.log(res);
                var reshtml = template('temNews',res);
                $("#news-list").html(reshtml);
            }
        })
    }

    template.defaults.imports.dateform = function(dt){
        var date = new Date(dt);
        var y = date.getFullYear();
        var m = date.getMonth()+1;
        m = m<10?"0"+m:m;
        var d = date.getDate();
        d = d<10?"0"+d:d;
        
        var h = date.getHours()+1;
        h = h<10?"0"+h:h;
        var min = date.getMinutes();
        min = min<10?"0"+min:min;
        var s = date.getSeconds();
        s = s<10?"0"+s:s;
        return y+"-"+m+"-"+d+"&nbsp;&nbsp;"+h+":"+min+":"+s;
    }
})
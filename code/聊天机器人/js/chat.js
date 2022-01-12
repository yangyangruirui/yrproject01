$(function() {
  // 初始化右侧滚动条
  // 这个方法定义在scroll.js中
  resetui()
 
  //为发送按钮绑定鼠标点击事件
  $('#btnSend').on('click',function(){
    var text = $("#ipt").val().trim();
    if(text.length <=0){
      return $("#ipt").val('');
    }
    //如果输入了聊天内容  将内容追加到聊天区域
    $("#talk_list").append('<li class="right_word"><img src="img/person02.png" /> <span>'+text+'</span></li>');
    $("#ipt").val('');
    getmsg(text);
    //重置滚动条的位置
    resetui();

    //获取聊天机器人发送回来的信息
    function getmsg(text){
       $.ajax({
         type:"get",
         url:"http://www.liulongbin.top:3006/api/robot",
         data:{
           spoken:text
         },
         success:function(res){
            // console.log(res);
            if(res.message === "success"){
              //接收聊天消息
              var backtext = res.data.info.text;
              $("#talk_list").append('<li class="left_word"><img src="img/person01.png" /> <span>'+backtext+'</span></li>');
              //重置滚动条的位置
              resetui();
              getvoice(backtext);
            }
         }
       })
    }

    //语音播报机器人回复的消息
    function getvoice(text){
      $.ajax({
        methods:"get",
        url:"http://www.liulongbin.top:3006/api/synthesize",
        data:{
          text:text
        },
        success:function(res){
          // console.log(res);
          if (res.status == 200) {
            //播放语音
            $("#voice").attr('src',res.voiceUrl);
          }
        }
      })
    }
  })

  // 为文本框绑定 keyup 事件
  $('#ipt').on('keyup', function(e) {
    // console.log(e.keyCode)
    if (e.keyCode === 13) {
      // console.log('用户弹起了回车键')
      $('#btnSend').click()
    }
  })
  
})

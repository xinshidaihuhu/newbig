
$(function(){
    $('#gozc').on('click',function(){
        $('#enter').hide()
        $('#enroll').show()
        console.log('000');
     })
    $('#godl').on('click',function(){
        $('#enroll').hide()
        $('#enter').show()
        console.log('111');
    })
var form=layui.form
form.verify({
    pwd: [
        /^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
      ],
    repwd:function(value){
    var val=$('.cryptogram').val()
    if(val!==value){
        return '两次密码必须一致，giao'; 
    } }  
})
$('#enroll').on('submit',function(e){
   e.preventDefault()
   $.ajax({
       type:'post',
       url:'/api/reguser',
       data:{
           username:$('.ipt_username').val(),
           password:$('.cryptogram').val()
       },
       success:function(res){
           if(res.status!==0){
               return layer.msg(res.message);
           }else{
            layer.msg('注册成功，请登录')
            $('#godl').click()
           }
       }
   })
})
$('#enter').on('submit',function(e){
    e.preventDefault()
    $.ajax({
      url: '/api/login',
      method: 'POST',
      // 快速获取表单中的数据
      data: $(this).serialize(),
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg('登录失败！')
        }
        layer.msg('登录成功！')
        // 将登录成功得到的 token 字符串，保存到 localStorage 中
        localStorage.setItem('token', res.token)
        // 跳转到后台主页
        location.href = '/index.html'
       } 
})
})
})

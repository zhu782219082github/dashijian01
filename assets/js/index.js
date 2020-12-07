$(function() {
    var layer = layui.layer;
    // 调用 getUserInfo 获取用户基本信息
    getUserInfo();
  $('#btnLogout').on('click',function(){
    //   提示用户是否确认退出
    layer.confirm('确定要退出登录吗?', {icon: 3, title:'提示'}, function(index){
        //do something
        localStorage.removeItem('token')
        location.href='/login.html'
        layer.close(index);
      });
  })



// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
      // headers 就是请求头配置对象
    //   headers: {
    //     Authorization: localStorage.getItem('token') || ''
    //   },
      success: function(res) {
        if (res.status !== 0) {
          return layui.layer.msg('获取用户信息失败！')
        }
        console.log(res);
        // 调用 renderAvatar 渲染用户的头像
        renderAvatar(res.data)
      },

// 不论成功还是失败，最终都会调用 complete 回调函数
complete:function(res){
    // console.log('执行了');
    if (res.responseJSON.status===1&&res.responseJSON.message==='身份认证失败'){
        localStorage.removeItem('token')
        location.href='/login.html'
    }
}

    })
  }
// 渲染用户的头像
function renderAvatar(user) {
    // 1. 获取用户的名称
    var name = user.nickname || user.username
    // 2. 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 3. 按需渲染用户的头像
    if (user.user_pic !== null) {
      // 3.1 渲染图片头像
      $('.layui-nav-img')
        .attr('src', user.user_pic)
        .show()
      $('.text-avatar').hide()
    } else {
      // 3.2 渲染文本头像
      $('.layui-nav-img').hide()
      var first = name[0].toUpperCase()
      $('.text-avatar')
        .html(first)
        .show()
    }
  }






//结束的括号
})
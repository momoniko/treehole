//index.js
//获取应用实例

Page({
  data: {
    is_disabled:false,
    username:"",
    password:"",
  },

  signup:function(e){
    wx.navigateTo({
      url: '/pages/enroll/enroll',
    })
  },
  login:function(e){
    
    var that = this
    if(that.data.username == ''){
      wx.showModal({
        title: '提示！',
        showCancel:false,
        content:"请输入用户名",
        success:function(res){}
      })
    }else if(that.data.password == ''){
      wx.showModal({
        title: '提示！',
        showCancel:false,
        content:"请输入密码",
        success:function(res){}
      })
    }
    else{
    
      wx.request({
         url: getApp().globalData.server +'/index.php/Home/User/login',
         data:{
           phone: that.data.username,
           password: that.data.password,
         },
         method: 'post',
         header:{'content-type':"application/x-www-form-urlencoded"},
    
         success:function(res){
          
          if(res.data.error_code == 1){
            wx.showModal({
              title:'提示！',
              content:res.data.msg,
              showCancel:false,
              success(res){}
            })
         }else 
           if(res.data.error_code == 2){
             wx.showModal({
               title:'提示！',
               content: res.data.msg,
               showCancel:false,
               success(res){}
             })
           }else if(res.data.error_code == 3){
             wx.showModal({
               title:'提示！',
               content: res.data.msg,
               showCancel:false,
               success(res){}
             })
           }else if(res.data.error_code !== 0){
             wx.showModal({
               title:'提示！',
               content: '出错了呢！'+res.data.msg,
               showCancel: false,
               success(res){}
             })
           }else if(res.data.error_code == 0){
             getApp().globalData.user = res.data.data
             wx.showModal({
               title:'恭喜！',
               content:'登陆成功！',
               showCancel:false,
               success(res){},
               complete:function(res){
                 wx.reLaunch({
                   url: '/pages/square/square',
                 })
               }
             })
           }
         },
         fail:function(){
           wx.showModal({
             title:'哎呀~！',
             content: '网页不在状态呀！',
             success:function(res){
               if(res.confirm){
                 console.log('用户点击取消！')
               }else if(res.cancel){
                 console.log('用户点击取消！')
               }
                }
              })
            }
          })
    }
  },
  

 usernameInput:function(e){
  // console.log(e)
  this.data.username = e.detail.value
  //console.log(this.data.username)
 },

   /**
  * 获取登录密码
  */
 passwordInput:function(e){
   // console.log(e)
   this.data.password = e.detail.value
   //console.log(this.data.password)
  },
})
  
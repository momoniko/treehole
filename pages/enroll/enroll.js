// pages/enroll/enroll.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:"",
    phonenumber:"",
    password:"",
    passwordack:"",
  },
  signin:function(e){
    wx.navigateBack({
      delta: 1,
    })
  },

  /*
  *注册是检测各项格式 
  */
  regist:function(e){
    var that = this
    if(that.data.username == ''){
      wx.showModal({
        title:'提示！',
        content:'请填写用户名',
        showCancel:false,
        success(res){}
      })
    }else if(that.data.phonenumber==''){
      wx.showModal({
        title:'提示！',
        content:'请填写正确的手机号',
        showCancel:false,
        success(res){}
      })
    }else if(that.data.password==''){
      wx.showModal({
        title:'提示！',
        content:'请输入密码',
        showCancel:false,
        success(res){}
      })
    }else if(that.data.passwordack!=that.data.password){
      wx.showModal({
        title:'提示！',
        content:'输入密码不一致',
        showCancel:false,
        success(res){}
      })
    }else{
      wx.request({
        url: getApp().globalData.server +'/index.php/Home/User/sign',
        data:{
          username:that.data.username,
          phone: that.data.phonenumber,
          password: that.data.password,
          password_again: that.data.passwordack,
          face_url: '/image/喜爱.png',
        },
        method: 'post',
        header:{'content-type':"application/x-www-form-urlencoded"},

        success(res){
          console.log(res.data)
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
              content: '手机号已被注册',
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
              content:'注册成功！',
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
  /**
   * 获取输入名称 
   */
  usernameInput:function(e){
   // console.log(e)
   this.data.username = e.detail.value
   //console.log(this.data.username)
  },
   /**
   * 获取手机号
   */
  phonenumberInput:function(e){
    // console.log(e)
    this.data.phonenumber = e.detail.value
    //console.log(this.data.phonenumber)
   },
    /**
   * 获取登录密码
   */
  passwordInput:function(e){
    // console.log(e)
    this.data.password = e.detail.value
    //console.log(this.data.password)
   },
    /**
   * 获取确认密码
   */
  passwordInputAck:function(e){
    // console.log(e)
    this.data.passwordack = e.detail.value
    //console.log(this.data.passwordack)
   },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
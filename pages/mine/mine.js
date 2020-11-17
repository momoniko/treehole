// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     firco1:'red',
     //content:'哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
     //timestamp:'2020-11-13',
     //num:'23'
     userdata:{},
    
    
  },
  first_choose:function(){
     wx.redirectTo({
       url: '../square/square',
     })
  
  },
  second_choose:function(){
    wx.redirectTo({
      url: '../commit/commit',
    })
  },
  third_choose:function(){
  /*  wx.redirectTo({
      url: '/pages/mine/mine',
    })*/
  },
  delete:function(e){
    var that = this
  
        //服务器交互
        wx.request({
          url: getApp().globalData.server +'/index.php/Home/Message/delete_message',
          data:{
            message_id: e.target.id,
            user_id: getApp().globalData.user.user_id,
          },
          method: 'post',
          header:{'content-type':"application/x-www-form-urlencoded"},
      
          success(res){
              if(res.data.error_code !== 0){
              wx.showModal({
                title:'提示！',
                content: '出错了呢！'+res.data.msg,
                showCancel: false,
                success(res){}
              })
            }else if(res.data.error_code == 0){
            
              wx.showModal({
                title:'提示！',
                content: '删除成功了哦！',
                success(res){
                  that.setData({
                    userdata:that.data.userdata
                  })
                },
                complete:function(res){
                  wx.reLaunch({
                    url: '/pages/mine/mine',
                  })
                }
              })
             console.log(that.data.showdata)
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
      },
   
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.data.firco =''
   var that = this
   wx.request({
    url: getApp().globalData.server +'/index.php/Home/Message/get_one_user_all_messages',
    data:{
      user_id: getApp().globalData.user.user_id,
    },
    method: 'post',
    header:{'content-type':"application/x-www-form-urlencoded"},

    success(res){
        if(res.data.error_code !== 0){
        wx.showModal({
          title:'提示！',
          content: '出错了呢！'+res.data.msg,
          showCancel: false,
          success(res){}
        })
      }else if(res.data.error_code == 0){
       that.setData({
           userdata: res.data.data
       })

       console.log(that.data.showdata)
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
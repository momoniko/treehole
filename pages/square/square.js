// pages/square/square.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firco:'red',
    showdata:{},
    islike:0,
    list: [],
    page: 1,
    pageNumber: 100,
 //  list:[
   //  {
   //  face_url:"/image/喜爱.png",
   //  username:"哆啦A梦",
   //  send_timestamp:"2020-11-13",
   //  content:"哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈",
   //  total_like:90,
   //  },
   // 
 //  ]
  },

 like:function(e){
  var that = this
  var showdata = that.data.showdata
  
  console.log("id of likes:",e.target.id)
  for( var i=0; i<showdata.length;i++){
    if(showdata[i].id == e.target.id){
      if(showdata[i].islike ==1){
        wx.showModal({
          title:'提示！',
          content: '已经点过攒了，不能再赞了！',
          success(res){}
        })
      }else{
        showdata[i].total_likes++
        showdata[i].islike = 1
        that.setData({
          showdata:showdata
        })

        //服务器交互
        wx.request({
          url: getApp().globalData.server +'/index.php/Home/Message/do_like',
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
                content: '点赞成功了哦！',
                success(res){}
              })
            // console.log(that.data.showdata)
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
      }
    }
  },

  

  first_choose:function(){
    /*
     wx.redirectTo({
       url: '../square/square',
     })
     */
  },
  second_choose:function(){
    wx.navigateTo({
      url: '../commit/commit',
    })
  },
  third_choose:function(){
   
    wx.navigateTo({
      url: '/pages/mine/mine',
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.data.firco1=""
    wx.showLoading({
      title: '加载中',
    })
  //与服务器交互
  wx.request({
    url: getApp().globalData.server +'/index.php/Home/Message/get_all_messages',
    data:{
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
           showdata: res.data.data
       })
       //console.log(that.data.showdata)
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
    },
    complete:function(res){
      wx.hideLoading()
    }
  })
  setTimeout(function(res){
    wx.hideLoading()
  },2000)
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
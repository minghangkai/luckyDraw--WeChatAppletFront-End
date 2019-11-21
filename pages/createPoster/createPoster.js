// pages/createPoster/createPoster.js
//
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    poster: '',
    userLogo: '',
    wxacodeUrl: '',
    prizeArray: '',
  },
  previewImage: function(e){
    console.log('previewImage执行')
    wx.previewImage({
      current: this.data.poster, // 当前显示图片的http链接
      urls: [this.data.poster] // 需要预览的图片http链接列表
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var prizeArray = JSON.parse(options.prizeArray)
    console.log('posterLoadprizeArray:')
    console.log(typeof(prizeArray))
    console.log(prizeArray)
    var util = require('../../utils/util.js')
    var that = this;
    var scene = decodeURIComponent(options.scene)
    var accessToken = ''
      //生成页面的二维码
      //绘制的海报白底离红边40px,放置用户头像的区域为1080*490,用户头像大小为180px*180px，头像外还有一圈白边
      //白边距离上红边85px，离用户名40px，用户名离‘邀请你参与抽奖’25px，‘邀请你参与抽奖‘距离奖品图片区域80px
      //奖品图片离区域顶端、奖品图片离奖品名称、奖品名称离开奖条件均为50px,开奖条件离小程序二维码80px 
      //二维码离“长按识别小程序码，参与抽奖”50px，“长按识别小程序码，参与抽奖”离白色区域60px  150+510+
      //奖品区离红色边40px #FF5252
    util.httpRequest(false, 'activity_and_prize/return_miniprogram_wxacode', 0, {'activityId': app.globalData.activity_id, 'shareUserId': wx.getStorageSync('user_id')}, 0, function (res) {
      var wxacodeUrl = res
      console.log('wxacodeUrl:'+res)
      that.setData({
        prizeArray: prizeArray,
        wxacodeUrl: res,
      })
      wx.getImageInfo({
        src: wxacodeUrl,//服务器返回的图片地址
        success: function (res) {
          //res.path是网络图片的本地地址
          let Path = res.path;
          var postLen = 980 + (1320*that.data.prizeArray.length)
          console.log('postLen:' + postLen)
          const ctx = wx.createCanvasContext('myCanvas')
          ctx.setFillStyle("#FF5252");
          ctx.fillRect(0, 0, 1080, postLen)
          ctx.drawImage(Path, 140, 300, 100, 100)
          ctx.draw(false, function () {
            wx.canvasToTempFilePath({
              canvasId: 'myCanvas',
              destWidth: 1080,
              destHeight: postLen,
              success: function (res) {
                console.log(res.tempFilePath)
                that.setData({
                  poster: res.tempFilePath,
                })
              }
            })
          });
        }
      })
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
    var prizeNum = 2
    var prizeArray = []
    for(let i=0;i<prizeNum;i++){
      prizeArray.push()
    }
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
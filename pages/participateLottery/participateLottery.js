// pages/participateLottery/participateLottery.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity_array: [],
    null_string:'暂无任何记录',
    isNull:false,
    nullImageSrc:'',
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
    var util = require('../../utils/util.js')
    var that = this
    var url = ''
    var nullImageSrc = ''
    var null_string = ''
    if (app.globalData.lotteryRecord === 0){
      url = 'activity_and_prize/return_personal_create_info'
      null_string = '暂无任何发布记录，赶紧去创建吧'
      nullImageSrc = '/icons/create_record.png'
    }else{
      if (app.globalData.lotteryRecord === 1){
        url = 'activity_and_prize/return_personal_paticipate_info'
        null_string = '暂无没参与任何抽奖，赶紧去参与吧'
        nullImageSrc = '/icons/participate_record.png'
      }else{
        url = 'activity_and_prize/return_personal_win_info'
        null_string = '暂无任何中奖记录'
        nullImageSrc = '/icons/win_record.png'
      }
    }
    console.log(app.globalData.newBy)
    util.httpRequest(false, url, 0, { token: wx.getStorageSync('token')}, 0, function (res) {
      console.log(url)
      console.log(res)
      if(res.length !== 0){
        that.setData({
          activity_number: res.length,
          activity_array: res
        })
      }else{
        that.setData({
          isNull:true,
          null_string : null_string,
          nullImageSrc: nullImageSrc,
        })
      }
    })
  },

  getActivityId: function (e) {
    console.log('getActivityId开始执行')
    var that = this
    var len = e.currentTarget.dataset.id
    app.globalData.activity_id = len
    console.log('globalData.activity_id:' + app.globalData.activity_id)
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
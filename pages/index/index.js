var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity_number: 0,
    activity_array:[],
    prize_array:[], //二位数组，第一维存放每个活动的奖品数组，第二维存放每个奖品
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  myEventListener: function (e) {
    console.log(e)
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
    console.log(app.globalData.newBy)
    util.httpRequest(false, 'activity_and_prize/return_activity_main_info', 0, {}, 0, function (res) {
      console.log(typeof(res[0]))
      console.log(res)
      console.log(typeof (res[0].prize_of_acitivity_array))
      console.log(res[0].prize_of_acitivity_array)
      console.log(res[1].prize_of_acitivity_array)
      console.log(res.length)
      that.setData({
        activity_number: res.length,
        activity_array: res
      })
    })
    /**var util = require('../../utils/util.js')
    util.httpRequest(true, 'activity_and_prize/return_activity_main_info', 0, {}, 0, function (res) {
      console.log('activity_number:' + res.activity_num)
      console.log(typeof (res.activity_num))
      console.log('activity_array:' + res.activity_array)
      console.log(typeof (res.activity_array))
    })*/
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
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activity_number: 0,
    activity_array:[],
  },

  getActivityId: function(e){
    console.log('getActivityId开始执行')
    var that = this
    var len = e.currentTarget.dataset.id
    app.globalData.activity_id = len
    console.log('globalData.activity_id:'+app.globalData.activity_id)
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
    util.httpRequest(false, 'activity_and_prize/return_index_activity_main_info', 0, {}, 0, function (res) {
      console.log(res)
      /**console.log(typeof(res[0]))
      console.log(typeof (res[0].prize_of_acitivity_array))
      console.log(res[0].prize_of_acitivity_array)
      console.log(res[1].prize_of_acitivity_array)
      console.log(res.length)*/
      that.setData({
        activity_number: res.length,
        activity_array: res
      })
      console.log(res.activity_photo)
      console.log(that.data.activity_number)
      console.log(that.data.activity_array[0].activity_id)
    })
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
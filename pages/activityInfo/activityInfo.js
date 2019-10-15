// pages/activityInfo/activityInfo.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    srcOfHeadImage: '',
    prizeArray: [],
    activityEnd: false,
    certificate: false,
    endTime: '',
    sponsorNickName: '',
    activityInfoJson: '',
    participateAvatarArray: [],
    shareJurisdiction: false,
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
    var baseurl = 'http://127.0.0.1:8000/media/'
    // var baseurl = 'https://www.luckydraw.net.cn/media/'
    var util = require('../../utils/util.js')
    var that = this
    util.httpRequest(false, 'activity_and_prize/return_activity_info', 0, { 'activity_id': app.globalData.activity_id}, 0, function (res) {
      console.log(res)
      console.log(res.srcOfHeadImage)
      that.setData({
        srcOfHeadImage: baseurl + res.activity_photo,
        prizeArray: res.activity_prizes,
        activityEnd: res.activity_end_time,
        certificate: res.activity_certificate,
        endTime: res.activity_end,
        sponsorNickName: res.sponsor_nickname,
        activityInfoJson: res.activity_details,
        participateAvatarArray: res.participate_avatar_array,
        shareJurisdiction: res.share_jurisdiction,
      })
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
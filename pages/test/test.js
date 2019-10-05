// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var util = require('../../utils/util.js')
    var havaToken = false
    var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NzAzNzIyNjMsImlhdCI6MTU3MDI4NTg2MywiaXNzIjoiY3liIiwiZGF0YSI6eyJpZCI6bnVsbCwib3BlbmlkIjoib1ZfeFc0OWFOSWpZcXd1Tzl3UGFoTF9GVWZyOCJ9fQ.BVT6krX3vq5YgBNmLncAykDtlz96YrJqUXm4 - 29bO8M'
    util.httpRequest(false, 'check_token/', 0, token, 0, function (res) {
      console.log("check_token:" + res.data)
      if (res.data == true) {
        havaToken = res.data
        console.log("check_token:" + res.data)
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
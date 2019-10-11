// pages/shippingAddress/shippingAddress.js
var app = getApp();
var personalJson = "";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tips: "请务必完善收货地址，以便发起人及时准确地给您发放奖品",
    name: ["联系人", "手机号", "详细地址"],
    info:["名字","11位手机号","请以**省**市**区**街道**门户格式填写"],
    participantName:"",
    participantPhoneNumber:"",
    participantAddress:"",
  },

  getParticipantName: function (e) {
    var that = this
      that.setData({
        participantName: e.detail.value
      })
    console.log("联系人名称为" + that.data.aparticipantName)
  },

  getParticipantPhoneNumber: function (e) {
    var that = this
      that.setData({
        participantPhoneNumber: e.detail.value
      })
    console.log("手机号为" + that.data.participantPhoneNumber)
    console.log("手机号类型为"+typeof (that.data.participantPhoneNumber))
  },

  getParticipantAddress: function (e) {
    var that = this
      that.setData({
        participantAddress: e.detail.value
      })
      console.log("地址为" + that.data.participantAddress)
  },

  confirm:function(e){
    var that = this
    var count = 0
    if (that.data.participantName.length === 0) {
      wx.showModal({
        title: '警告',
        content: '联系人名字不能为空',
        showCancel: false,
        confirmColor: "#4CAF50",
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      count++
    }

    if (/^1\d{10}$/.test(that.data.participantPhoneNumber) === false) {
      wx.showModal({
        title: '警告',
        content: '手机号码有误，请重新输入',
        showCancel: false,
        confirmColor: "#4CAF50",
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      count++
      console.log("手机号1为" + that.data.participantPhoneNumber)
      console.log("手机号1类型为" + typeof (that.data.participantPhoneNumber))
    }

    if (that.data.participantAddress.length === 0) {
      wx.showModal({
        title: '警告',
        content: '地址不能为空',
        showCancel: false,
        confirmColor: "#4CAF50",
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      count++
    }
    
    if(count === 0){
      var util = require('../../utils/util.js')
      var obj = {
        participantName: that.data.participantName ,
        participantPhoneNumber: that.data.participantPhoneNumber ,
        participantAddress: that.data.participantAddress ,
      }
      personalJson = JSON.stringify(obj)
      try {
        wx.setStorage({
          key: "personalInfo",
          data: personalJson
        })
        wx.setStorageSync('personalInfo', personalJson)
      } catch (e) { console.log("存储页面数据出错") }
      wx.showToast({
        title: '保存成功',
      })
      app.globalData.haveWroteThePersonalInfo = true
      console.log("联系人：" + that.data.participantName + "\n手机号：" + that.data.participantPhoneNumber + "\n详细地址:" + that.data.participantAddress)
    }  
    util.checkToken()
    util.httpRequest(false, 'user/storage_address', 0, {
      participantName: that.data.participantName,
      participantPhoneNumber: that.data.participantPhoneNumber,
      participantAddress: that.data.participantAddress, 
      token: wx.getStorageSync('token')}, 0, function (res) {
          console.log('上传地址成功')
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    if (app.globalData.haveWroteThePersonalInfo === true){
      wx.getStorage({
        key: 'personalInfo',
        success(res) {
          var temp = JSON.parse(res.data)
          that.setData({
            participantName: temp.participantName,
            participantPhoneNumber: temp.participantPhoneNumber,
            participantAddress: temp.participantAddress,
          })
        }
      })
    }
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
 // pages/activityInfo/activityInfo.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    srcOfHeadImage: '',
    srcOfClock: '/icons/clock.svg',
    prizeArray: [],
    activityEnd: false,
    certificate: '',
    endTime: '',
    sponsorNickName: '',
    activityInfoJson: '',
    participateAvatarArray: [],
    shareJurisdiction: false,
    activity_end:false,
    readOnly: true,
    content: '',
    content_html: '',
    nodes: [{
      name: 'div',
      attrs: {
        class: 'div_class',
        style: 'line-height: 60px; color: red;'
      },
      children: [{
        type: 'text',
        text: 'RichText组件'
      }]
    }]
  },

  participateActivity: function(e){
    var util = require('../../utils/util.js')
    var that = this
    util.checkToken()
    wx.requestSubscribeMessage({
      tmplIds: ['3HNEeIjVsSDRLXjIkMAmECv7RvBijDLkkyhx3l6zjdA'],
      success(res) {
        util.httpRequest(false, 'activity_and_prize/test_message', 0, { 'activity_id': app.globalData.activity_id, token: wx.getStorageSync('token') }, 0, function (res) {
          console.log('调用参与活动函数成功')
        })
      }
    })
    
    /*util.httpRequest(false, 'activity_and_prize/participate_activity', 0, { 'activity_id': app.globalData.activity_id, token: wx.getStorageSync('token')}, 0, function (res) {
      console.log('调用参与活动函数成功')
    })*/
  },
  navigateToSelfHelpPage: function (e) {
    wx.switchTab({
      url: '/pages/self-help/self-help',
    })
  },

  /*sharewithfriend: function (e) {
    wx.updateShareMenu({

    })
  },*/

  onShareAppMessage: function (res) {
    var that = this
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '抽奖吧',
      path: '/pages/activityInfo/activityInfo?activity_id=' + app.globalData.activity_id,
      imageUrl: that.data.srcOfHeadImage
    }
  },
  /**onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
      if (app.globalData.haveWroteTheActivityInfo === true) {
        let html = JSON.parse(that.data.activityInfoJson)
        that.editorCtx.setContents(html)
        //that.editorCtx.insertText(html)
      }
    }).exec()
  },*/
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var activity_id = options.activity_id
    if(activity_id != undefined) {
      app.globalData.activity_id = activity_id
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
    //var baseurl = 'http://127.0.0.1:8000/media/'
    var baseurl = 'https://www.luckydraw.net.cn/media/'
    var util = require('../../utils/util.js')
    var that = this
    util.httpRequest(false, 'activity_and_prize/return_activity_info', 0, { 'activity_id': app.globalData.activity_id}, 1, function (res) {
      that.setData({
        srcOfHeadImage: baseurl + res.activity_photo,
        prizeArray: JSON.parse(res.activity_prizes),
        endTime: res.activity_end_time,
        sponsorNickName: res.sponsor_nickname,
        activityInfoJson: res.activity_details,
        participateAvatarArray: res.participate_avatar_array,
        shareJurisdiction: res.share_jurisdiction,
      })
      console.log('JSON.parse(that.data.activityInfoJson):')
      console.log(JSON.parse(that.data.activityInfoJson).html)
      that.setData({
        nodes: JSON.parse(that.data.activityInfoJson).html,
        content_html: JSON.parse(that.data.activityInfoJson).html
      })
      if (res.activity_end == false){
        that.setData({
          activity_end: '[进行中]',
        })
      } else {
        that.setData({
          activity_end: '[已结束]',
        })
      }
      if(res.activity_certificate == true){
        that.setData({
          certificate:'[押金保障]',
        })
      }
      console.log(that.data.prizeArray[0].fields)
      console.log(that.data.prizeArray)
    })
    var pages = getCurrentPages()
    var currentPage1 = pages[pages.length - 1] //获取当前页面的对象
    var url1 = currentPage1.route
    console.log('url1:'+url1)
    var options = currentPage1.options
    console.log('options: ')
    console.log(options)
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
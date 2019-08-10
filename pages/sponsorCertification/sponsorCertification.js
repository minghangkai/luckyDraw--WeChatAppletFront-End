// pages/sponsorCertification/sponsorCertification.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    objArray:[
      { title: '加“V”标识\n', info: "活动详情，发起人署名显示为认证名字，加V标识，让活动更具可靠度"},
      { title: "更大的发起人展示位置\n", info: "认证后的发起者，活动详情发起人署名那里会拥有更大的展示位置，显示更丰富信息" },
      { title: "独立的个人主页\n", info: "认证后的额发起者拥有独立的个人主页可以将发起的活动公开到个人主页，可以添加商家介绍" },
      { title: "自助福利置顶机会\n", info: "认证后的发起者发起的自助福利活动，可以享有置顶到自助福利列表顶部机会，获得更大的曝光" }
    ],
    buttonText: "立即认证(99元/年)"
  },

  turnToCertificationKind:function(e){
    wx.navigateTo({
      url: '/pages/certificationKind/certificationKind',
    })
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
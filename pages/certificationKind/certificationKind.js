// pages/certificationKind/certificationKind.js
var app = getApp();
Page({

  /**
   * 页面的初始数据   certificationInfo: "/pages/certificationInfo/certificationInfo",
   */
  data: {
    objArray: [
      { certificationInfo: "/pages/certificationInfo/certificationInfo", imageSrc: "/icons/enterpriseCertification.svg", title: '企业认证\n', info: "适用于以企业名义举办活动的主办方，包括国企、民企、个体工商户等。" },
      { certificationInfo: "/pages/certificationInfo/certificationInfo", imageSrc: "/icons/organizationCertification.svg", title: "组织认证\n", info: "适用于以组织机构名义举办活动的主办方，包括社会团体、公益组织、政府、俱乐部、学校、公园等。" },
      { certificationInfo: "/pages/certificationInfo/certificationInfo", imageSrc: "/icons/officialAccountCertification.svg", title: "公众号认证\n", info: "适用于以公众号名义举办活动的主办方，拥有独立的公众号，并进行了微信官方认证" },
      { certificationInfo: "/pages/personalCertificationInfo/personalCertificationInfo", imageSrc: "/icons/personalCertification.svg", title: "个人认证\n", info: "适用于以个人名义举办活动的主办方" }
    ],
  },

  setCertificationKind:function(e){
    var that = this
    app.globalData.certificationKind = e.currentTarget.dataset.id;
    console.log("app.globalData.certificationKind: "+app.globalData.certificationKind)
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
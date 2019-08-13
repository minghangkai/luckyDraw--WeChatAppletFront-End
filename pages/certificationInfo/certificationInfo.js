// pages/certificationInfo/certificationInfo.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    unifiedSocialCreditCodeShowOrNot: "",
    principalShowOrNot: "",
    chooseAgainShowOrNot:false,

    organizationInput: "",
    organizationPlaceholder: "",
    unifiedSocialCreditCodeInput: "",
    unifiedSocialCreditCodePlaceholder: "",
    principalInput: "",
    principalPlaceholder: "",
    uploadIntroduction: "",

    orginizationName: "",
    unifiedSocialCreditCode: "",
    principalName: "",
    uploadPhoto: "/icons/headImage.svg",
    chooseAgain:"重新上传图片",
    
  },

  getOrginizationName: function(e){
    var that = this;
    that.setData({
      orginizationName: e.detail.value
    })
    console.log("orginizationName" + that.data.orginizationName)
  },

  getUnifiedSocialCreditCode: function (e) {
    var that = this;
    that.setData({
      unifiedSocialCreditCode: e.detail.value
    })
    console.log("unifiedSocialCreditCode" + that.data.unifiedSocialCreditCode)
  },

  getPrincipalName: function (e) {
    var that = this;
    that.setData({
      principalName: e.detail.value
    })
    console.log("principalName" + that.data.principalName)
  },

  choosePhoto: function (e) {
    var that = this;
    if (that.data.chooseAgainShowOrNot === false){
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths
          that.setData({
            uploadPhoto: tempFilePaths,
            chooseAgainShowOrNot: true
          })
        },
      })
    }else{
      wx.previewImage({
        current: that.data.uploadPhoto, // 当前显示图片的http链接
        urls: that.data.uploadPhoto // 需要预览的图片http链接列表
      })
    }
  },

  changePhoto: function(e){
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.setData({
          uploadPhoto: tempFilePaths,
          chooseAgainShowOrNot: true
        })
      },
    })
  },

  next:function(e){
    var that = this
    var c1 = ""
    var c2 = ""
    var c3 = ""
    var c4 = ""
    var c = ""
    var count = 0
    if (that.data.orginizationName === ""){
      c1 = that.data.organizationInput + "不能为空"
      c = c1
      count++
    }
    if (/^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/g.test(that.data.unifiedSocialCreditCode) === false){
      c2 = that.data.unifiedSocialCreditCodeInput + "不正确"
      c = c2
      count++
    }
    if (that.data.principalName === ""){
      c3 = that.data.principalInput + "不能为空"
      c = c3
      count++
    }
    if (that.data.uploadPhoto === "/icons/headImage.svg"){
      c4 = "请上传营业执政/单位登记证书/法人证照片"
      c = c4
      count++
    }
    if(count !== 0){
      wx.showModal({
        title: '警告',
        content: c,
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
    }else{
      var obj = {
        orginizationName: that.data.orginizationName,
        unifiedSocialCreditCode: that.data.unifiedSocialCreditCode,
        principalName: that.data.principalName,
        uploadPhoto: that.data.uploadPhoto,
        certificationKind: app.globalData.certificationKind
      }
      var certificationKindAndInfoJSON = JSON.stringify(obj)
      try {
        wx.setStorage({
          key: "certificationKindAndInfo",
          data: certificationKindAndInfoJSON
        })
        wx.setStorageSync('certificationKindAndInfo', certificationKindAndInfoJSON)
      } catch (e) { console.log("存储页面数据出错") }
      console.log("certificationKindAndInfo:" + certificationKindAndInfoJSON)
      wx.redirectTo({
        url: '/pages/personalCertificationInfo/personalCertificationInfo',
      })
    }
  },


  /**
   * orginizationName: "",
    unifiedSocialCreditCode: "",
    principalName: "",
    uploadPhoto: "/icons/headImage.svg",
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
   * 							
   */
  

  onShow: function () {
    if (app.globalData.certificationKind === 0){
      this.setData({
        organizationInput: "企业全称",
        organizationPlaceholder: "请输入企业全称",
        unifiedSocialCreditCodeInput: "统一社会信用代码",
        unifiedSocialCreditCodePlaceholder: "请输入统一社会信用代码",
        principalInput: "法定代表人姓名",
        principalPlaceholder: "请输入法定代表人姓名",
        uploadIntroduction: "营业执照/单位登记证书/法人证",
      })
    }else{
      if (app.globalData.certificationKind === 1) {
        this.setData({
          organizationInput: "组织机构名称",
          organizationPlaceholder: "请输入组织机构名称",
          unifiedSocialCreditCodeInput: "统一社会信用代码",
          unifiedSocialCreditCodePlaceholder: "请输入统一社会信用代码",
          principalInput: "负责人姓名",
          principalPlaceholder: "请输入负责人姓名",
          uploadIntroduction: "营业执照 / 单位登记证书 / 法人证",
        })
      }else{
        if (app.globalData.certificationKind === 2){
          this.setData({
            unifiedSocialCreditCodeShowOrNot: false,
            principalShowOrNot: false,
            organizationInput: "公众号名称",
            organizationPlaceholder: "请输入公众号名称",
            unifiedSocialCreditCodeInput: "",
            unifiedSocialCreditCodePlaceholder: "",
            principalInput: "",
            principalPlaceholder: "",
            uploadIntroduction: "公众号后台 - 公众号设置 - 账号详情页面截图",
          })
        }
      }
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
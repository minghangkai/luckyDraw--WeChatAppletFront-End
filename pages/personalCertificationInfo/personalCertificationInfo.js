// pages/personalCertificationInfo/personalCertificationInfo.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseAgainShowOrNot1: false,
    chooseAgainShowOrNot2: false,

    guide:"请填写运营者信息",

    name: ["真实姓名", "证件类型", "证件号码"],

    realName:"",
    credentialsKindArray: ['身份证', '港澳居民来往内地通行证', '台湾居民来往大陆通行证', "护照"],
    credentialsIndex: 0,
    credentialsNumber:"",
    phoneNum: "13360719126",

    uploadText1:"手持证件照正面",
    uploadText2: "证件照背面",
    uploadPhoto1: "/icons/headImage.svg",
    uploadPhoto2: "/icons/headImage.svg",
    chooseAgain: "重新上传图片",
    confirmText:"提交认证并支付￥99元"
  },

  getRealName: function (e) {
    var that = this
    that.setData({
      realName:e.detail.value
    })
  },

  getCredentialsKind: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      credentialsIndex: e.detail.value,
    })
  },
  
  getCredentialsNumber: function (e) {
    var that = this
    that.setData({
      credentialsNumber: e.detail.value
    })
  },

  choosePhoto1: function (e) {
    var that = this;
    if (that.data.chooseAgainShowOrNot1 === false) {
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths
          that.setData({
            uploadPhoto1: tempFilePaths,
            chooseAgainShowOrNot1: true
          })
        },
      })
    } else {
      wx.previewImage({
        current: that.data.uploadPhoto1, // 当前显示图片的http链接
        urls: that.data.uploadPhoto1 // 需要预览的图片http链接列表
      })
    }
  },

  changePhoto1: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.setData({
          uploadPhoto1: tempFilePaths,
          chooseAgainShowOrNot1: true
        })
      },
    })
  },

  choosePhoto2: function (e) {
    var that = this;
    if (that.data.chooseAgainShowOrNot2 === false) {
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths
          that.setData({
            uploadPhoto2: tempFilePaths,
            chooseAgainShowOrNot2: true
          })
        },
      })
    } else {
      wx.previewImage({
        current: that.data.uploadPhoto2, // 当前显示图片的http链接
        urls: that.data.uploadPhoto2 // 需要预览的图片http链接列表
      })
    }
  },

  changePhoto2: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        that.setData({
          uploadPhoto2: tempFilePaths,
          chooseAgainShowOrNot2: true
        })
      },
    })
  },

  confirm:function(e){
    var that = this
    var c1 = ""
    var c2 = ""
    var c3 = ""
    var c4 = ""
    var c5 = ""
    var c = ""
    var finalCertificationKindAndInfoObj
    var count = 0
    if (that.data.realName === "") {
      c1 = "真实姓名不能为空"
      c = c1
      count++
    }
    var regularExpression
    var kindForCode
    if (that.data.credentialsIndex === 0) {
       regularExpression = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
      kindForCode = "身份证号码"
    }
    if (that.data.credentialsIndex === 1){
        regularExpression = /^([A-Z]\d{6,10}(\w1\w1)?)$/
        kindForCode = "港澳居民来往内地通行证号码"
    }
    if (that.data.credentialsIndex === 2) {
      regularExpression = /^[a-zA-Z][0-9]{9}$/
      kindForCode = "台湾居民来往大陆通行证号码"
    }
    if (that.data.credentialsIndex === 3) {
      regularExpression = /^1[45][0-9]{7}$|([P|p|S|s]\d{7}$)|([S|s|G|g]\d{8}$)|([Gg|Tt|Ss|Ll|Qq|Dd|Aa|Ff]\d{8}$)|([H|h|M|m]\d{8,10})$/
      kindForCode = "护照号码"
    }
    if (regularExpression.test(that.data.credentialsNumber) === false) {
      c2 = kindForCode + "有误"
      c = c2
      count++
    }
    if (that.data.phoneNum === "") {
      c3 = "电话号码不能为空"
      c = c3
      count++
    }
    if (that.data.uploadPhoto1 === "/icons/headImage.svg") {
      c4 = "请上传手持证件照正面照片"
      c = c4
      count++
    }
    if (that.data.uploadPhoto1 === "/icons/headImage.svg") {
      c5 = "请上传证件照背面照片"
      c = c5
      count++
    }
    if (count !== 0) {
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
    } else {
      finalCertificationKindAndInfoObj = {
        realName: that.data.realName,
        kindForCredentials: that.data.credentialsIndex,
        credentialsNumber: that.data.credentialsNumber,
        uploadPhoto1: that.data.uploadPhoto1,
        uploadPhoto2: that.data.uploadPhoto2,
        certificationKind: app.globalData.certificationKind
      }

      //若存在其他组织认证则将之前的组织认证的对象和运营者信息的对象合并为finalCertificationKindAndInfoObj
      if (app.globalData.certificationKind !== 3){
        var temp = ""
        var temp1 = ""
        var temp2 = ""
        var certificationOfOrganizationObj
        wx.getStorage({
          key: 'certificationKindAndInfo',
          success(res) {
            console.log("res.data:" + res.data)
            temp = res.data
            temp1 = res.data.replace(" ", "")
            temp2 = temp1.replace(/\ufeff/g, "")
            certificationOfOrganizationObj = JSON.parse(temp2)
            console.log("\nobj: " + certificationOfOrganizationObj)
          }
        })
        object.assign(finalCertificationKindAndInfoObj, certificationOfOrganizationObj);
      }

      //将finalCertificationKindAndInfoObj转为json格式存储
      var finalCertificationKindAndInfoJSON = JSON.stringify(finalCertificationKindAndInfoObj)
      try {
        wx.setStorage({
          key: "finalCertificationKindAndInfo",
          data: finalCertificationKindAndInfoJSON
        })
        wx.setStorageSync('finalCertificationKindAndInfo', finalCertificationKindAndInfoJSON)
      } catch (e) { console.log("存储页面数据出错") }
      console.log("finalCertificationKindAndInfo:" + finalCertificationKindAndInfoJSON)


      //缺少支付部分
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000
      })
      wx.switchTab({
        url: '/pages/personal/personal'
      })

    }
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
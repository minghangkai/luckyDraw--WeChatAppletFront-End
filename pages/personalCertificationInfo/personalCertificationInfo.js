// pages/personalCertificationInfo/personalCertificationInfo.js 440883199807120319
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

  //手机号
  getPhoneNumber1: function (e) {
    var util = require('../../utils/util.js')
    var that = this
    that.setData({
      phoneNumLineTwoShowOrNot: true,
    })
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          //发起网络请求
          console.log('code' + res.code)
          util.httpRequest(false, 'user/get_user_phone_number', 0, { code: res.code, iv: e.detail.iv, encryptedData: e.detail.encryptedData }, 0, function (res) {
            that.setData({
              phoneNum: res.phoneNumber,
            })
            console.log('phoneNum:')
            console.log(that.data.phoneNum)
          })
        }
      }
    })
  },

  getPhoneNumber2: function (e) {
    console.log('getPhoneNumber2发送选择改变，携带值为', e.detail.value)
    this.setData({
      phoneNum: e.detail.value,
    })
    console.log("发起人手机号" + this.data.phoneNum)
    var myeventDetail = {} // detail对象，提供给事件监听函数
    var myeventOption = {} // 触发事件的选项
    this.triggerEvent('myevent', myeventDetail, myeventOption)
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
            uploadPhoto1: tempFilePaths[0],
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
          uploadPhoto1: tempFilePaths[0],
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
            uploadPhoto2: tempFilePaths[0],
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
          uploadPhoto2: tempFilePaths[0],
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
      var util = require('../../utils/util.js')
      finalCertificationKindAndInfoObj = {
        token:wx.getStorageSync('token'),
        realName: that.data.realName,
        kindForCredentials: that.data.credentialsIndex,
        credentialsNumber: that.data.credentialsNumber,
        phoneNum: that.data.phoneNum,
        //uploadPhoto1: that.data.uploadPhoto1,
        //uploadPhoto2: that.data.uploadPhoto2,
        certificationKind: app.globalData.certificationKind,
      }
      //util.checkToken() 440883199807120319
      wx.uploadFile({
        url: 'https://www.luckydraw.net.cn/certification/get_personal_certificate_info_positive', //仅为示例，非真实的接口地址
        filePath: that.data.uploadPhoto1,
        name: 'fileName',
        formData: finalCertificationKindAndInfoObj,
        success(res) {
          var certificationId = res.data
          wx.setStorageSync('certification_id', certificationId)
          console.log('certificationId:' + certificationId)
          console.log(typeof (certificationId))
          util.fileUpload('certification/get_personal_certificate_info_negative', that.data.uploadPhoto2, { realName: that.data.realName, certification_id: certificationId }, function (res) {
            util.httpRequest(false, 'certification/pay', 0, { token: wx.getStorageSync('token'), certification_id: wx.getStorageSync('certification_id') }, 0, function (res) {
              console.log(res)
              var obj = res
              console.log('obj_res:')
              console.log(obj.timeStamp)
              console.log(obj.nonceStr)
              console.log(obj.package)
              console.log(obj.paySign)
              wx.requestPayment({
                timeStamp: obj.timeStamp,
                nonceStr: obj.nonceStr,
                package: obj.package,
                signType: 'MD5',
                paySign: obj.paySign,
                success(res) { console.log('调用支付函数成功') },
                fail(res) { 
                  console.log('调用支付函数失败')
                  console.log(res)
                 }
              })
            })
          })
          //do something
        },
        fail(res) {
          console.log(res);
          wx.showModal({
            title: '提示',
            content: '请求失败！由于网络请求时间过长或网络无法连接的原因，请确认网络畅通后，重新点击提交认证按钮',
            confirmText: "重新请求",
            success: function (res) {
              /*if (res.confirm) {
                util.fileUpload('https://www.luckydraw.net.cn/certification/get_personal_certificate_info_positive', that.data.uploadPhoto1, finalCertificationKindAndInfoObj, function (res) {
                  util.httpRequest(false, 'certification/pay', 0, { token: wx.getStorageSync('token'), certification_id: wx.getStorageSync('certification_id') }, 0, function (res) {
                    console.log(res)
                    wx.requestPayment({
                      timeStamp: res.timeStamp,
                      nonceStr: res.nonceStr,
                      package: "prepay_id=" + res.package,
                      signType: 'MD5',
                      paySign: res.paySign,
                      success(res) {console.log('调用支付函数成功')},
                      fail(res) {}
                    })
                  })
                });//再次进行请求
              } else if (res.cancel) {
                console.log('用户点击取消');
              }*/
            }
          })
        }
      })
      /**var certificationId = util.fileUpload('certification/get_personal_certificate_info_positive', that.data.uploadPhoto1, finalCertificationKindAndInfoObj)
      console.log('certificationId:' + certificationId)
      console.log(typeof(certificationId))
      util.fileUpload('certification/get_personal_certificate_info_negative', that.data.uploadPhoto2, { realName: that.data.realName, certification_id: certificationId})*/

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
            util.checkToken()
            orginizationPhoto = wx.getStorageSync('orginizationPhoto')
            util.fileUpload('certification/get_orginization_certificate_info', orginizationPhoto, certificationOfOrganizationObj)
          }
        })
      }
      //支付部分
      /*util.httpRequest(false, 'certification/pay', 0, { token: wx.getStorageSync('token'), certification_id: wx.getStorageSync('certification_id') }, 0, function (res) {
        console.log(res)
        wx.requestPayment({
          timeStamp: res.timeStamp,
          nonceStr: res.nonceStr,
          package: "prepay_id=" + res.package,
          signType: 'MD5',
          paySign: res.paySign,
          success(res) { },
          fail(res) { }
        })
      })*/
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000
      })
      /*wx.switchTab({
        url: '/pages/personal/personal'
      })*/

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
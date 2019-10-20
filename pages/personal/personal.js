//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js')
Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        title:"奖落谁家\n欢迎您\n",
        tips:"请将微信授权登录后放心使用奖落谁家\n您的信息和数据将受到保护",
        synchronizationUserInfo: '同步微信资料',
        createActivityNum: 0,
        participateActivityNum: 0,
        winNum: 0,
        luckDrawKind: ["发起抽奖", "参与抽奖", "中奖纪录"],
      functionImage: ["/icons/identification.svg", "/icons/share.svg", "/icons/officialAccountsInterface.svg", "/icons/supportCenter.svg", "/icons/miniprogramRecommend.svg", "/icons/addvice.svg", "/icons/cooperation.svg" ],
        functionText: ["发起人认证", "分享给好友", "公众号接入", "帮助中心", "小程序推荐", "反馈/建议","推广合作"]
    },
  turnToLottery0: function (e) {
    app.globalData.lotteryRecord = 0
    wx.navigateTo({
      url: '/pages/participateLottery/participateLottery',
    })
  },
  turnToLottery1: function (e) {
    app.globalData.lotteryRecord = 1
    wx.navigateTo({
      url: '/pages/participateLottery/participateLottery',
    })
  },
  turnToLottery2: function (e) {
    app.globalData.lotteryRecord = 2
    wx.navigateTo({
      url: '/pages/participateLottery/participateLottery',
    })
  },


    onShow: function () {
      var that = this
        var util = require('../../utils/util.js')
        util.checkToken()
        util.httpRequest(true, 'user/return_user_luckyDraw_info', 0, { token: wx.getStorageSync('token') }, 0, function (res) {
            that.setData({
              createActivityNum: res.CreateActivityNum,
              participateActivityNum:res.ParticipateActivityNum,
              winNum: res.WinNum
            })
        })
    },

    onLoad: function() {
      console.log(app.globalData.newBy)
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
    },
    getUserInfo: function(e){
      var that = this
      wx.getUserInfo({
        success: function (res) {
          app.globalData.userInfo = res.userInfo
          that.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
          })
          console.log(that.data.userInfo)
          console.log(typeof (that.data.userInfo))
          var userInfoObj= that.data.userInfo
          var util = require('../../utils/util.js')
          userInfoObj.nickName
          userInfoObj.avatarUrl
          userInfoObj.city
          userInfoObj.country
          userInfoObj.gender
          userInfoObj.language
          userInfoObj.province
          util.checkToken()
          util.httpRequest(false, 'user/getUserInfo', 0, {
              nickName: userInfoObj.nickName,
              avatarUrl: userInfoObj.avatarUrl,
              city: userInfoObj.city,
              country: userInfoObj.country,
              gender: userInfoObj.gender,
              language: userInfoObj.language,
              province: userInfoObj.province,
              token: wx.getStorageSync('token')
          }, 0, function (res) {
            console.log('成功上传用户信息')
          })
        }
      })
    }
})
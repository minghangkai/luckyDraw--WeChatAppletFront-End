//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        title:"奖落谁家\n欢迎您\n",
        tips:"请将微信授权登录后放心使用奖落谁家\n您的信息和数据将受到保护",
        synchronizationUserInfo: '同步微信资料',
        luckyDrawNumber: [0, 0, 0],
        luckDrawKind: ["发起抽奖", "参与抽奖", "中奖纪录"],
      functionImage: ["/icons/identification.svg", "/icons/share.svg", "/icons/officialAccountsInterface.svg", "/icons/supportCenter.svg", "/icons/miniprogramRecommend.svg", "/icons/addvice.svg", "/icons/cooperation.svg" ],
        functionText: ["发起人认证", "分享给好友", "公众号接入", "帮助中心", "小程序推荐", "反馈/建议","推广合作"]
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
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
        }
      })
    }
})
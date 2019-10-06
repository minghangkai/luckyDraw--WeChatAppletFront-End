/**
 * 类的创建：
 * 父类Condition:一个属性
 * 组件类Time：一个属性
 * 类一PrizeInformation:包括奖品图片、名称、数量、种类、抽奖活动说明、创建者手机号、开始抽奖时间
 * 类二TimeCondition extends Contion：结束时间
 * 类三NumberCondition extends Contion:开奖人数
 */
/**class PrizeInformation {
  constructor(String1, String2, number1, number2, String3, String4, Data) {
    prizeImageSrc: String1;
      prizeName: String2;
        prizeNumber: number;
          prizeSpecies: number;//1:潮牌、2：美妆、3：数码、4：美食、5：好玩
            activitiyInformation: String3;
              creatorPhoneNumber: String4;
                beginTime: Time1
  },
  */

//app.js
/**
 * App({
    
    onLaunch () {
        console.log('App.onLaunch()');
    }
});
 */
var util = require('/utils/util.js')

App({
  config: {
    host: 'luckydraw.net.cn' // 这个地方填写你的域名
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var haveToken = wx.getStorageSync('token') || []
    console.log("haveToken:" + haveToken)
    if (haveToken == '') { //本地没有存储token
      console.log("本地没有存储token,将调用wx.login")
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          if (res.code) {
            //发起网络请求
            console.log('code'+res.code)
            util.httpRequest(false, 'luckyDraw_1/get_openid_session_key', 0, { code: res.code }, 0, function (res) {
              console.log('token:' + res)
              console.log(typeof (res))
              try {
                wx.setStorage({
                  key: "token",
                  data: res
                })
              } catch (e) { console.log("存储token数据出错") }
            })
          }
        }
      })
    } else { //本地存储token了
      console.log("else")
      try {
        wx.getStorage({
          key: 'token',
          success(res) {
            console.log("本地有存储token:" + res.data)
            util.httpRequest(false, 'luckyDraw_1/check_token', 0, { token: res.data }, 0, function (res) {
              util.checkToken(res)
            })
          }
        })
      } catch (e) { console.log("取token数据时出错")}
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    let that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.globalData.systemInfo = res;
      },
    })
  },
  globalData: {
    userInfo: null,
    systemInfo: null,
    newBy:0, //1快速，2高级，3公众号，4转盘
    numberOfKindPrize:0,
    haveWroteTheActivityInfo:false,
    haveWroteThePersonalInfo:false,
    certificationKind:0,
  }
})
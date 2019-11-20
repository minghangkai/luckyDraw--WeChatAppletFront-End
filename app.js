/**
 * 类的创建：
 * 父类Condition:一个属性
 * 组件类Time：一个属性
 * 类一PrizeInformation:包括奖品图片、名称、数量、种类、抽奖活动说明、创建者手机号、开始抽奖时间
 * 类二TimeCondition extends Contion：结束时间
 * 类三NumberCondition extends Contion:开奖人数
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
var nowDate = new Date()
nowDate.setDate(nowDate.getDate() + 2)
var year = nowDate.getFullYear()
var month = nowDate.getMonth() + 1
var day = nowDate.getDate()
const updateManager = wx.getUpdateManager()


updateManager.onCheckForUpdate(function (res) {
  // 请求完新版本信息的回调
  console.log(res.hasUpdate)
})

updateManager.onUpdateReady(function () {
  wx.showModal({
    title: '更新提示',
    content: '新版本已经准备好，是否重启应用？',
    success(res) {
      if (res.confirm) {
        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
        updateManager.applyUpdate()
      }
    }
  })
})

updateManager.onUpdateFailed(function () {
  // 新版本下载失败
})
App({
  config: {
    host: 'luckydraw.net.cn' // 这个地方填写你的域名
  },
  onLaunch: function () { 
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    util.checkToken()

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
    qiniuToken: '',
    newBy:0, //1快速，2高级，3公众号，4转盘
    numberOfKindPrize:0,
    haveWroteTheActivityInfo:false,
    haveWroteThePersonalInfo:false,
    certificationKind:0, //判断显示哪种认证方式
    open_by_share: false,
    share_user_id: '',
    activity_id: 0,
    lotteryRecord: 0,
    year:year,
    month:month,
    day:day,
  },
})
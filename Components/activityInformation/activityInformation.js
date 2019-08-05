// Components/activityInformation/activityInformation.js
var app = getApp();
var newBy = app.globalData.newBy;
Component({
  pageLifetimes: {
    show: function () {
      // 页面被展示
      this.setData({
        activityInformationDisplayOrNot: app.globalData.newBy
      })
    },
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    infoOfActivity:"",
    activityInformationDisplayOrNot:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getActivityInfo: function (e) {
      var that = this
      that.setData({
        infoOfActivity: e.detail.value
      })
      console.log(that.data.infoOfActivity)
      var myeventDetail = {} // detail对象，提供给事件监听函数
      var myeventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myeventDetail, myeventOption)
    },
  }
})

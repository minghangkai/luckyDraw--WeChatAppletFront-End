// Components/headImage/headImage.js
var app = getApp();
var newBy = app.globalData.newBy;

Component({
  pageLifetimes: {
    show: function () {
      // 页面被展示
      this.setData({
        headImageDisplayOrNot: app.globalData.newBy
        //numberOfKindPrize: app.globalData.numberOfKindPrize
      })
      //console.log(app.globalData.newBy)
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
        imageSrc: "/icons/headImage.svg",
        activityName: "",
        headImageDisplayOrNot: 1
    },

    /**
     * 组件的方法列表
     */
    methods: {
        changeImage: function() {
            var that = this;
            wx.chooseImage({
                count: 1,
                sizeType: ['original', 'compressed'],
                sourceType: ['album', 'camera'],
                success(res) {
                    // tempFilePath可以作为img标签的src属性显示图片
                    const tempFilePaths = res.tempFilePaths
                    that.setData({
                        imageSrc: tempFilePaths
                    })
                },
            })
            var myeventDetail = {} // detail对象，提供给事件监听函数
            var myeventOption = {} // 触发事件的选项
            this.triggerEvent('myevent', myeventDetail, myeventOption)
        },

        getActivityName: function(e) {
            var that = this
            that.setData({
                activityName: e.detail.value
            })
            console.log(that.data.activityName)
            var myeventDetail = {} // detail对象，提供给事件监听函数
            var myeventOption = {} // 触发事件的选项
            this.triggerEvent('myevent', myeventDetail, myeventOption)
        },
    }
})
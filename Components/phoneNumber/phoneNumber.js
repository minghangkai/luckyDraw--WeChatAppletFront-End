// Components/phoneNumber/phoneNumber.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    phoneNum: "13360719126",
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getPhoneNumber: function (e) {
      console.log(e);
      wx.request({
        url: 'http://host:port/local', //此处Ip就不暴露咯
        data: {
          "tel": e.detail, //微信小程序服务器返回的信息
          "openId": "openId" //openId  注意此处的openId 是我们通过 code(用户登录凭证) 去后台获取到的 openId
        },
        method: "GET",
        dataType: "json",
        success: function (result) {
          var that = this
          that.data.phoneNum = result.data
          wx.showModal({
            title: '警告',
            content: that.data.phoneNum,
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
          //无区号的手机号
          console.log(result.data + "-------手机号")
        },
        //that.setData({
        //index2: e.detail.value,
        //})


        //var myeventDetail = {} // detail对象，提供给事件监听函数
        //var myeventOption = {} // 触发事件的选项
        //this.triggerEvent('myevent', myeventDetail, myeventOption)

      })
      console.log("发起人手机号phoneNumber" + this.data.phoneNum)
      var myeventDetail = {} // detail对象，提供给事件监听函数
      var myeventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myeventDetail, myeventOption)
    },
  }
})

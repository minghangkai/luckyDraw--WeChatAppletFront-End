// Components/moreOptions/moreOptions.js
var app = getApp(); 
var newBy = app.globalData.newBy;
Component({
  pageLifetimes: {
    show: function () {
      // 页面被展示
      this.setData({
        newBy: app.globalData.newBy,
        inviateFriendsDisplayOrNot: app.globalData.newBy, //发起人署名
        initiatorWcNameDisplayOrNot: app.globalData.newBy, //发起人微信号
        participantAttentionDisplayOrNot: app.globalData.newBy, //参与者关注
        inviateFriendsDisplayOrNot: app.globalData.newBy, //开启邀请好友助力
        officialAccountsNameDisplayOrNot: app.globalData.newBy, //公众号名称
        participantDrawNumberDisplayOrNot: app.globalData.newBy, //每位参与者抽取次数
        participateWayDisplayOrNot: app.globalData.newBy, //参加抽奖途径
        shareJurisdictionDisplayOrNot: app.globalData.newBy, //分享权限
        allowQuitOrNotDisplayOrNot: app.globalData.newBy, //允许参与人退出抽奖
        inputCommandOrNotDisplayOrNot: app.globalData.newBy, //参与抽奖需要输入口令
        winnerListDisplayOrNot: app.globalData.newBy, //显示中奖者名单
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
      initiatorNameDisplayOrNot: app.globalData.newBy, //发起人署名
      initiatorWcNameDisplayOrNot: app.globalData.newBy, //发起人微信号
      participantAttentionDisplayOrNot: app.globalData.newBy, //参与者关注
      inviateFriendsDisplayOrNot: app.globalData.newBy, //开启邀请好友助力
      officialAccountsNameDisplayOrNot: app.globalData.newBy, //公众号名称
      participantDrawNumberDisplayOrNot: app.globalData.newBy, //每位参与者抽取次数
      participateWayDisplayOrNot: app.globalData.newBy, //参加抽奖途径
      shareJurisdictionDisplayOrNot: app.globalData.newBy, //分享权限
      allowQuitOrNotDisplayOrNot: app.globalData.newBy, //允许参与人退出抽奖
      inputCommandOrNotDisplayOrNot: app.globalData.newBy, //参与抽奖需要输入口令
      winnerListDisplayOrNot: app.globalData.newBy, //显示中奖者名单

      initiatorName:"",
      initiatorWxNumber:"",
      phoneNum: "1",
      participantAttention:true,
      inviateFriends:false,
      officialAccountsName:"",
      participantDrawNumber:1,
      participateWay:1,
      shareJurisdiction:1,
      allowQuitOrNot: false,
      inputCommandOrNot: false,
      winnerList:false,
        array1: ['菜单和自动回复卡片', '不限制'],
        objectArray1: [{
                id: 0,
                name: '菜单和自动回复卡片'
            },
            {
                id: 1,
                name: '不限制'
            }
        ],
        index1: 0,
        array2: ['所有人可分享', '仅创建者可分享'],
        objectArray2: [{
                id: 0,
                name: '所有人可分享'
            },
            {
                id: 1,
                name: '仅创建者可分享'
            }
        ],
        index2: 0
    },

    /**
     * 组件的方法列表
     */
    methods: {
      onShow: function () {
        this.setData({
          newBy: app.globalData.newBy
        })
      },

      //发起人署名
      getInitiatorName: function (e){
        console.log('input InitiatorName发送选择改变，携带值为', e.detail.value)
        this.setData({
          initiatorName: e.detail.value,
        })
        console.log("input initiatorName" + this.data.initiatorName)
        var myeventDetail = {} // detail对象，提供给事件监听函数
        var myeventOption = {} // 触发事件的选项
        this.triggerEvent('myevent', myeventDetail, myeventOption)
      },

      //发起人微信号
      getInitiatorWxNumber: function (e) {
        console.log('input InitiatorWxNumber发送选择改变，携带值为', e.detail.value)
        this.setData({
          initiatorWxNumber: e.detail.value,
        })
        console.log("input initiatorWxNumber" + this.data.initiatorWxNumber)
        var myeventDetail = {} // detail对象，提供给事件监听函数
        var myeventOption = {} // 触发事件的选项
        this.triggerEvent('myevent', myeventDetail, myeventOption)
      },

      //手机号
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

        var myeventDetail = {} // detail对象，提供给事件监听函数
        var myeventOption = {} // 触发事件的选项
        this.triggerEvent('myevent', myeventDetail, myeventOption)
      },

      //参与者关注
      getParticipantAttention: function (e) {
        var myeventDetail = {} // detail对象，提供给事件监听函数
        var myeventOption = {} // 触发事件的选项
        this.triggerEvent('myevent', myeventDetail, myeventOption)
      },

      //开启邀请好友助力
      getInviateFriends: function (e) {
        console.log('switch邀请好友发送选择改变，携带值为', e.detail.value)
        this.setData({
          inviateFriends: e.detail.value,
        })
        var myeventDetail = {} // detail对象，提供给事件监听函数
        var myeventOption = {} // 触发事件的选项
        this.triggerEvent('myevent', myeventDetail, myeventOption)
      },

      //公众号名称
      getOfficialAccountsName: function (e) {
        console.log('input 发送选择改变，携带值为OfficialAccountsName', e.detail.value)
        this.setData({
          officialAccountsName: e.detail.value,
        })
        console.log("input officialAccountsName" + this.data.officialAccountsName)
        var myeventDetail = {} // detail对象，提供给事件监听函数
        var myeventOption = {} // 触发事件的选项
        this.triggerEvent('myevent', myeventDetail, myeventOption)
      },

      //每位参与者抽取次数
      getParticipantDrawNumber: function (e) {
        console.log('input ParticipantDrawNumber发送选择改变，携带值为', e.detail.value)
        this.setData({
          participantDrawNumber: e.detail.value,
        })
        console.log("input participantDrawNumber" + this.data.participantDrawNumber)
        var myeventDetail = {} // detail对象，提供给事件监听函数
        var myeventOption = {} // 触发事件的选项
        this.triggerEvent('myevent', myeventDetail, myeventOption)
      },

      //参加抽奖途径
      getParticipateWay: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
          index1: e.detail.value,
          participateWay: e.detail.value,
        })
        console.log("input participateWayr" + this.data.participateWay)
        var myeventDetail = {} // detail对象，提供给事件监听函数
        var myeventOption = {} // 触发事件的选项
        this.triggerEvent('myevent', myeventDetail, myeventOption)
      },

      //分享权限
      getShareJurisdiction: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
          index2: e.detail.value,
          shareJurisdiction: e.detail.value,
        })
        console.log("input shareJurisdiction" + this.data.shareJurisdiction)
        var myeventDetail = {} // detail对象，提供给事件监听函数
        var myeventOption = {} // 触发事件的选项
        this.triggerEvent('myevent', myeventDetail, myeventOption)
      },

      //允许参与人退出抽奖
      getAllowQuitOrNot: function (e) {
        console.log('switch允许退出发送选择改变，携带值为', e.detail.value)
        this.setData({
          allowQuitOrNot: e.detail.value,
        })
        var myeventDetail = {} // detail对象，提供给事件监听函数
        var myeventOption = {} // 触发事件的选项
        this.triggerEvent('myevent', myeventDetail, myeventOption)
      },

      //参与抽奖需要输入口令
      getInputCommandOrNot: function (e) {
        console.log('switch InputCommandOrNot发送选择改变，携带值为', e.detail.value)
        this.setData({
          inputCommandOrNot: e.detail.value,
        })
        var myeventDetail = {} // detail对象，提供给事件监听函数
        var myeventOption = {} // 触发事件的选项
        this.triggerEvent('myevent', myeventDetail, myeventOption)
      },

      //显示中奖者名单
      getWinnerList: function (e) {
        console.log('switch WinnerList发送选择改变，携带值为', e.detail.value)
        this.setData({
          winnerList: e.detail.value,
        })
        console.log("switch WinnerList" + this.data.inviateFriends)
        var myeventDetail = {} // detail对象，提供给事件监听函数
        var myeventOption = {} // 触发事件的选项
        this.triggerEvent('myevent', myeventDetail, myeventOption)
      },
    }
})
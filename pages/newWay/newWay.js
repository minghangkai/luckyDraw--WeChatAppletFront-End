// pages/newWay/newWay.js  
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        headImageDisplayOrNot: 0,

        probityDisplayOrNot: app.globalData.newBy,
        imageDisplayOrNot: app.globalData.newBy,
        addPrizeOrNotDisplayOrNot: app.globalData.newBy,
        kindOfPrizeDisplayOrNot: app.globalData.newBy,

        activityInformationDisplayOrNot: app.globalData.newBy,

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


        srcOfHeadImage: "/icons/headImage.svg",
        activityNameOfHeadImage: "",
        activityName: "",
        infoOfActivity: "",
        
        len: 0,
        kindOfPrize: 0,
        /*imageSrc:["/icons/prizeBackgroud.jpg"],
        nameOfPrize:[""],
        numberOfPrize:[""],*/
        imageArray: [
            { imageSrc: "/icons/prizeBackgroud.jpg", nameOfPrize: "1", numberOfPrize: "1", probity: 0 }
        ],
        numberOfKindPrize: 0,
        array: ['潮牌', '美妆', '数码', "美食", "好玩"], //0:潮牌、1：美妆、2：数码、3：美食、4：好玩
        objectArray: [
            { id: 0, name: '潮牌' },
            { id: 1, name: '美妆' },
            { id: 2, name: '数码' },
            { id: 3, name: '美食' },
            { id: 4, name: '好玩' },
        ],
        index: 0,
        objectIndex: 0,

        

        conditionArray: ['按时间自动开奖', '按人数自动开奖', '手动开奖'],
      conditionObject: { id: 0, info: null,timeLeft: 2},
        conditionIndex: 0,
        kindOfCondition: 0,
        date: (new Date().getFullYear()) + "-" + (new Date().getMonth() + 1) + "-" + (new Date().getDate() + 2),
        finalYear: new Date().getFullYear(),
        finalMonth: (new Date().getMonth() + 1),
        finalDay: new Date().getDate(),
        timeLeft: 2,
        personNumber: 1,



        initiatorName: "",
        initiatorWxNumber: "",
        phoneNum: "13360719126",
        participantAttention: true,
        inviateFriends: false,
        officialAccountsName: "",
        participantDrawNumber: 1,
        participateWay: 1,
        shareJurisdiction: 1,
        allowQuitOrNot: false,
        inputCommandOrNot: false,
        winnerList: false,
        participateWayArray: ['菜单和自动回复卡片', '不限制'],
        participateWayObjectArray: [{
                id: 0,
                name: '菜单和自动回复卡片'
            },
            {
                id: 1,
                name: '不限制'
            }
        ],
        participateWayIndex: 0,
        shareJurisdictionArray: ['所有人可分享', '仅创建者可分享'],
        shareJurisdictionObjectArray: [{
                id: 0,
                name: '所有人可分享'
            },
            {
                id: 1,
                name: '仅创建者可分享'
            }
        ],
        shareJurisdictionIndex: 0,



    },

    //头图
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
                    srcOfHeadImage: tempFilePaths
                })
            },
        })
    },

    getActivityName: function(e) {
        var that = this
        that.setData({
            activityName: e.detail.value
        })
        console.log("活动名称为"+that.data.activityName)
    },



    //奖品信息

    //改变图片并取得图片路径（路径保存在imageSrc变量中）
    changePrizeImage: function(e) {
        var that = this;
        const length = e.target.dataset.id;
        console.log("换图片的id是否为undefined:"+length)
        var element = "imageArray[" + length + "].imageSrc"
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                // tempFilePath可以作为img标签的src属性显示图片
                const tempFilePaths = res.tempFilePaths
                that.setData({
                    [element]: tempFilePaths
                })
            },
        })
        //var myeventDetail = {} // detail对象，提供给事件监听函数
        //var myeventOption = {} // 触发事件的选项
        //this.triggerEvent('myevent', myeventDetail, myeventOption)
    },

    //取得奖品名称并保存在nameOfPrize变量中
    getPrizeName: function(e) {
        var that = this
        const length = e.currentTarget.dataset.id;
        var element = "imageArray[" + length + "].nameOfPrize"
        console.log("id=" + length)
        that.setData({
            [element]: e.detail.value
        })
      console.log("imageArray[" + length + "].nameOfPrize:" + that.data.imageArray[length].nameOfPrize)
        var myeventDetail = {} // detail对象，提供给事件监听函数
        var myeventOption = {} // 触发事件的选项
        this.triggerEvent('myevent', myeventDetail, myeventOption)
    },

    //取得奖品数量并保存在numberOfPrize变量中
    getPrizeNumber: function(e) {
        var that = this
        const length = e.currentTarget.dataset.id;
        var element = "imageArray[" + length + "].numberOfPrize"
        that.setData({
            [element]: e.detail.value *= 1
        })
      console.log("imageArray[" + length + "].numberOfPrize:" + that.data.imageArray[length].numberOfPrize)
    },

    //奖品类型选择器并将种类以number类存到变量kindOfPrize
    getKindOfPrize1: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        var that = this
        this.setData({
            objectIndex: e.detail.value,
            kindOfPrize: e.detail.value,
        })
        const length = this.data.imageArray.length - 1
        console.log("kindOfPrize(紧接在含图片部分): "+that.data.kindOfPrize)
            //console.log("kindOfPrize=" + this.data.kindOfPrize)
            //console.log(that.data.kindOfPrize)
        var myeventDetail = {} // detail对象，提供给事件监听函数
        var myeventOption = {} // 触发事件的选项
        this.triggerEvent('myevent', myeventDetail, myeventOption)
    },

    getKindOfPrize2: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        var that = this
        this.setData({
                index: e.detail.value,
                kindOfPrize: e.detail.value,
            })
      console.log("kindOfPrize(紧接在增加奖项部分): " + that.data.kindOfPrize)
        var myeventDetail = {} // detail对象，提供给事件监听函数
        var myeventOption = {} // 触发事件的选项
        this.triggerEvent('myevent', myeventDetail, myeventOption)
    },

    //获得转盘抽奖的中奖概率
    getProbablility: function(e) {
        var that = this
        const length = e.currentTarget.dataset.id;
        var element = "imageArray[" + length + "].probity"
        that.setData({
            [element]: e.detail.value *= 1
        })
        if (that.data.probity < 0 || that.data.probity > 100) {
            wx.showModal({
                title: '警告',
                content: '概率必须大于0%小于等于100%',
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
        }
      console.log("imageArray[" + length + "].probityOfPrize:" + that.data.imageArray[length].nameOfPrize)
        //console.log(that.data.probity)
        var myeventDetail = {} // detail对象，提供给事件监听函数
        var myeventOption = {} // 触发事件的选项
        this.triggerEvent('myevent', myeventDetail, myeventOption)
    },


    addPrize: function(e) {
        const length = this.data.imageArray.length
        this.data.imageArray =(this.data.imageArray).concat([{ imageSrc: "/icons/prizeBackgroud.jpg", nameOfPrize: "", numberOfPrize: 1, probity: 0 }]) 
        this.setData({
            imageArray: this.data.imageArray,
            len: length
        })
        console.log("成功添加奖项，当前共有"+this.data.imageArray.length+"个奖品")
    },

    delete: function(e) {
        let that = this
        let length = e.currentTarget.dataset.id;
        console.log("id=" + length)
        var element = "imageArray[" + length + "].nameOfPrize"
        let newArray = this.data.imageArray
        
      console.log("newArray.length:" + newArray.length + "个")
        if (newArray.length > 1) {
            //数组长度>1 才能删除
            newArray.splice(length,1)
            that.setData({
                imageArray: newArray
            })
        } else {
            wx.showModal({
                title: '警告',
                content: '必须设置一个奖品',
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
        }
        /*for (let i = 0; i < newArray.length; i++) {
            console.log(that.data.imageArray)
        }*/
      console.log("成功删除奖项，当前共有" + this.data.imageArray.length + "个奖品")
    },



    getActivityInfo: function(e) {
        var that = this
        that.setData({
            infoOfActivity: e.detail.value
        })
        console.log("活动说明"+that.data.infoOfActivity)
        var myeventDetail = {} // detail对象，提供给事件监听函数
        var myeventOption = {} // 触发事件的选项
        this.triggerEvent('myevent', myeventDetail, myeventOption)
    },


  
    getKindOfConditon: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
          conditionIndex: e.detail.value,
          kindOfCondition: e.detail.value*=1
        })
      this.data.conditionObject.id = this.data.conditionIndex
      console.log("kindOfCondition:" + this.data.kindOfCondition)
        console.log("开奖条件： "+this.data.conditionArray[this.data.conditionIndex])
        console.log("kind： " + this.data.conditionObject.id)
        var myeventDetail = {} // detail对象，提供给事件监听函数
        var myeventOption = {} // 触发事件的选项
        this.triggerEvent('myevent', myeventDetail, myeventOption)
    },

    getDate: function(e) {
        this.setData({
            date: e.detail.value,
            finalYear: e.detail.value.slice(0, 4),
            finalMonth: e.detail.value.slice(5, 7),
            finalDay: e.detail.value.slice(8, 10),
        })
      this.data.conditionObject.info = this.data.date
        this.data.finalYear *= 1
        this.data.finalMonth *= 1
        this.data.finalDay *= 1 //转为number基本类型
      console.log("开奖时间： " + this.data.conditionObject.info)
        var nowTimeStamp = new Date().getTime() //取得当前时间的时间戳

        var date = this.data.date.replace(/-/g, '/'); //将2019-07-26 转为 2019/07/26
        console.log("开奖时间为"+date)
        var finalTimeStamp = new Date(date).getTime(); //取得开奖时间的时间戳
        finalTimeStamp *= 1
        var timeleft = (finalTimeStamp - nowTimeStamp) / (1000 * 60 * 60 * 24)
            //console.log(timeleft)
        this.setData({
            timeLeft: Math.ceil(timeleft)
        })
      this.data.conditionObject.timeLeft = this.data.timeLeft
        var myeventDetail = {} // detail对象，提供给事件监听函数
        var myeventOption = {} // 触发事件的选项
        this.triggerEvent('myevent', myeventDetail, myeventOption)
    },

    getPersonNumber: function(e) {
        this.setData({
            personNumber: e.detail.value,
        })
      this.data.conditionObject.info = this.data.personNumber
      console.log("开奖人数为：" + this.data.conditionObject.info)
    },



    //发起人署名
    getInitiatorName: function(e) {
        console.log('input InitiatorName发送选择改变，携带值为', e.detail.value)
        this.setData({
            initiatorName: e.detail.value,
        })
        console.log("发起人署名initiatorName：" + this.data.initiatorName)
        var myeventDetail = {} // detail对象，提供给事件监听函数
        var myeventOption = {} // 触发事件的选项
        this.triggerEvent('myevent', myeventDetail, myeventOption)
    },

    //发起人微信号
    getInitiatorWxNumber: function(e) {
        console.log('input InitiatorWxNumber发送选择改变，携带值为', e.detail.value)
        this.setData({
            initiatorWxNumber: e.detail.value,
        })
        console.log("发起人微信号initiatorWxNumber" + this.data.initiatorWxNumber)
        var myeventDetail = {} // detail对象，提供给事件监听函数
        var myeventOption = {} // 触发事件的选项
        this.triggerEvent('myevent', myeventDetail, myeventOption)
    },

    //手机号
    getPhoneNumber: function(e) {
        console.log(e);
        wx.request({
            url: 'http://host:port/local', //此处Ip就不暴露咯
            data: {
                "tel": e.detail, //微信小程序服务器返回的信息
                "openId": "openId" //openId  注意此处的openId 是我们通过 code(用户登录凭证) 去后台获取到的 openId
            },
            method: "GET",
            dataType: "json",
            success: function(result) {
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

    //参与者关注
    getParticipantAttention: function(e) {
        var myeventDetail = {} // detail对象，提供给事件监听函数
        var myeventOption = {} // 触发事件的选项
        this.triggerEvent('myevent', myeventDetail, myeventOption)
    },

    //开启邀请好友助力
    getInviateFriends: function(e) {
        console.log('switch邀请好友发送选择改变，携带值为', e.detail.value)
        this.setData({
            inviateFriends: e.detail.value,
        })
      console.log("是否开启邀请好友助力：" + this.data.inviateFriends)

        var myeventDetail = {} // detail对象，提供给事件监听函数
        var myeventOption = {} // 触发事件的选项
        this.triggerEvent('myevent', myeventDetail, myeventOption)
    },

    //公众号名称
    getOfficialAccountsName: function(e) {
        console.log('input 发送选择改变，携带值为OfficialAccountsName', e.detail.value)
        this.setData({
            officialAccountsName: e.detail.value,
        })
        console.log("公众号名称officialAccountsName：" + this.data.officialAccountsName)
        var myeventDetail = {} // detail对象，提供给事件监听函数
        var myeventOption = {} // 触发事件的选项
        this.triggerEvent('myevent', myeventDetail, myeventOption)
    },

    //每位参与者抽取次数
    getParticipantDrawNumber: function(e) {
        console.log('input ParticipantDrawNumber发送选择改变，携带值为', e.detail.value)
        this.setData({
            participantDrawNumber: e.detail.value,
        })
      console.log("每位参与者抽取次数participantDrawNumber：" + this.data.participantDrawNumber)
        var myeventDetail = {} // detail对象，提供给事件监听函数
        var myeventOption = {} // 触发事件的选项
        this.triggerEvent('myevent', myeventDetail, myeventOption)
    },

    //参加抽奖途径
    getParticipateWay: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index1: e.detail.value,
            participateWay: e.detail.value,
        })
      console.log("参加抽奖途径participateWay：" + this.data.participateWay)
        var myeventDetail = {} // detail对象，提供给事件监听函数
        var myeventOption = {} // 触发事件的选项
        this.triggerEvent('myevent', myeventDetail, myeventOption)
    },

    //分享权限
    getShareJurisdiction: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index2: e.detail.value,
            shareJurisdiction: e.detail.value,
        })
        console.log("分享权限shareJurisdiction：" + this.data.shareJurisdiction)
        var myeventDetail = {} // detail对象，提供给事件监听函数
        var myeventOption = {} // 触发事件的选项
        this.triggerEvent('myevent', myeventDetail, myeventOption)
    },

    //允许参与人退出抽奖
    getAllowQuitOrNot: function(e) {
        console.log('switch允许退出发送选择改变，携带值为', e.detail.value)
        this.setData({
            allowQuitOrNot: e.detail.value,
        })
      console.log("允许退出allowQuitOrNot：" + this.data.allowQuitOrNot)
        var myeventDetail = {} // detail对象，提供给事件监听函数
        var myeventOption = {} // 触发事件的选项
        this.triggerEvent('myevent', myeventDetail, myeventOption)
    },

    //参与抽奖需要输入口令
    getInputCommandOrNot: function(e) {
        console.log('switch InputCommandOrNot发送选择改变，携带值为', e.detail.value)
        this.setData({
            inputCommandOrNot: e.detail.value,
        })
      console.log("需要输入口令inputCommandOrNot：" + this.data.inputCommandOrNot)
        var myeventDetail = {} // detail对象，提供给事件监听函数
        var myeventOption = {} // 触发事件的选项
        this.triggerEvent('myevent', myeventDetail, myeventOption)
    },

    //显示中奖者名单
    getWinnerList: function(e) {
        console.log('switch WinnerList发送选择改变，携带值为', e.detail.value)
        this.setData({
            winnerList: e.detail.value,
        })
        console.log("显示中奖名单WinnerList" + this.data.winnerList)
        var myeventDetail = {} // detail对象，提供给事件监听函数
        var myeventOption = {} // 触发事件的选项
        this.triggerEvent('myevent', myeventDetail, myeventOption)
    },



    confirmRelease:function(){
      var obj={}
      var count = 0
      if(app.globalData.newBy === 1){
        if (this.data.imageArray[0].imageSrc === "/icons/prizeBackgroud.jpg" ){
          wx.showModal({
            title: '警告',
            content: '请上传奖品图片',
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
          count++
        }

        if (this.data.imageArray[0].nameOfPrize === "") {
          wx.showModal({
            title: '警告',
            content: '奖品名称不能为空',
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
          count++
        }

        if (this.data.imageArray[0].numberOfPrize === 0 || this.data.imageArray[0].numberOfPrize === "") {
          wx.showModal({
            title: '警告',
            content: '奖品数量不能为0',
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
          count++
        }

        if (this.data.infoOfActivity === "") {
          wx.showModal({
            title: '警告',
            content: '请输入活动说明',
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
        }

        if (this.data.conditionObject.id === 0 && this.data.conditionObject.timeLeft === 0) {
          wx.showModal({
            title: '警告',
            content: '开奖时间太短，请输入合理的开奖时间',
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
          count++
        }

        if (this.data.conditionObject.id === 1 && this.data.conditionObject.info === 0) {
          wx.showModal({
            title: '警告',
            content: '开奖人数不能为0',
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
          count++
        }

        if (this.data.phoneNum.length !== 11) {
          wx.showModal({
            title: '警告',
            content: '手机号码有误，请重新输入',
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
          count++
        }
        if (count === 0){
          obj = {
            imageArray: this.data.imageArray,
            infoOfActivity: this.data.infoOfActivity,
            conditionObject: this.data.conditionObject,
            phoneNum: this.data.phoneNum,
            participantAttention: this.data.participantAttention,
            inviateFriends: this.data.inviateFriends,
          }
        }
      }
      

      if (app.globalData.newBy !== 1) {
        if (this.data.srcOfHeadImage === "/icons/headImage.svg") {
          wx.showModal({
            title: '警告',
            content: '请上传头奖图片',
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
          count++
        }

        if (this.data.activityName.length > 30 || this.data.activityName.length === 0){
          wx.showModal({
            title: '警告',
            content: '活动标题不能为空且其字数不能大于30',
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
          count++
        }

        for(let i = 0;i < this.data.imageArray.length;i++){
          if (app.globalData.newBy !== 4){
            if (this.data.imageArray[i].imageSrc === "/icons/prizeBackgroud.jpg") {
              wx.showModal({
                title: '警告',
                content: '请上传奖品'+i+'图片',
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
              count++
            }
          }
          else{
            if (this.data.imageArray[i].probity <= 0 || this.data.imageArray[i].probity >= 100) {
              wx.showModal({
                title: '警告',
                content: '奖品' + i + '中奖概率必须大于0%小于等于100%',
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
              count++
            }
          }
          if (this.data.imageArray[i].nameOfPrize === "") {
            wx.showModal({
              title: '警告',
              content: '奖品'+i+'名称不能为空',
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
            count++
          }

          if (this.data.imageArray[i].numberOfPrize === 0 || this.data.imageArray[i].numberOfPrize === "") {
            wx.showModal({
              title: '警告',
              content: '奖品' + i +'数量不能为0',
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
            count++
          }
        }//for结束
        
        if (this.data.infoOfActivity === "") {
          wx.showModal({
            title: '警告',
            content: '请输入活动说明',
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
          count++
        }

        if (this.data.conditionObject.id === 0 && this.data.conditionObject.timeLeft === 0) {
          wx.showModal({
            title: '警告',
            content: '供人们抽奖的天数为0，请输入合理的开奖时间',
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
          count++
        }

        if (this.data.conditionObject.id === 1 && this.data.conditionObject.info === 0) {
          wx.showModal({
            title: '警告',
            content: '开奖人数不能为0',
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
        }

        if (this.data.phoneNum.length !== 11) {
          wx.showModal({
            title: '警告',
            content: '手机号码有误，请重新输入',
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
          count++
        }
      }


      if (app.globalData.newBy === 2) {
        if(this.data.initiatorName === ""){
          wx.showModal({
            title: '警告',
            content: '发起人署名不能为空',
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
          count++
        }
        if (count === 0) {
          obj = {
            srcOfHeadImage: this.data.srcOfHeadImage,
            activityName: this.data.activityName,
            infoOfActivity: this.data.infoOfActivity,
            imageArray: this.data.imageArray,
            conditionObject: this.data.conditionObject,
            initiatorName: this.data.initiatorName,
            phoneNum: this.data.phoneNum,
            participantAttention: this.data.participantAttention,
            shareJurisdiction: this.data.shareJurisdiction,
            allowQuitOrNot: this.data.allowQuitOrNot,
            inviateFriends: this.data.inviateFriends,
            inputCommandOrNot: this.data.inputCommandOrNot
          }
        }
      }


      if (app.globalData.newBy === 3) {
        if (this.data.officialAccountsName === "") {
          wx.showModal({
            title: '警告',
            content: '公众号名称不能为空',
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
          count++
        }

        if (this.data.initiatorWxNumber === "") {
          wx.showModal({
            title: '警告',
            content: '发起人微信号不能为空',
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
          count++
        }

        obj = {
          srcOfHeadImage: this.data.srcOfHeadImage,
          activityName: this.data.activityName,
          infoOfActivity: this.data.infoOfActivity,
          imageArray: this.data.imageArray,
          conditionObject: this.data.conditionObject,
          phoneNum: this.data.phoneNum,
          officialAccountsName: this.data.officialAccountsName,
          initiatorWxNumber: this.data.initiatorWxNumber,
          participateWay: this.data.participateWay,
          allowQuitOrNot: this.data.allowQuitOrNot,
        }
      }

      if (app.globalData.newBy === 4) {
        if (this.data.initiatorName === "") {
          wx.showModal({
            title: '警告',
            content: '发起人署名不能为空',
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
          count++
        }

        if (this.data.initiatorWxNumber === "") {
          wx.showModal({
            title: '警告',
            content: '发起人微信号不能为空',
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
          count++
        }
        if(count === 0){
          obj = {
            srcOfHeadImage: this.data.srcOfHeadImage,
            activityName: this.data.activityName,
            infoOfActivity: this.data.infoOfActivity,
            imageArray: this.data.imageArray,
            conditionObject: this.data.conditionObject,
            initiatorName: this.data.initiatorName,
            phoneNum: this.data.phoneNum,
            initiatorName: this.data.initiatorName,
            initiatorWxNumber: this.data.initiatorWxNumber,
            participantDrawNumber: this.data.participantDrawNumber,
            shareJurisdiction: this.data.shareJurisdiction,
            winnerList: this.data.winnerList,
          }
        }
      }
      if(count === 0){
        var newJSON = JSON.stringify(obj)
        try {
          wx.setStorage({
            key: "newInfo",
            data: newJSON
          })
          wx.setStorageSync('newInfo', newJSON)
        } catch (e) { console.log("存储页面数据出错") }
        console.log("newJSON:" + newJSON)
        wx.navigateTo({
          url: '/pages/indexPrize/indexPrize',
        })
      }
    },

    myEventListener: function(e) {
        console.log(e)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        //console.log(app.globalData.newBy)
        this.setData({
            newBy: app.globalData.newBy
        })
        console.log(typeof(this))
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        this.setData({
            headImageDisplayOrNot: app.globalData.newBy,

            probityDisplayOrNot: app.globalData.newBy,
            imageDisplayOrNot: app.globalData.newBy,
            addPrizeOrNotDisplayOrNot: app.globalData.newBy,
            kindOfPrizeDisplayOrNot: app.globalData.newBy,

            activityInformationDisplayOrNot: app.globalData.newBy,

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
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})
// Components/prizeImageNameAndNum/prizeImageNameAndNum.js
var app = getApp(); 
var newBy = app.globalData.newBy;
//var numberOfKindPrize = app.globalData.numberOfKindPrize
/*class prize{
  constructor(nameOfPrize, numberOfPrize, kindOfPrize){
    imageSrc: ["/icons/prizeBackgroud.jpg"];
    this.nameOfPrize=nameOfPrize;
    this.numberOfPrize=numberOfPrize;
    this.kindOfPrize=kindOfPrize;
  }
}*/
Component({
  pageLifetimes: {
    show: function () {
      // 页面被展示
      this.setData({
        probityDisplayOrNot: app.globalData.newBy,
        imageDisplayOrNot: app.globalData.newBy,
        addPrizeOrNotDisplayOrNot: app.globalData.newBy,
        kindOfPrizeDisplayOrNot: app.globalData.newBy
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
    prizeImageNameAndNumDisplayOrNot:1,
    probityDisplayOrNot:0,
    imageDisplayOrNot: 0,
    addPrizeOrNotDisplayOrNot:0,
    probity:0.00,
    len:0,
    kindOfPrize:0,
    /*imageSrc:["/icons/prizeBackgroud.jpg"],
    nameOfPrize:[""],
    numberOfPrize:[""],*/
    imageArray: [
      {imageSrc: "/icons/prizeBackgroud.jpg", nameOfPrize: "1", numberOfPrize: "1" , probity:0 }
    ],
    numberOfKindPrize:0,
    array: ['潮牌','美妆','数码',"美食","好玩"],//0:潮牌、1：美妆、2：数码、3：美食、4：好玩
    objectArray: [
      {id: 0,name: '潮牌'},
      {id: 1,name: '美妆'},
      {id: 2,name: '数码'},
      {id: 3,name: '美食'},
      {id: 4,name: '好玩'},
    ],
    index: 0,
    objectIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //改变图片并取得图片路径（路径保存在imageSrc变量中）
    changeImage: function () {
      var that = this;
      const length = e.currentTarget.dataset.id;
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
      var myeventDetail = {} // detail对象，提供给事件监听函数
      var myeventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myeventDetail, myeventOption)
    },

    //取得奖品名称并保存在nameOfPrize变量中
    getPrizeName:function(e){
      var that = this
      const id = e.currentTarget.dataset.id;
      var element = "imageArray[" + id  + "].nameOfPrize"
      console.log("id="+id)
      that.setData({
        [element]: e.detail.value
      })
      console.log("nameOfPrize["+id+"]:"+that.data.imageArray[id].nameOfPrize)
      var myeventDetail = {} // detail对象，提供给事件监听函数
      var myeventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myeventDetail, myeventOption)
    },

    //取得奖品数量并保存在numberOfPrize变量中
    getPrizeNumber: function (e) {
      var that = this
      const length = e.currentTarget.dataset.id;
      var element = "imageArray[" + length + "].numberOfPrize"
      that.setData({
        [element]: e.detail.value *= 1
      })
      console.log("numberOfPrize发生变化 "+that.data.numberOfPrize)
      var myeventDetail = {} // detail对象，提供给事件监听函数
      var myeventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myeventDetail, myeventOption)
      console.log(this.data.imageArray[0])
      console.log(this.data.imageArray[1])
      console.log(this.data.imageArray[2])
    }, 

    //奖品类型选择器并将种类以number类存到变量kindOfPrize
    getKindOfPrize1: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      var that = this
      this.setData({
        objectIndex: e.detail.value,
        kindOfPrize: e.detail.value,
      })
      const length = this.data.imageArray.length - 1
      console.log(that.data.imageArray[length])
      //console.log("kindOfPrize=" + this.data.kindOfPrize)
      //console.log(that.data.kindOfPrize)
      var myeventDetail = {} // detail对象，提供给事件监听函数
      var myeventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myeventDetail, myeventOption)
    },

    getKindOfPrize2: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      var that = this
      this.setData({
        index: e.detail.value,
        kindOfPrize: e.detail.value,
      })
      //console.log("1="+this.data.index)
      //console.log(that.data.kindOfPrize)
      var myeventDetail = {} // detail对象，提供给事件监听函数
      var myeventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myeventDetail, myeventOption)
    },

    //获得转盘抽奖的中奖概率
    getProbablility: function (e) {
      var that = this
      const length = e.currentTarget.dataset.id;
      var element = "imageArray[" + length + "].probity"
      that.setData({
        probity: e.detail.value *= 1
      })
      if (that.data.probity < 0 || that.data.probity > 100){
        wx.showModal({
          title: '警告',
          content: '概率必须大于0%小于等于100%',
          showCancel:false,
          confirmColor:"#4CAF50",
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
      console.log(app.globalData.newBy)
      console.log(that.data.probity)
      var myeventDetail = {} // detail对象，提供给事件监听函数
      var myeventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myeventDetail, myeventOption)
    }, 


    addPrize: function (e) {
      const length = this.data.imageArray.length
      this.data.imageArray = [{imageSrc: "/icons/prizeBackgroud.jpg", nameOfPrize: "", numberOfPrize: 1,probity:0}].concat(this.data.imageArray)
      console.log(this.data.imageArray.length)
      this.setData({
        imageArray: this.data.imageArray,
        len:length
      })
    },

    delete:function(e){
      let that = this
      let length = this.data.imageArray.length
      let id = e.currentTarget.dataset.id;
      console.log("id="+id)
      var element = "imageArray[" + id + "].nameOfPrize"
      let newArray = this.data.imageArray.splice(id,1)
      if (length > 1) {
        //数组长度>1 才能删除
        that.setData({
          imageArray: newArray
        })
      } 
      else {
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
      for(let i=0;i<newArray.length;i++){
        console.log(that.data.imageArray)
      }
    }
  }//method结束
})



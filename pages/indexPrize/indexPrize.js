// pages/indexPrize/indexPrize.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prizeInfoJson:"",
    obj:""
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    var temp = ""
    var temp1 = ""
    var temp2 = ""
    wx.getStorage({
      key: 'newInfo',
      success(res) {
        console.log("res.data:"+res.data)
        temp = res.data
        that.setData({
          obj: JSON.parse(temp)
        })
        console.log("\nobj: " + typeof (that.data.obj))
        console.log("\nobj: " + that.data.obj)
        console.log("\nobj.imageArray[0].imageSrc: " + that.data.obj.imageArray[0].imageSrc)
        temp1 = res.data.replace(" ", "")
        that.setData({
          obj: JSON.parse(temp)
        })
        console.log("\nobj1: " + typeof (that.data.obj))
        console.log("\nobj1: " + that.data.obj)
        console.log("\nobj1.imageArray[0].imageSrc: " + that.data.obj.imageArray[0].imageSrc)
        temp2 = temp1.replace(/\ufeff/g, "")
        that.setData({
          obj: JSON.parse(temp)
        })
        console.log("\nobj2: " + typeof (that.data.obj))
        console.log("\nobj2: " + that.data.obj)
        console.log("\nobj2.imageArray[0].imageSrc: " + that.data.obj.imageArray[0].imageSrc)
        //console.log("temp:" + temp)

        //console.log("\ntemp1:" + temp1)
        //console.log("\ntemp2:" + temp2)
        
      }
    })
    //that.data.obj = JSON.parse(temp)          prizeInfoJson: res.data,
    //console.log("obj" + that.data.obj)
    //var json = that.data.prizeInfoJson.replace(/\ufeff/g, "")
    
    //wx.getStorageSync('object')
    //console.log("obj: "+typeof(that.data.obj))
    //console.log("prizeInfoJson: "+typeof(that.data.prizeInfoJson))
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
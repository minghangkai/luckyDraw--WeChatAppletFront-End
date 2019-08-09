// pages/indexPrize/indexPrize.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prizeInfoJson:"",
    obj:"",
    richTextContent:"",
    placeholder:"",
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
        temp1 = res.data.replace(" ", "")
        temp2 = temp1.replace(/\ufeff/g, "")
        that.setData({
          obj: JSON.parse(temp2)
        })
        console.log("\nobj: " + that.data.obj)
      }
    })
    wx.getStorage({
      key: 'richText',
      success(res) {
        console.log("res.data:" + res.data)
        temp = res.data
        temp1 = res.data.replace(" ", "")
        temp2 = temp1.replace(/\ufeff/g, "")
        that.setData({
          richTextContent: JSON.parse(temp2),
          placeholder: JSON.parse(temp2)
        })
        console.log("\nrichTextContent: " + that.data.richTextContent)
        /*this.editorCtx.setContents({
          richTextContent : that.data.richTextContent,
          success: function () {
            console.log('contents set')
            p.setData({
              logs: p.data.logs + 'setConents success; '
            })
          },
        })*/
        that.onEditorReady()
        //that.setContents(that.data.richTextContent)
        console.log("onEditorReady执行")
      }
    })
    
  },

  /**   * 初始化富文本框   */  
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
      let html = that.data.richTextContent;
      that.editorCtx.setContents(html)
    }).exec()
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
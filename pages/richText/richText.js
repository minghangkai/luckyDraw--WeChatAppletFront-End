var app = getApp();
var textContent = "";
Page({
  data: {
    formats: {},
    bottom: 0,
    readOnly: false,
    placeholder: '开始输入...',
    _focus: false,
    imageNumber: 1,
  },
  readOnlyChange() {
    this.setData({
      readOnly: !this.data.readOnly
    })
  },
  onShow(){
    
  },
  onLoad() {
    wx.loadFontFace({
      family: 'Pacifico',
      source: 'url("https://sungd.github.io/Pacifico.ttf")',
      success: console.log
    })
    var that = this
    that.onEditorReady();
    console.log("textContent: " + textContent)
  },
  onUnload(){
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面
    prevPage.setData({
      placeholderOfActivityInfo: "已保存活动说明"
    }) 
  },
  onEditorReady() {
    const that = this
    wx.createSelectorQuery().select('#editor').context(function (res) {
      that.editorCtx = res.context
      console.log("真假："+app.globalData.haveWroteTheActivityInfo)
      if(app.globalData.haveWroteTheActivityInfo === true){
        let html = JSON.parse(textContent)
        that.editorCtx.setContents(html)
      }
    }).exec()
  },

  undo() {
    this.editorCtx.undo()
  },
  redo() {
    this.editorCtx.redo()
  },
  format(e) {
    let { name, value } = e.target.dataset
    if (!name) return
    // console.log('format', name, value)
    this.editorCtx.format(name, value)

  },
  onStatusChange(e) {
    const formats = e.detail
    this.setData({ formats })
  },
  insertDivider() {
    this.editorCtx.insertDivider({
      success: function () {
        console.log('insert divider success')
      }
    })
  },
  clear() {
    this.editorCtx.clear({
      success: function (res) {
        console.log("clear success")
      }
    })
  },
  removeFormat() {
    this.editorCtx.removeFormat()
  },
  insertDate() {
    const date = new Date()
    const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    this.editorCtx.insertText({
      text: formatDate
    })
  },
  insertImage() {
    const that = this
    var util = require('../../utils/util.js')
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        const tempFilePaths = res.tempFilePaths[0]
        var filesrc = util.fileUpload('luckyDraw_1/upload_file', res.tempFilePaths[0], { newBy: 0, activityId: 0, prizeId: 0})
        console.log('filesrc: '+filesrc)
        that.editorCtx.insertImage({
          src: filesrc,
          data: {
            id: 'abcd',
            role: 'god'
          },
          success: function () {
            console.log('insert image success ' + tempFilePaths)
          }
        })
      }
    })
  },
  
  storageRichText(e){
    const that = this
    console.log('button发生了submit事件，携带数据为：', e.detail.value)
    
    this.editorCtx.getContents({
      success(res) {
        console.log(res)
        textContent = JSON.stringify(res)
        try {
          wx.setStorage({
            key: "richText",
            data: textContent
          })
          //wx.setStorageSync('richText', textContent)
        } catch (e) { console.log("存储页面数据出错") }
        console.log("richText:" + textContent)
      }
    })
    wx.navigateBack({
      success(res){
        app.globalData.haveWroteTheActivityInfo = true
        
      }
    })
    wx.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 2000
    })

  }
  //真正地插入图片函数，等到后端可用时再更新
  /*insertImage() {
    const that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        console.log(res.tempFilePaths, '上传图片')
        wx.uploadFile({
          url: '自己的图片上传地址',
          filePath: res.tempFilePaths,
          name: 'file',
          formData: {
            app_token: app.data.userInfo.app_token,
          },
          success: function (res) {
            console.log(res.data, '图片上传之后的数据')
            var data = JSON.parse(res.data)
            console.log(data.data.url)
            that.editorCtx.insertImage({
              src: data.data.url,
              success: function () {
                console.log('insert image success')
              }
            })
          }
        })
      }
    })
  }*/
})

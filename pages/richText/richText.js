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
    filesrc:'',
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
  insertImageAsync(that,fileUrl){
    that.editorCtx.insertImage({
      src: fileUrl,
      width: '100rpx',
      data: {
        id: 'abcd',
        role: 'god'
      },
      success: function () {
        console.log('显示图片成功')
      }
    })
  },
  insertImageAwait: async function (that, fileUrl) {
    const result = await this.qiniuFileUpload(that, fileUrl);
    console.log(result);
  },

  insertImage() {
    console.log('insertImage开始执行')
    const that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], 
      sourceType: ['album', 'camera'],
      success: function (res) {
        const tempFilePaths = res.tempFilePaths[0]
        var util = require('../../utils/util.js')
        util.qiniuFileUpload(tempFilePaths, function (res) {
          that.editorCtx.insertImage({
            src: 'http://' + res,
            width: '100rpx',
            data: {
              id: 'abcd',
              role: 'god'
            },
            success() {
              console.log('显示图片成功')
            },
            fail(e){
              console.log('显示图片失败:'+e)
            }
          })
        })
        /*var fileUrl = util.qiniuFileUploadAwait(tempFilePaths)
        console.log('fileUrl:' + fileUrl)
        that.editorCtx.insertImage({
          src: fileUrl,
          width: '100rpx',
          data: {
            id: 'abcd',
            role: 'god'
          },
          success: function () {
            console.log('显示图片成功')
          }
        })*/
      }
    })
  },
  /*insertImage() {
    console.log('insertImage开始执行')
    const that = this
    var util = require('../../utils/util.js')
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], 
      sourceType: ['album', 'camera'],
      success: function (res) {
        const tempFilePaths = res.tempFilePaths[0]
        wx.uploadFile({
          //url: 'http://127.0.0.1:8000/activity_and_prize/upload_file_json',
          url: 'https://www.luckydraw.net.cn/activity_and_prize/upload_file_json',
          filePath: res.tempFilePaths[0],
          name: 'fileName',
          success(res) {
            console.log(res.data)
            that.editorCtx.insertImage({
              src: res.data,
              width: '100rpx',
              data: {
                id: 'abcd',
                role: 'god'
              },
              success: function () {
                console.log('显示图片成功')
              }
            })
          }
        })
      }
    })
  },*/
  
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
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   //当前页面
    var prevPage = pages[pages.length - 2];  //上一个页面

    prevPage.setData({
      infoOfActivity: wx.getStorageSync('richText')
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

})

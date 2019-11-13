module.exports = {
  changeImage: changeImage,
}

function changeImage(this1) {
  var that = this1;
  var tempFilePaths = ''
  var photo_size = 0
  wx.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success(res) {
      // tempFilePath可以作为img标签的src属性显示图片
      tempFilePaths = res.tempFilePaths[0]
      photo_size = parseInt(res.tempFiles[0].size/1024)
      if(photo_size >= 500){
        console.log('图片大于500k，压缩')
        //-----返回选定照片的本地文件路径列表，获取照片信息-----------
        wx.getImageInfo({
          src: tempFilePaths,
          success: function (res) {
            //---------利用canvas压缩图片--------------
            //var ratio = 2;
            var canvasWidth = res.width //图片原始长宽
            var canvasHeight = res.height
            console.log("canvasWidth:" + canvasWidth)
            console.log("canvasHeight:" + canvasHeight)
            while (canvasWidth > 375 || canvasHeight > 200) {// 保证宽高在400以内
              canvasWidth = parseInt(canvasWidth >> 1)
              canvasHeight = parseInt(canvasHeight >> 1)
            }
            that.setData({
              cWidth: canvasWidth,
              cHeight: canvasHeight
            })
            //----------绘制图形并取出图片路径--------------
            var ctx = wx.createCanvasContext('canvas')
            ctx.drawImage(tempFilePaths, 0, 0, canvasWidth, canvasHeight)
            ctx.draw(false, setTimeout(function () {
              wx.canvasToTempFilePath({
                canvasId: 'canvas',
                destWidth: canvasWidth,
                destHeight: canvasHeight,
                success: function (res) {
                  that.setData({
                    srcOfHeadImage: res.tempFilePath,
                  })
                  console.log('srcOfHeadImage:')
                  console.log(that.data.srcOfHeadImage)
                },
                fail: function (res) {
                  console.log(res.errMsg)
                }
              })
            }, 100))    //留一定的时间绘制canvas
          },
          fail: function (res) { },
        })
      }else{
        console.log('图片小于500k，不压缩')
        that.setData({
          srcOfHeadImage: tempFilePaths,
        })
      }
    },
  })
}
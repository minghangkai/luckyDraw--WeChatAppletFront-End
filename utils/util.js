module.exports = {
  formatTime: formatTime,
  httpRequest: httpRequest, 
  checkToken: checkToken,
  fileUpload: fileUpload,
  baseUrl: baseUrl,
  qiniuFileUpload: qiniuFileUpload,
  checkTokenAwait: checkTokenAwait,
  qiniuFileUploadAwait: qiniuFileUploadAwait,
}

//const baseUrl = "http://127.0.0.1:8000/";//测试环境
const baseUrl = "https://www.luckydraw.net.cn/"; //正式环境
var data = ''
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-') 
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
 * loading:是否显示loading，参数为true/false
 * url:变化的url后缀
 * sessionChoose:headerType,0为json，1为x-www-form-urlencoded
 * data:传输的数据
 * method:'POST'/'GET'，0为POST,1为GET
 * callBack:回调函数,传入的参数格式为function(res)
 */
function httpRequest(loading, url, sessionChoose, params, method, callBack_success){
  var headerType = [{ 'content-type': 'application/json' }, { 'content-type': 'application/x-www-form-urlencoded' }]
  var methodType = ['POST', 'GET']
  if (loading == true) {
    wx.showToast({
      title: '数据加载中',
      icon: 'loading'
    })
  }
  wx.request({
    url: baseUrl + url,
    data: params,
    dataType: "json",
    header: headerType[sessionChoose],
    method: methodType[method],
    success: function (res) {
      if (loading == true) {
        wx.hideToast(); //隐藏提示框
      }
      console.log('调用/utils/util.js/httpRequest函数成功')
      callBack_success(res.data);
    },
    fail: function (res) {
      console.log(res);
      wx.showModal({
        title: '提示',
        content: '请求失败！由于网络请求时间过长或网络无法连接的原因，请确认网络畅通，点击"重新请求"进行再次请求！',
        confirmText: "重新请求",
        success: function (res) {
          if (res.confirm) {
            httpRequest(loading, url, sessionChoose, params, method, callBack_success);//再次进行请求
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      })
    },
    complete: function () {
      if (loading == true) {
        wx.hideToast(); //隐藏提示框
      }
    }
  })
}

function checkToken(){
  console.log('checkToken函数执行')
  var that = this
  var haveToken = wx.getStorageSync('token') || []
  if (haveToken == '') { //本地没有存储token
    console.log("本地没有存储token,将调用wx.login")
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          //发起网络请求
          console.log('code' + res.code)
          httpRequest(false, 'user/get_openid_session_key', 0, { code: res.code }, 0, function (res) {
            try {
              wx.setStorageSync("token", res.token)
              wx.setStorageSync("user_id", res.user_id)
              
              console.log("存储token数据成功")
              
            } catch (e) { 
              console.log(e)
              console.log("存储token数据出错") }
          })
        }
      }
    })
  } else { //本地存储token了
    httpRequest(false, 'user/check_token', 0, { token: haveToken }, 0, function (res) {
      if (res == true) {
        console.log("token没过期")
      } else {
        console.log("token已过期")
        wx.showLoading({
          title: '加载中',
        })
        wx.login({
          success: res => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            if (res.code) {
              //发起网络请求
              httpRequest(false, 'user/get_openid_session_key', 0, { code: res.code }, 0, function (res) {
                console.log('token:' + res)
                console.log(typeof (res))
                try {
                  wx.setStorageSync( "token",res.token)
                } catch (e) { console.log("存储token数据出错") }
                console.log('重新获得token成功')
              })
            }
          }
        })
        wx.hideLoading()
      }
    })
  }
}

function fileUpload(url, tempFilePath, formdata, callBack_success=function(){console.log('匿名函数作为参数')}){
  wx.uploadFile({
    url: baseUrl + url, //仅为示例，非真实的接口地址
    filePath: tempFilePath,
    name: 'fileName',
    formData: formdata,
    success(res) {
      console.log(res.data)
      callBack_success(res)
     return res.data
      //do something
    },
    fail(res) {
      console.log(res);
      wx.showModal({
        title: '提示',
        content: '请求失败！由于网络请求时间过长或网络无法连接的原因，请确认网络畅通，点击"重新请求"进行再次请求！',
        confirmText: "重新请求",
        success: function (res) {
          if (res.confirm) {
            fileUpload(url, tempFilePath, formdata);//再次进行请求
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      })
    }
  })
}

function qiniuFileUpload(tempFilePath, callBack_success = function () { console.log('匿名函数作为参数') }){
  var qiniuUploader = require('qiniuUploader.js')
  // 交给七牛上传
  qiniuUploader.upload(tempFilePath, (res) => {
    // 每个文件上传成功后,处理相关的事情
    // 其中 info 是文件上传成功后，服务端返回的json，形式如
    // {
    //    "hash": "Fh8xVqod2MQ1mocfI4S4KpRL6D98",
    //    "key": "gogopher.jpg"
    //  }
    // 参考http://developer.qiniu.com/docs/v6/api/overview/up/response/simple-response.html
    console.log("上传图片成功返回的res：" + res)
    console.log('file url is: ' + res.fileUrl); //res.fileUrl为上传图片返回的url
    callBack_success(res.fileUrl)
    return res.fileUrl
  }, (error) => {
    console.log('error: ' + error);
  }, {
      region: 'SCN',
      domain: 'images.luckydraw.net.cn', // // bucket 域名，下载资源时用到。如果设置，会在 success callback 的 res 参数加上可以直接使用的 ImageURL 字段。否则需要自己拼接 'q15nuskn6.bkt.clouddn.com'为测试域名 
      //key: '', // [非必须]自定义文件 key。如果不设置，默认为使用微信小程序 API 的临时文件名
      // 以下方法三选一即可，优先级为：uptoken > uptokenURL > uptokenFunc
      //uptoken: app.globalData.qiniuToken, // 由其他程序生成七牛 uptoken
      uptokenURL: 'https://www.luckydraw.net.cn/activity_and_prize/return_qiniu_upload_token', // 从指定 url 通过 HTTP GET 获取 uptoken，返回的格式必须是 json 且包含 uptoken 字段，例如： {"uptoken": "[yourTokenString]"}
      //uptokenFunc: function () { return '[yourTokenString]'; }
    }, (res) => {
      console.log('上传进度', res.progress)
      console.log('已经上传的数据长度', res.totalBytesSent)
      console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
    }, () => {
      // 取消上传
    }, () => {
      // `before` 上传前执行的操作
    }, (err) => {
      // `complete` 上传接受后执行的操作(无论成功还是失败都执行)
    });
// domain 为七牛空间（bucket)对应的域名，选择某个空间后，可通过"空间设置->基本设置->域名设置"查看获取
// key：通过微信小程序 Api 获得的图片文件的 URL 已经是处理过的临时地址，可以作为唯一文件 key 来使用。
}
async function checkTokenAwait() {
  const result = await checkToken();
  //console.log(result);
}

async function qiniuFileUploadAwait(tempFilePath) {
  const result = await qiniuFileUpload(tempFilePath);
  console.log(result);
}


class PrizeInformation {
  constructor(String1, String2, number1, number2, String3, String4, Data) {
    prizeImageSrc: String1;
    prizeName: String2;
    prizeNumber: number;
    prizeSpecies: number;//1:潮牌、2：美妆、3：数码、4：美食、5：好玩
    activitiyInformation: String3;
    creatorPhoneNumber: String4;
    beginTime: Time1
  }
}
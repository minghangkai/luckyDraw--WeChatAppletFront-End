module.exports = {
  formatTime: formatTime,
  httpRequest: httpRequest, 
  checkToken: checkToken,
  fileUpload: fileUpload
}
const baseUrl = "http://127.0.0.1:8000/";//测试环境
//const baseUrl = "https://www.luckydraw.net.cn/"; //正式环境
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
            httpRequst(loading, url, sessionChoose, params, method, callBack_success, callBack_failed);//再次进行请求
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

function checkToken(res){
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
          httpRequest(false, 'luckyDraw_1/get_openid_session_key', 0, { code: res.code }, 0, function (res) {
            console.log('token:' + res)
            console.log(typeof (res))
            try {
              wx.setStorage({
                key: "token",
                data: res
              })
            } catch (e) { console.log("存储token数据出错") }
          })
        }
      }
    })
    wx.hideLoading()
  }
}

function fileUpload(url, tempFilePath, formdata){
  var data
  wx.uploadFile({
    url: baseUrl + url, //仅为示例，非真实的接口地址
    filePath: tempFilePath,
    name: 'fileName',
    formData: formdata,
    success(res) {
      data = res.data
      console.log("上传文件成功，返回的信息为：" + res.data)
      //do something
    }
  })
  return data
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
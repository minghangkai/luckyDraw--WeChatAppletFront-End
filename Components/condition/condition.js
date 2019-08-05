// Components/condition/condition.js
const util = require('../../utils/util.js')
const app = getApp()

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    array: ['按时间自动开奖', '按人数自动开奖', '手动开奖'],
    objectArray1: [
      {
        id: 0,
        name: '按时间自动开奖'
      },
      {
        id: 1,
        name: '按人数自动开奖'
      },
      {
        id: 2,
        name: '手动开奖'
      }
    ],
    index:0,
    date: (new Date().getFullYear()) +"-"+ (new Date().getMonth()+1) +"-"+ (new Date().getDate() + 2),
    finalYear: new Date().getFullYear(),
    finalMonth:  (new Date().getMonth() + 1),
    finalDay: new Date().getDate(),
    timeLeft: 2,
    kindOfCondition:0,
    //tips:"小提示：离开奖时间还有 " + {timeLeft} + "  天，请设置合理的开奖时间"
  },
  

  /**
   * 组件的方法列表
   */
  methods: {
    bindPickerChange: function (e) {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
        index: e.detail.value,
        kindOfCondition: e.detail.value *= 1
      })
      var myeventDetail = {} // detail对象，提供给事件监听函数
      var myeventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myeventDetail, myeventOption)
    },

    bindDateChange: function (e) {
      this.setData({
        date: e.detail.value,
        finalYear: e.detail.value.slice(0,4),
        finalMonth: e.detail.value.slice(5, 7),
        finalDay: e.detail.value.slice(8, 10),
      })
      this.data.finalYear *= 1
      this.data.finalMonth *= 1
      this.data.finalDay *= 1//转为number基本类型

      var nowTimeStamp = new Date().getTime()//取得当前时间的时间戳

      var date = this.data.date.replace(/-/g, '/');//将2019-07-26 转为 2019/07/26
      var finalTimeStamp = new Date(date).getTime();//取得开奖时间的时间戳
      finalTimeStamp *= 1
      var timeleft = (finalTimeStamp - nowTimeStamp) / (1000 * 60 * 60 * 24)
      //console.log(timeleft)
      this.setData({
        timeLeft: Math.ceil(timeleft)
      })
      var myeventDetail = {} // detail对象，提供给事件监听函数
      var myeventOption = {} // 触发事件的选项
      this.triggerEvent('myevent', myeventDetail, myeventOption)
    }
  }
})

// Components/wayToNewLuckyDraw/wayToNewLuckyDraw.js

var app = getApp();
var newBy = app.globalData.newBy;

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
        url1:"/pages/newWay/newWay",
        src1: [
            "/icons/flash.svg",
            "/icons/expert.svg",
            "/icons/officialAccounts.svg",
            "/icons/turntable.svg",
            "/icons/generalize.svg"
        ],
        version: [
            "极速版",
            "高级版",
            "公众号抽奖",
            "大转盘",
            "推广抽奖活动"
        ],
        versionMessage: [
            "仅支持一个奖品，适合群抽奖",
            "支持多个奖品，以及图文混排",
            "公众号专享，仅公众号粉丝可参与",
            "即开即奖，适合线下门店活动推广",
            "推广上首页自助福利和精选福利"
        ],
        newBy: 0
    },

    /**
     * 组件的方法列表
     */
    methods: {
      way1:function(){
        this.newBy = 1
        app.globalData.newBy = this.newBy
        //console.log(app.globalData.newBy)
        
      },
      way2: function () {
        this.newBy = 2
        app.globalData.newBy = this.newBy
      },
      way3: function () {
        this.newBy = 3
        app.globalData.newBy = this.newBy
      },
      way4: function () {
        this.newBy = 4
        app.globalData.newBy = this.newBy
      },
    }
})
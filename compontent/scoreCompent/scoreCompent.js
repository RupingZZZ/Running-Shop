const {
  default: ajax
} = require("../../utils/ajax/ajax");

// pages/index/scoreCompent/scoreCompent.js
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
    list: [],
    eventList: [],
    idx: 0
  },
  attached: function () {
    this.getScore();
  },
  /**
   * 组件的方法列表
   */
  methods: {

    getScore() {
      let code = wx.getStorageSync('code')
      ajax({
        fps: "api/v2/wx/walk/todayInfo",
        header: {
          'Authorization': "Bearer " + code
        },
      }).then(res => {
        let step = res.data.data
        let list = [{
          id: 1,
          title: "今日排名",
          num: step.todayRank
        }]
        let eventList = [{
            id: 1,
            title: "今日排名",
            num: step.todayRank
          },
          {
            id: 2,
            title: "所有排名",
            num: step.totalRank
          },
          {
            id: 3,
            title: "所有步数",
            num: step.totalNumber
          },
          {
            id: 4,
            title: "今日步数",
            num: step.todayNumber
          }
        ]
        this.setData({
          eventList,
          list
        })
      })
    },
    ChangeDisplay(e) {
      const {
        eventList
      } = this.data;
      let id = e.currentTarget.dataset.id
      let result = eventList.filter(item => item.id == id)
      this.setData({
        list: Array.from(result),
        idx: id
      })
    },

  }
})
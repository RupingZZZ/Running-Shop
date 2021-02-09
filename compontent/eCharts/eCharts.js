// pages/index/eCharts/eCharts.js
import uCharts from './u-charts';
const {
  default: ajax
} = require("../../utils/ajax/ajax")
var _self;
var canvaLineA = null;

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
    cWidth: '',
    cHeight: ''
  },
  /**
   * 组件的方法列表
   */
  created:function(){

  },
  attached: function () {   
    this.getRunList();
    _self = this;
    this.cWidth = wx.getSystemInfoSync().windowWidth;
    this.cHeight = 500 / 750 * wx.getSystemInfoSync().windowWidth;
  },

  methods: {
    getRunList() {
      let code = wx.getStorageSync('code')
      wx.getWeRunData({
        success: (res) => {
          const encryptedData = res.encryptedData
          const iv = res.iv
          ajax({
            fps: "api/v2/wx/walk/step",
            data: {
              encryptedData: encryptedData,
              iv: iv
            },
            header: {
              'Authorization': "Bearer " + code
            },
          }).then(ios => {
            let runList = ios.data.data
            if (runList.length !== 0) {
              this.getServerData(runList);
            } else {
              this.getRunList()
            }
          })
        }
      })
    },

    getServerData: function (runList) {
      let timeF = [];
      let step = [];
      let obj = {};
      let result = [];
      let time = [];
      runList.map(v => {
        timeF.push(v.timestamp);
      });
      timeF.map(v => {
        time.push(this.format(v))
      })
      runList.map(v => {
        step.push(v.step);
      })
      obj.name = "步数";
      obj.color = "#1890ff";
      let area = [86, 219, 157, 230]
      obj.data = step
      obj.area = area;
      obj.legendShape = "line";
      obj.pointShape = "circle";
      obj.show = true
      obj.type = "line";
      result.push(obj);
      let LineA = {
        categories: [],
        series: []
      };
      LineA.categories = time;
      LineA.series = result;
      _self.showLineA("canvasLineA", LineA);
    },
    showLineA(canvasId, chartData) {
      canvaLineA = new uCharts({
        $this: _self,
        canvasId: canvasId,
        type: 'line',
        fontSize: 11,
        legend: true,
        dataLabel: true,
        dataPointShape: true,
        background: '#FFFFFF',
        pixelRatio: 1,
        categories: chartData.categories,
        series: chartData.series,
        animation: true,
        enableScroll: true, //开启图表拖拽功能
        xAxis: {
          disableGrid: false,
          type: 'grid',
          gridType: 'dash',
          itemCount: 4,
          scrollShow: true,
          scrollAlign: 'left',
          //scrollBackgroundColor:'#F7F7FF',//可不填写，配合enableScroll图表拖拽功能使用，X轴滚动条背景颜色,默认为 #EFEBEF
          //scrollColor:'#DEE7F7',//可不填写，配合enableScroll图表拖拽功能使用，X轴滚动条颜色,默认为 #A6A6A6
        },
        yAxis: {
          //disabled:true
          gridType: 'dash',
          splitNumber: 8,
          min: 10,
          max: 180,
          format: (val) => {
            return val.toFixed(0)
          } //如不写此方法，Y轴刻度默认保留两位小数
        },
        width: _self.cWidth,
        height: _self.cHeight,
        extra: {
          line: {
            type: 'straight'
          }
        },
      });

    },
    touchLineA(e) {
      canvaLineA.scrollStart(e);
    },
    moveLineA(e) {
      canvaLineA.scroll(e);
    },
    touchEndLineA(e) {
      canvaLineA.scrollEnd(e);
      //下面是toolTip事件，如果滚动后不需要显示，可不填写
      canvaLineA.showToolTip(e, {
        format: function (item, category) {
          return category + ' ' + item.name + ':' + item.data
        }
      });
    },

    format(item) {
      let date = new Date(item * 1000)
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
      let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      return M + "月" + D + "日"
    }

  }
})
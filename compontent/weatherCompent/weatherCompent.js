// pages/index/weatherCompent/weatherCompent.js
import request from '../../utils/request/request'
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
    now: [],
    local: {},
    air: {},
    time: null
  },

  /**
   * 组件的方法列表
   */
  attached: function (options) {
    this.getLocations();
    this.getTime();
  },

  methods: {
    getLocations() {
      wx.getLocation({
        type: 'wgs84',
        success: (res) => {
          let location = res.longitude + "," + res.latitude;
          this.getCity(location);
          this.getWeather(location);
          this.getAirQuality(location);
        },
        fail: function (err) {
          console.log(err, 'getLocation fail')
        }
      })
    },

    getCity(location) {
      request({
        url: 'https://geoapi.qweather.com/v2/city/lookup?',
        location: location,
      }).then(res => {
        this.setData({
          local: res.data.location[0]
        })
      })
    },

    getWeather(location) {
      request({
        url: 'https://devapi.qweather.com/v7/weather/now?',
        location: location
      }).then(res => {
        this.setData({
          now: res.data.now,
        })
      })
    },

    getAirQuality(location) {
      request({
        url: 'https://devapi.qweather.com/v7/air/now?',
        location: location
      }).then(res => {
        this.setData({
          air: res.data.now,
        })
      })
    },
    getTime() {
      let date = new Date();
      let time = date.getHours();
      this.setData({
        time: time
      })
    }
  }
})
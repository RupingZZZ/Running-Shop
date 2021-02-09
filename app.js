// app.js
import ajax from './utils/ajax/ajax'

App({
  onLaunch() {
    wx.login({
      success: (res) => {
        ajax({
          fps: "api/v2/wx/login",
          data: {
            code: res.code
          }
        }).then(result => {
          let code = result.data.data
          wx.setStorageSync('code', code)
        })
      }
    })
  },

})
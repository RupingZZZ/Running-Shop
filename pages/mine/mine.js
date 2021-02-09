const {
  default: ajax
} = require("../../utils/ajax/ajax")

// pages/index/mine/mine.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isSign: false,
    score: 0
  },

  getScore() {
    let code = wx.getStorageSync('code')
    ajax({
      fps: "api/v2/wx/walk/user/info",
      header: {
        'Authorization': "Bearer " + code
      },
    }).then(res => {
      this.setData({
        score: res.data.data.integral,
        isSign: res.data.data.isSign
      })
    })
  },
  sign() {
    let {
      isSign,
      score
    } = this.data
    if (isSign == false) {
      score = score + 100
    }
    this.setData({
      score
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getScore()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
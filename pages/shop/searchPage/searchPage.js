// pages/shop/searchPage/searchPage.js

import ajaxRe from '../.././../utils/ajaxRe/ajaxRe'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goods: [], 
    isLodding: false,
  },

  getInitPage(opinions) {
    wx.showLoading({
      title: '稍等',
    })
    this.setData({
      isLodding: true
    })
    ajaxRe({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/goods/search",
      data: {
        query: opinions ? opinions : "电视机"
      },
    }).then(res => {
      wx.hideLoading();
      this.setData({
        goods: res.data.message.goods
      })
    })
  },

  getSearch(e) {
    let product = e.detail.value;
    this.setData({
      value: product
    })
    ajaxRe({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/goods/search",
      data: {
        query: product
      },
    }).then(res => {
      this.setData({
        goods: res.data.message.goods
      })
    })
  },

  changeType(e) {
    let type = e.target.dataset.type;
    if (type === this.data.type) return false;
    this.setData({
      /*  */
      /*     type,
          films: [],
          pageNum: 1,
          isMore: true */
    })
    wx.setStorageSync('type', type)
    /* this.getFilms(); */
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {
      search_item
    } = options 
    console.log(search_item)
    this.getInitPage(search_item);
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
    let {
      isLodding
    } = this.data;
    if (isLodding) return false;
    this.getInitPage()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
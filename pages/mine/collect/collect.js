// pages/mine/collect/collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartList: [],
    startX: 0,
    isLeft: 0,
    between: 200
  },
  delete(e) {
    let id = e.currentTarget.dataset.delete;
    let {
      cartList
    } = this.data;
    let carList = [];
    carList = cartList.filter(item => item.goods_id !== id)
    wx.setStorageSync('isCart', carList)
    this.setData({
      cartList: carList
    })
    this.getPriceNum();
  },

  touchS(e) {
    if (e.touches.length == 1) {
      this.setData({
        startX: e.touches[0].clientX
      })
    }
  },
  touchM(e) {
    let {
      startX
    } = this.data;
    if (e.touches.length == 1) {
      let disX = e.touches[0].clientX - startX;
      if (disX >= 0) {
        this.setData({
          isLeft: 0
        })
      } else {
        this.setData({
          isLeft: 1
        })
      }
    }
  },

  touchE(e) {
    let that = this;
    let {
      startX
    } = this.data
    let id = e.currentTarget.dataset.touch;
    let bet = that.data.between / 2;
    let endX = e.changedTouches[0].clientX - startX;
    if (endX < -bet * 0.25) {
      this.setXmove(id, "-" + bet)
    } else(
      this.setXmove(id, 0)
    )
  },

  onChange(e) {
    let {
      between,
      isLeft
    } = this.data
    let bet = between / 2;
    let id = e.currentTarget.dataset.touch
    if (isLeft) {
      if (e.detail.source == "friction") {
        if (e.detail.x < -bet * 0.25) {
          this.setXmove(id, "-" + bet)
        } else {
          this.setXmove(id, 0)
        }
      }
    }
  },
  setXmove(id, x) {
    let {
      cartList
    } = this.data;
    cartList[id].x = x
    this.setData({
      cartList
    })
  },

  addCart(e) {
    let {
      cartList
    } = this.data;
    console.log(cartList)
    let index = e.currentTarget.dataset.index
    console.log(e.currentTarget.dataset.index)
    let products = wx.getStorageSync('isCart') || []
    cartList[index].num = 1;
    cartList[index].checked = true
    cartList[index].x=0;
    products.push(cartList[index]);
    wx.setStorageSync('isCart', products)
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
    let cartList = wx.getStorageSync('isClick')
    this.setData({
      cartList
    })
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
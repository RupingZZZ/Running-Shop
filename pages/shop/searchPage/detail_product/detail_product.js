// pages/shop/searchPage/detail_product/detail_product.js

import ajaxRe from '../../../../utils/ajaxRe/ajaxRe'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    product: [],
    pic: [],
    isClick: false,
    isCart: false,
    size: 0
  },

  changeType(e) {
    let {
      product
    } = this.data;
    let isClick = false
    let list = wx.getStorageSync('isClick') || [];
    let index = list.findIndex(v => {
      return v.goods_id == product.goods_id;
    })
    if (index !== -1) {
      list.splice(index, 1);
      isClick = false;
    } else {
      list.push(product)
      isClick = true
    }
    wx.setStorageSync('isClick', list)
    this.setData({
      isClick: isClick
    })
    wx.showToast({
      title: isClick ? '已收藏' : '取消收藏'
    })
  },

  getJoin() {
    let {
      product
    } = this.data;
    let isCart = false
    let carts = wx.getStorageSync('isCart') || [];
    let index = carts.findIndex(v => {
      return v.goods_id == product.goods_id;
    })
    if (index !== -1) {
      carts.splice(index, 1);
      isCart = false;
    } else {
      product.num = 1;
      product.x = 0;
      product.checked = true;
      carts.push(product)
      isCart = true
    }
    wx.setStorageSync('isCart', carts)
    this.setData({
      isCart: isCart
    })
    wx.showToast({
      title: isCart ? '已加入购物车' : '取消加入购物车'
    })

  },

  setProduct() {
    let product = this.data.product
    product.num = 1;
    let imProducts = wx.getStorageSync('imProducts') || []
    imProducts.push(product)
    wx.setStorageSync('imProducts', imProducts)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {
      product_id
    } = options;
    ajaxRe({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/goods/detail",
      data: {
        goods_id: product_id
      }
    }).then(res => {
      let list = wx.getStorageSync('isClick') || [];
      let carts = wx.getStorageSync('isCart') || [];
      let isClick = list.some(v => v.goods_id == res.data.message.goods_id)
      let isCart = carts.some(v => v.goods_id == res.data.message.goods_id)
      this.setData({
        product: res.data.message,
        pic: res.data.message.pics,
        isClick: isClick,
        isCart: isCart
      })
    })
  },



  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let imProducts = wx.getStorageSync('imProducts') || []
    let size = imProducts.length
    this.setData({
      size
    })
  },


})
// pages/cart/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    products: [],
    address: [],
    sum: 0,
    total: 0,
    flag: 0,
    size: 3
  },

  getPay() {
    let {
      flag,
      size
    } = this.data;
    let imProducts = wx.getStorageSync('imProducts') || []
    let cartList = wx.getStorageSync('isCart') || []
    if (flag == 1) {
      imProducts.splice(size, 1)
      wx.setStorageSync('imProducts', imProducts)
    }
    if (flag == 0) {
      let list = cartList.filter(v => v.checked == false)
      wx.setStorageSync('isCart', list)
    }
    if (flag == 2) {
      wx.removeStorageSync('imProducts')
      let list = cartList.filter(v => v.checked == false)
      wx.setStorageSync('isCart', list)
    }
    wx.showToast({
      title: '购买成功',
      icon: 'succes',
      duration: 1000,
      mask: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {
      flag,
      sum,
      total,
      size
    } = options;
    this.setData({
      sum,
      total,
      flag,
      size
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getAddress() {
    wx.chooseAddress({
      success: (res) => {
        let address = res;
        this.setData({
          address
        })
        wx.setStorageSync('address', address)
      }
    })

  },
  unique(arr) {
    return arr.reduce((prev, cur) => prev.includes(cur) ? prev : [...prev, cur], []);
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let {
      flag,
      products,
      size
    } = this.data;
    let productList = wx.getStorageSync('isCart') || []
    let imProducts = wx.getStorageSync('imProducts') || []
    if (flag == 0) {
      let list = []
      productList.map(v => {
        if (v.checked === true) {
          list.push(v)
        }
        return list
      })
      products = this.unique(list)
    }
    if (flag == 1) {
      let list = []
      list.push(imProducts[size]);
      products = this.unique(list)
      console.log("products flag=1", products)
    }
    if (flag == 2) {
      let sum = 0
      let total = 0
      let list = []
      list.push(...productList, ...imProducts);
      products = this.unique(list)
      products.reduce((pre, cur) => {
        pre = cur.goods_price * cur.num
        sum = sum + pre
      }, 0)
      products.reduce((pre, cur) => {
        pre = cur.num
        total = total + pre
      }, 0)
      this.setData({
        sum,
        total
      })
    }
    let address = wx.getStorageSync('address') || []
    this.setData({
      products,
      address
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */

})
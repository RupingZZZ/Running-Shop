// pages/mine/cart/cart.js
Page({

  data: {
    cartList: [],
    sum: 0,
    total: 0,
    checkAll: false,
    startX: 0,
    isLeft: 0,
    between: 200
  },

  getCartList() {
    let cartList = wx.getStorageSync('isCart') || []
    let checkAll = cartList.length ? cartList.every(v => v.checked) : false
    this.setData({
      cartList,
      checkAll
    })
  },
  addNum(e) {
    let id = e.target.dataset.add;
    let {
      cartList
    } = this.data
    let index = cartList.findIndex(item => item.goods_id == id);
    cartList[index].num++;
    this.getPriceNum()
    this.setData({
      cartList
    })
    wx.setStorageSync('isCart', cartList)
  },
  minusNum(e) {
    let id = e.target.dataset.minus;
    let {
      cartList
    } = this.data
    let index = cartList.findIndex(item => item.goods_id == id);
    if (cartList[index].num <= 1) {
      return
    } else {
      cartList[index].num--
    };
    this.getPriceNum()
    this.setData({
      cartList
    })
    wx.setStorageSync('isCart', cartList)

  },
  changeSelect(e) {
    let id = e.target.dataset.checked
    let {
      cartList
    } = this.data;
    let index = cartList.findIndex(item => item.goods_id == id)
    cartList[index].checked = !cartList[index].checked
    this.getPriceNum()
    wx.setStorageSync('isCart', cartList)
    this.setData({
      cartList
    })
  },
  getPriceNum() {
    let {
      cartList
    } = this.data;
    let sum = 0;
    let total = 0;
    let checkAll = true;
    cartList.map(v => {
      if (v.checked) {
        sum += v.goods_price * v.num;
        total += v.num
      } else {
        checkAll = false
      }
    })
    checkAll = cartList.length != 0 ? checkAll : false
    this.setData({
      sum,
      total,
      checkAll
    })

  },
  changeCheck() {
    let {
      checkAll,
      cartList
    } = this.data;
    checkAll = !checkAll;
    cartList.forEach(v => v.checked = checkAll)
    this.getPriceNum()
    this.setData({
      checkAll,
      cartList
    })

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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  onShow: function () {
    this.getCartList();
    this.getPriceNum();

  }

})
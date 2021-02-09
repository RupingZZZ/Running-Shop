export default ({
  url,
  location
}) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data: {
        location: location,
        key: '2c088a69b24c472c87eab5ba30663756'
      },
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })

  })
}
export default ({
  url,
  data
}) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })

  })
}
export default ({
  fps,
  data,
  header
}) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url:"http://qwi4ht.natappfree.cc/"+fps,
      data: data,
      header,
      success: (res) => {
        resolve(res)
      },
      fail: (err) => {
        reject(err)
      }
    })

  })
}
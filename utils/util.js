// 使用promise 封装微信的 ajax
function thenAjax(opt){
  // 返回一个 promise对象
  return new Promise((resolve,reject)=>{
    // 在对象内部 进行异步操作 
    // 根据结果 调用 resolve 跟 reject即可
    wx.request({
      // 请求的地址
      url: 'https://autumnfish.cn'+opt.url,
      data:opt.data|| {},
      // 调用豆瓣接口时 需要调整为 json 
      header:opt.header|| {'content-type':'application/json'},
      method:opt.method|| 'GET',
      dataType:opt.dataType|| 'json',
      responseType:opt.responseType|| 'text',
      success:resolve,
      fail: reject,
      complete: ()=>{}
    });
  })
}

module.exports = {
 thenAjax
}

// 引入自己封装的工具函数
let tool = require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // tab栏切换
    index: 0, // 默认个性推荐
    // 轮播图
    banners: [],
    // 歌单
    result: [],
    // 音乐地址
    musicUrl: '',
    songName: "",
    singer: "",
    cover: ""
  },
  // 点击切换tab栏
  changeTab(event) {
    // 重新修改index的值
    this.setData({
      // 保存数据
      index: event.target.dataset.index
    })
  },
  // 点击获取歌曲的url
  getUrl(event) {
    // console.log(event);
    let id = event.target.dataset.id;
    // 根据id 获取音乐的url进行播放
    tool.thenAjax({
        url: `/music/url?id=${id}`
      })
      .then(backData => {
        // 歌曲的url
        this.setData({
          musicUrl: backData.data.data[0].url
        })
        // 获取歌曲的详情
        return tool.thenAjax({
          url: `/song/detail?ids=${id}`
        })
      })
      .then(backData => {
        // console.log(backData)
        // 保存数据
        // 歌名
        let songName = backData.data.songs[0].al.name;
        // 歌手名
        let singer = backData.data.songs[0].ar[0].name;
        // 封面
        let cover = backData.data.songs[0].al.picUrl;

        // 设置数据
        this.setData({
          songName,
          singer,
          cover
        })
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取轮播图数据
    tool.thenAjax({
      url: '/banner'
    }).then(backData => {
      // console.log(backData)
      this.setData({
        banners: backData.data.banners
      })
      // 轮播图获取到了之后再去获取 推荐歌单
      return tool.thenAjax({
        url: "/personalized"
      })
    }).then(backData => {
      // 推荐歌单的数据
      // 默认没有万
      backData.data.result.forEach(v => {
        let num = parseInt(v.playCount / 10000);
        v.playCountZH = num >= 1 ? (num + '万') : parseInt(v.playCount);
      })
      this.setData({
        result: backData.data.result
      })
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
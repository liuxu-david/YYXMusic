// pages/detail-vedio/index.js
// 导入详情页的网络请求
import {getMVUrl,getMVDetail,getRelatedVedio}from "../../service/api_video"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mvURLInfo:{},
    mvDetail:{},
    relatedVideos:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取传过来的参数
    // console.log(options);
    const id=options.id;
    // 获取详情页页面数据
    this.getPageData(id);

  },
// 详情页发起的网络请求
getPageData(id){
  getMVUrl(id).then(res=>{
    // console.log(res);
    this.setData({
      mvURLInfo:res.data
    })
  })
  getMVDetail(id).then(res2=>{
    // console.log(res2);
    this.setData({
      mvDetail:res2.data
    })
  })
  getRelatedVedio(id).then(res3=>{
    // console.log(res3);
    this.setData({
      relatedVideos:res3.data
    })
  })
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
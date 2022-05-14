// pages/home-video/index.js
// 导入获取数据接口
import {getTopMV} from "../../service/api_video"
Page({
  /**
   * 页面的初始数据
   */
  data: {
    topMVs:[],
    hasMore:true
  },
// 因为共同代码太多，所以抽取相同的代码，抽取到一个函数中
async getMVTopData(offset){
  if(!this.data.hasMore&&offset!==0) return wx.showToast({
    title: '数据加载完毕！',
  })
  // 展示加载动画
  wx.showNavigationBarLoading();
  const res=await getTopMV(offset);
  let newData=this.data.topMVs;
  if(offset===0){
    newData=res.data;
  }else{
    newData=[...newData,...res.data]
  }
  this.setData({
    topMVs:newData,
    hasMore:res.hasMore
  })
  // 加载 完毕后关闭动画
 wx.hideNavigationBarLoading()
  if(offset===0){
    // 刷新完成以后需要停止 
    wx.stopPullDownRefresh()
  }
   
},
// 处理视频组件的点击事件
handleVideoClick(event){
  // console.log(event.currentTarget.dataset.item);
  const id=event.currentTarget.dataset.item.id;
  // 实现网页跳转
  wx.navigateTo({
    url: `/pages/detail-video/index?id=${id}`,
  })
},
  /**
   * 生命周期函数--监听页面加载
   */
 onLoad(options) {
    // 获取视频页面的数据
   this.getMVTopData(0);
  //  console.log(this.data.topMVs.length); 
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
    // 下拉刷新重新请求数据
    this.getMVTopData(0)

  },

  /**
   * 页面上拉触底事件的处理函数
   */
onReachBottom() {
   this.getMVTopData(this.data.topMVs.length)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
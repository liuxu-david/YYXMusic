// pages/detail-search/index.js
import { getSearchHot,getSearchSuggest,getSearchResult } from "../../service/api_search"

// 导入防抖
import debounce from "../../utils/debounce"
// 引入搜索关键词转换成node节点的方法
import stringToNodes from "../../utils/string-to-nodes"
// 使用防抖函数
// 发送网络请求的时候才做处理
const debounceGetSearchSuggest=debounce(getSearchSuggest,300)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotKeyWords:[],
    suggestSongs:[],
    suggestSongsNodes:[],
    resultSongs:[],
    searchValue:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getpageData();
  },
// 获取搜索页面数据
getpageData(){
  getSearchHot().then(res=>{
    // console.log(res.result.hots);
    this.setData({
      hotKeyWords:res.result.hots
    })
  })
},
// 处理搜索框搜索
handleSearchChange(event){
  // console.log(event.detail);
  const searchValue=event.detail;
  this.setData({searchValue:searchValue});
  if(!searchValue.length){
    this.setData({
      suggestSongs:[],
      resultSongs:[],
      suggestSongsNodes:[],
    })
    // 这里取消防抖因为快速删除会出bug
    debounceGetSearchSuggest.cancel()
    return
  }
  debounceGetSearchSuggest(searchValue).then(res=>{
    // console.log(res);
    // 获取关键字歌曲
    const suggestSongs=res.result.allMatch
    this.setData({
      suggestSongs:suggestSongs
    })
    // 把获取到的关键字歌曲转成node节点形式
    // console.log(suggestSongs);
    if(!suggestSongs) return
    const suggestKeyWords=suggestSongs.map(item=>item.keyword);
    // console.log(suggestKeyWords);
    // 这里用来存放处理后的每个item（nodes）
    const suggestSongsNodes=[];
    for(const keyword of suggestKeyWords){
      const nodes=stringToNodes(keyword,searchValue);
      suggestSongsNodes.push(nodes)
    }
    this.setData({
      suggestSongsNodes:suggestSongsNodes
    })
  })
},
// 处理搜索结果
handleSearchAction(){
  const searchValue=this.data.searchValue;
  getSearchResult(searchValue).then(res=>{
    // console.log(res.result.songs);
    this.setData({
      resultSongs:res.result.songs
    })
  })
},
// 处理建议框点击跳转
handleSuggestItemClick(event){
  // console.log(event.currentTarget.dataset.item);
  // 获取关键词
  const index=event.currentTarget.dataset.item;
  const keyword=this.data.suggestSongs[index].keyword;
  // 将关键字设置到搜索框
  this.setData({
    searchValue:keyword
  })
  // 发送网络请求
  getSearchResult(keyword).then(res=>{
    // console.log(res.result.songs);
    this.setData({
      resultSongs:res.result.songs
    })
  })
   
},
// 处理首页显示的标签点击事件
handleSuggestTagClick(event){
  // console.log(event.currentTarget.dataset.item.first);
  const keyword=event.currentTarget.dataset.item.first;
  this.setData({
    searchValue:keyword
  });
  // 因为操作相同，可以直接调用
  this.handleSearchAction();
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
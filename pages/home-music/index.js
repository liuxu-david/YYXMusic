// pages/home-music/index.js
import {getBanners,getSongMenu} from "../../service/api_music"
import queryRact from "../../utils/query-ract"
// 导入节流函数，提高效率
import throttle from "../../utils/throttle"
// 导入歌曲排行 
import { rankingStore,rankingsSongsMap,playerStore} from "../../store/index"

// 这里会生成一个节流后的函数，使用后可以大大提高性能
const throttleQueryRact=throttle(queryRact,1000,{trailing: true});

Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperHeight:0,
    // 轮播图
    banners:[],
    // 热门歌单
    hotSongMenu:[],
    // 推荐歌单
    recommendSongMenu:[],
    // 推荐歌曲
    recommendSongs:[],
    // 数据进行一系列获取
   rankings:{0:{},2:{},3:{}},
   currentSong:{},
   isPlaying:false,
   playAnimState:"paused"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    playerStore.dispatch("playMusicWithSongIdAction",{id:1896178370})
    this.getPageData();
    // 页面加载的时候发起请求 ·
    rankingStore.dispatch('getRankingDataAction');
    // 数据的监听
    this.setupPlayerStoreListener();
  },
    // 获取页面网络请求
    getPageData(){
      // 获取轮播图
      getBanners().then(res=>{
        // console.log(res.banners);
        this.setData({
          banners:res.banners
        })
      })
      // 获取热门歌单
      getSongMenu().then(res=>{
        // console.log(res);
        this.setData({
          hotSongMenu:res.playlists
        })
      })
      // 获取推荐歌单
      getSongMenu("华语").then(res=>{
        this.setData({
          recommendSongMenu:res.playlists
        })
      })
    },
    // ===========================事件处理==================
    // 点击首页搜索框进行页面跳转
  handleSearchClick(){
    wx.navigateTo({
      url: '/pages/detail-search/index',
    })
  },
  //  处理轮播图图片不同机型不能适应的处理法方法
  handleSwiperImageLoaded(){
    // console.log("图片加载完毕");
    // 使用节流函数
    throttleQueryRact('.swiper-image').then(res=>{
      // console.log("111");
        // console.log(res[0].height);
        this.setData({
          swiperHeight:res[0].height
        })
    })
  },
  // 监听更多发送过来的点击事件
  handleMoreClick(){
    // console.log(111);
    this.navigateToDetailSongsPage("hotRanking")
  },
  handleRankingItemClick(event){
    // console.log(event.currentTarget.dataset.idx);
    const rankingsName=rankingsSongsMap[event.currentTarget.dataset.idx]
    // console.log(rankingsName);
   this.navigateToDetailSongsPage(rankingsName);
  },
  handleSongItemClick(event){
    const index=event.currentTarget.dataset.index;
    playerStore.setState("playListIndex",index);
    playerStore.setState("playListSongs",this.data.recommendSongs);
  },
  // 监听播放器暂停点击
  handlePlayBtnClick(){
    playerStore.dispatch("changeMusicPlayStatusAction",!this.data.isPlaying)
  },
  // 监听小播放器的点击
  handlePlayBarClick(){
    wx.navigateTo({
      url: `/pages/music-player/index?id=${this.data.currentSong.id}`,
    })
  },
  // 把点击跳转歌曲排行详情页抽取成一个函数
   navigateToDetailSongsPage(rankingName){
    wx.navigateTo({
      url: `/pages/detail-songs/index?rankings=${rankingName}&type=ranking`,
    })
   },
   setupPlayerStoreListener(){
       // 监听热歌数据
    rankingStore.onState('hotRanking',res=>{
      if(!res.tracks) return
      const recommendSongs=res.tracks.slice(0,6);
      // 在这里获取的数据就是响应式数据，而且可以进行页面共享
      // console.log(recommendSongs);
      this.setData({
        recommendSongs:recommendSongs
      })
    })
    // 监听新歌数据
    rankingStore.onState("newRanking",this.getRankingHandler(0));
    // 监听原创数据
    rankingStore.onState("originRanking",this.getRankingHandler(2));
    // 监听飙升数据
    rankingStore.onState("upRanking",this.getRankingHandler(3));
    // 播放器的监听
    playerStore.onStates(["currentSong","isPlaying"],({currentSong,isPlaying})=>{
      if(currentSong){this.setData({currentSong})}
      if(isPlaying!==undefined){
        this.setData({
          isPlaying,
          playAnimState:isPlaying?"running":"paused"
        })
      }
    })
   },
   
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },
  getRankingHandler(idx){
    return (res)=>{
      // console.log(res);
      if(Object.keys(res).length===0) return
      // if(!res.id) return
      const name=res.name;
      const coverImgUrl=res.coverImgUrl;
      const playCount=res.playCount
      const songList=res.tracks.slice(0,3);
      const rankingsObj={name,coverImgUrl,playCount,songList};
      const newRankings={...this.data.rankings,[idx]:rankingsObj};
      this.setData({
        rankings:newRankings
      })
    }
  }
  

})
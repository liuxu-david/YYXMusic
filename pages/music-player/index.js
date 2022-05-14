import {audioContext,playerStore} from "../../store/index"

const playModeNames=["order","repeat","random"]//0：顺序播放1：循环播放2：随机播放
Page({
  data: {
    id:0,
    currentSong:{},
    lyricInfos:[],
    durationTime:0,

    currentTime:0,
    currentLyricText:"",
    currentLyricIndex:0,
    
    playModeIndex:0,
    playModeName:'order',
    isPlaying:false,
    isPlayingName:'resume',
    
    sliderValue:0,
    isSliderChanging:false,
    lyricScrollTop:0,
    contentHeight:0,
    currentPage:0 
  },

  onLoad(options) {
    // 获取id
    const id=options.id;
    this.setData({
      id
    })
    // 动态获取高度
    const screenHeight=getApp().globalData.screenHeight;
    const statusBarHeight=getApp().globalData.statusBarHeight;
    const navBarHeight=getApp().globalData.navBarHeight;
    const contentHeight=screenHeight-statusBarHeight-navBarHeight;
    this.setData({
      contentHeight
    })
    // 获取对playerstore的监听
    this.setupPlayerStoreListener();
  },

//======================================事件监听处理===================================
  // 处理左右滚动轮播事件
  handleSwiperChange(event){
    // console.log(event);
    const current=event.detail.current;
    this.setData({
      currentPage:current
    })
  },
  // 处理正在拖进度条
  handleSliderChanging(event){
    // console.log(event.detail.value);
    const value=event.detail.value;
    const currentTime=this.data.durationTime*value/100;
    // 拖动进度条的时候不让进度条自动移动
    this.setData({
      isSliderChanging:true,
      currentTime,
    })
  },
  // 处理进度条
  handleSliderChange(event){
    // console.log(event.detail.value);
    const value=event.detail.value;
    ///1计算拖动的位置的时间
    const currentTime=this.data.durationTime*(value/100);
    // console.log(currentTime);
    // 2把播放设置到拖动的位置
    // audioContext.pause();
    // 这里传个s值
    audioContext.seek(currentTime/1000)
    // 记录最新的sliderValue
    this.setData({
      sliderValue:value,
      isSliderChanging:false
    })
  },
  // 处理左按钮点击返回
  handleBackBtnClick(){
    wx.navigateBack()
  },
  // 对播放模式进行处理
  handleModeBtnClick(){
    let playModeIndex=this.data.playModeIndex+1;
    if(playModeIndex===3) playModeIndex=0
    playerStore.setState("playModeIndex",playModeIndex)
  },
  // 对播放暂停进行处理
  handlePlayBtnClick(){
    playerStore.dispatch("changeMusicPlayStatusAction",!this.data.isPlaying)
  },
  // 对上一首做处理
  handlePrevBtnClick(){
    playerStore.dispatch("changeNewMusicAction",false);
  },
  // 对下一首做处理
  handleNextBtnClick(){
    playerStore.dispatch("changeNewMusicAction");
  },


   
  // ======================================数据监听================================
  // 监听play-store中的数据变化
  setupPlayerStoreListener(){
    // 监听多个数据的变化currentSong/durationTime/lyricInfos
    playerStore.onStates(["currentSong","durationTime","lyricInfos"],({currentSong,durationTime,lyricInfos})=>{
      if(currentSong) this.setData({currentSong});
      if(durationTime) this.setData({durationTime});
      if(lyricInfos) this.setData({lyricInfos});
    })
    //监听多个数据的变化 currentTime/currentLyricText/currentLyricIndex
    playerStore.onStates(["currentTime","currentLyricText","currentLyricIndex"],({currentTime,currentLyricText,currentLyricIndex})=>{
      // 事件变化
      if(currentTime&&!this.data.isSliderChanging){
        const sliderValue= currentTime/this.data.durationTime*100;
        this.setData({
          currentTime,
          sliderValue
        })
      }
       // 歌词变化
      if(currentLyricIndex){
        this.setData({
          currentLyricIndex,
          lyricScrollTop:currentIndex*35
        })
      }
      if(currentLyricText){
        this.setData({currentLyricText})
      }
    })
    // 监听playmModeIndex,isplaying的变化
    playerStore.onStates(["playModeIndex","isPlaying"],({playModeIndex,isPlaying})=>{
      if(playModeIndex!==undefined){
        this.setData({
          playModeIndex,
          playModeName:playModeNames[playModeIndex]
        })
      }
      if(isPlaying!==undefined){
        this.setData({
          isPlaying,
          isPlayingName:isPlaying?"pause":"resume"
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },
})
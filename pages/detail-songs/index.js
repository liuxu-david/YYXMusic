// pages/detail-songs/index.js
import {rankingStore,playerStore} from "../../store/index"
import {getSongMenuDetail} from "../../service/api_music"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type:'',
    ranking:"",
       // 歌单详情和更多跳转过来传的参数不同，但是可以保存在这里面
    songInfo:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const type=options.type;
    this.setData({
      type:type
    });
    if(type==="menu"){
      // console.log(options.id);
      const id=options.id;
      getSongMenuDetail(id).then(res=>{
        // console.log(res);
        this.setData({
          songInfo:res.playlist
        })
      })
    }
    else if(type==="ranking"){
      const ranking=options.rankings;
      this.setData({
        ranking:ranking
      })
      // 获取相应的数据
      rankingStore.onState(ranking,this.getRankingDataHandler)
    }
 

  },

 
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
  //  如果有ranking数据，页面销毁应清除
  if(this.data.ranking){
    rankingStore.offState(this.data.ranking,this.getRankingDataHandler)
  }
  },

  // 对共享数据做处理
  getRankingDataHandler(res){
    // console.log(res);
    this.setData({
      songInfo:res
    })
  },
  handleSongItemClick(event){
    const index=event.currentTarget.dataset.index;
    playerStore.setState("playListIndex",index)
    playerStore.setState("playListSongs",this.data.songInfo.tracks)
  }
})
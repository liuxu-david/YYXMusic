import {HYEventStore} from "hy-event-store"
import {getSongDetail, getSongLyric} from "../service/api_player"
import {parseLyric} from "../utils/parse-lyric"

// const audioContext=wx.createInnerAudioContext();
const audioContext=wx.getBackgroundAudioManager()
const playerStore=new HYEventStore({
  state:{
    isFirstPlay:true,
    isStoping:false,

    id:0,
    currentSong:{},
    durationTime:0,
    lyricInfos:[],
    
    currentTime:0,
    currentLyricText:"",
    currentLyricIndex:0,

    playModeIndex:0,//0：顺序播放1：循环播放2：随机播放
    isPlaying:true,
    playListSongs:[],
    playListIndex:0
  },
  actions:{
    playMusicWithSongIdAction(ctx,{id,isRefresh=false}){
      if(ctx.id ==id&&!isRefresh){
        this.dispatch("changeMusicPlayStatusAction",true)
        return
      }
      ctx.id=id;
      // 0修改播放状态
      ctx.isPlaying=true;
      ctx.currentSong={};
      ctx.durationTime=0;
      ctx.lyricInfos=[];
      ctx.currentTime=0;
      ctx.currentLyricText="",
      ctx.currentLyricIndex=0

      //1、根据id获取对应的歌曲
      // 获取歌曲详情
      getSongDetail(id).then(res=>{
          ctx.currentSong=res.songs[0], 
          ctx.durationTime=res.songs[0].dt,
          audioContext.title=res.songs[0].name
      })
      // 获取歌词详情
      getSongLyric(id).then(res=>{
        const lyricString=res.lrc.lyric;
        const lyrics=parseLyric(lyricString);
        ctx.lyricInfos=lyrics
      })

      // 2、根据id播放该歌曲（把上一首暂停，获取id，播放歌曲）
      audioContext.stop();
      audioContext.src=`https://music.163.com/song/media/outer/url?id=${id}.mp3`;
      audioContext.title=id;
      audioContext.autoplay=true;

      // 3对audioContex的一些事件监听
      if(ctx.isFirstPlay){
        this.dispatch("setupAudioContextListenerAction");
        ctx.isFirstPlay=false;
      }
    },
    setupAudioContextListenerAction(ctx){
      // 1、音频读取结束后执行播放
      audioContext.onCanplay(()=>{
          audioContext.play();
      })
      // 2、监听音乐播放时间的变化
      audioContext.onTimeUpdate(()=>{
        // 添加进度条的自动移动  进度条在拖动的时候不让自动改变进度条 滑动的时候也不能更改时间
        //1、获取当前时间
        let currentTime=audioContext.currentTime*1000;
        // 2、根据当前时间修改currentTime
        ctx.currentTime=currentTime;
        // 3、根据时间去查找要播放的歌词
        if(!ctx.lyricInfos.length) return
        let i = 0
        for (; i <=ctx.lyricInfos.length; i++) {
          const lyricInfo=ctx.lyricInfos[i];
          // 这句一会再决定
          if(!lyricInfo.length) return
          if(currentTime<lyricInfo.time){
            break;
          }
        }
        const currentIndex=i-1;
        if(ctx.currentLyricIndex!==currentIndex){
          const currentLyricText=ctx.lyricInfos[currentIndex].text;
          ctx.currentLyricText=currentLyricText;
          ctx.currentLyricIndex=currentIndex;
        }
      })
      // 3监听歌曲播放完成
      audioContext.onEnded(()=>{
        this.dispatch("changeNewMusicAction")
      })
      // 4监听音乐暂停/播放/停止
      audioContext.onPlay(()=>{
        ctx.isPlaying=true;
      })
      audioContext.onPause(()=>{
        ctx.isPlaying=false;
      })
      audioContext.onStop(()=>{
        ctx.isPlaying=false;
        ctx.isStoping=true;
      })
    },
    changeMusicPlayStatusAction(ctx,isPlaying){
      ctx.isPlaying=isPlaying;
      if(ctx.isStoping&&ctx.isStoping){
        audioContext.src=`https://music.163.com/song/media/outer/url?id=${ctx.id}.mp3`;
        audioContext.title=ctx.currentSong.name;
        audioContext.autoplay=true;
      }
      ctx.isPlaying?audioContext.play():audioContext.pause()
    },
    changeNewMusicAction(ctx,isNext=true){
      let index=ctx.playListIndex;
      // 根据播放模式判断下一首
      switch(ctx.playModeIndex){
        case 0:
           isNext?index=index+1:index=index-1;
          if(index===-1){index=ctx.playListSongs.length-1}
          if(index===ctx.playListSongs.length){index=0}
          break;
        case 1:
          break;
        case 2:
          index=Math.floor(Math.random()*ctx.playListSongs.length)
          break;
      }
      // 获取到歌曲id后对这里的id进行更改
      let currentSong=ctx.playListSongs[index];
      if(!currentSong){
        currentSong=ctx.currentSong;
      }else{
        ctx.playListIndex=index;
      }
      // 播放音乐
      this.dispatch("playMusicWithSongIdAction",{id:currentSong.id,isRefresh:true});

    }
  }
})


export{
  audioContext,
  playerStore
}
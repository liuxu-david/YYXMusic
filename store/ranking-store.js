import {HYEventStore} from "hy-event-store"
// 导入歌曲排行
import {getRankings} from "../service/api_music"

const rankingsSongsMap={0:"newRanking",1:"hotRanking",2:"originRanking",3:"upRanking"};
// 推荐歌曲榜单
const rankingStore=new HYEventStore({
  state:{
    newRanking:{},//0新歌榜
    hotRanking:{},//1热歌榜推荐歌曲的数据
    originRanking:{},//2原创榜
    upRanking:{}//3飙升榜
  },
  actions:{
    getRankingDataAction(ctx){
     for(let i=0;i<4;i++){
      getRankings(i).then(res=>{
        // console.log(res.playlist);
        // ctx.hotRanking=res.playlist
        switch(i){
          case 0:
            // console.log("0新歌榜",res);
            ctx.newRanking=res.playlist
            break;
          case 1:
            // console.log("1热歌榜歌单的数据",res);
            ctx.hotRanking=res.playlist
            break;
          case 2:
            // console.log("2原创榜",res);
            ctx.originRanking=res.playlist
            break;
          case 3:
            // console.log("3飙升榜",res);
            ctx.upRanking=res.playlist
            break;
        }
      })
     }
    },
  }
});

// 导出函数，把index作为统一的出口
export{
  rankingStore,
  rankingsSongsMap
}
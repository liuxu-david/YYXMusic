import yyxRequest from "./index"

export function getBanners(){
  return yyxRequest.get('/banner',{
    type:2
  })
}
export function getRankings(idx){
  return yyxRequest.get("/top/list",{
    idx
  })
}
export function getSongMenu(cat="全部",limit=6,offset=0){
  return yyxRequest.get("/top/playlist",{
    cat,
    limit,
    offset
  })
}
// 请求歌单详情的数据
export function getSongMenuDetail(id){ 
  return yyxRequest.get("/playlist/detail/dynamic",{
    id
  })
}
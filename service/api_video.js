import yyxRequest from "./index"

// 获取视频页数据
 export function getTopMV(offset,limit=12){
  return yyxRequest.get("/top/mv",{offset,limit})
 }
// 获取视频详情页mv地址
export function getMVUrl(id){
  return yyxRequest.get('/mv/url',{
    id
  })
}
// 获取视频详情页mv数据
export function getMVDetail(mvid){
  return yyxRequest.get('/mv/detail',{
    mvid
  })
}
// 获取视频详情页mv相关视频
export function getRelatedVedio(id){
  return yyxRequest.get('/related/allvideo',{
    id
  })
}
import yyxRequest from "./index"

export function getSongDetail(ids){
  return yyxRequest.get("/song/detail",{
    ids
  })
}
export function getSongLyric(id){
  return yyxRequest.get("/lyric",{
    id
  })
}
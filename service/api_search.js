import yyxRequest from "./index"

export function getSearchHot(){
  return yyxRequest.get("/search/hot")
}
export function getSearchSuggest(keywords){
  return yyxRequest.get("/search/suggest",{
    keywords,
    type:'mobile'
  })
}

// 搜索结果数据请求
export function getSearchResult(keywords){
  return yyxRequest.get("/search",{
    keywords
  })
}
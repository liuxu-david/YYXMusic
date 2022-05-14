// 封装一个工具用查询元素矩形的数据
export default function(selector){
  return new Promise(resolve=>{
    const query = wx.createSelectorQuery()
    // 监听这个矩形，获取准确的高度
    query.select(selector).boundingClientRect()
    query.exec(res=>{
      resolve(res)
    })
  })
}
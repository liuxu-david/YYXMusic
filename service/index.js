const BASE_URL='http://123.207.32.32:9001'
class YYXRequest{
  // 自定义数据请求
  reuqest(url,method,params){
    return new Promise((resolve,reject)=>{
      wx.request({
        url:BASE_URL+ url,
        method:method,
        data:params,
        success:(res)=>{
         resolve(res.data) 
        },
        fail:(err)=>{
         reject(err)
        }
      })
    })  
  }
  get(url,params){
    return this.reuqest(url,'GET',params)
  }
  post(url,params){
    return this.reuqest(url,'POST',params)
  }
}

const yyxRequest=new YYXRequest();
export default yyxRequest
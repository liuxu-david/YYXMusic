const BASE_URL='http://123.207.32.32:9001'

// 登录接口
const LOGIN_BASE_URL='http://123.207.32.32:3000'
class YYXRequest{
  constructor(baseURL){
    this.baseURL=baseURL;
  }
  // 自定义数据请求
  reuqest(url,method,params,header={}){
    return new Promise((resolve,reject)=>{
      wx.request({
        url:this.baseURL+ url,
        method:method,
        header:header,
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
  get(url,params,header){
    return this.reuqest(url,'GET',params,header)
  }
  post(url,params,header){
    return this.reuqest(url,'POST',params,header)
  }
}

const yyxRequest=new YYXRequest(BASE_URL);
const yyxLoginRequest=new YYXRequest(LOGIN_BASE_URL);
export default yyxRequest
export{
  yyxLoginRequest
}
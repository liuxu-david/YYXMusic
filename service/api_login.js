import {yyxLoginRequest} from "./index"
export function getLoginCode(){
  return new Promise((resolve,reject)=>{
    wx.login({
      timeout: 1000,
      success:res=>{
        const code =res.code;
        resolve(code)
      },
      fail:err=>{
        console.log(err);
        reject(err)
      }
    })
  })
}
export function codeToToken(code){
  return yyxLoginRequest.post("/login",{code})
} 
export function checkToken(token){
  return yyxLoginRequest.post("/auth",{},{token})
}
export function checkSession(){
  return new Promise(resolve=>{
    wx.checkSession({
      success: (res) => {
        resolve(true)
      },
      fail:()=>{
        resolve(false)
      }
    })
  })
}
export function getUserInfo(){
  return new Promise(resolve=>{
    wx.getUserProfile({
      desc: 'Hello World',
      success:res=>{
        resolve(res);
        // console.log(res);
      }
    })
  })
}
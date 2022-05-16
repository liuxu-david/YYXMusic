// app.js
import {getLoginCode,codeToToken,checkToken,checkSession} from "./service/api_login"
import {TOKEN_KEY} from "./constants/token-const"
App({
  globalData:{
    screenWidth:0,
    screenHeight:0,
    statusBarHeight:0,
    navBarHeight:44
  },
onLaunch:async function(){
    // 1、获取屏幕高度
    const info=wx.getSystemInfoSync();
    // console.log(info);
    this.globalData.screenHeight= info.screenHeight;
    this.globalData.screenWidth=info.screenWidth;
    this.globalData.statusBarHeight=info.statusBarHeight;
    // 2让用户默认登录
    const token=wx.getStorageSync(TOKEN_KEY);
    // 查看token是否过期
    const checkResult=await checkToken(token);
    console.log(checkResult);
    // 判断session是否过期
    const isSession=await checkSession()
    if(!token||checkResult.errorCode||!isSession){
      this.loginAction()
    }
  },
 async loginAction(){
    // 1.获取code
    const code=await getLoginCode();
    // console.log(code);
    // 将code发送给服务器
    const result=await codeToToken(code);
    const token=result.token;
    wx.setStorageSync('TOKEN_KEY', token)
  }
})

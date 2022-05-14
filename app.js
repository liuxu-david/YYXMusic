// app.js
App({
  globalData:{
    screenWidth:0,
    screenHeight:0,
    statusBarHeight:0,
    navBarHeight:44
  },
  onLaunch:function(){
    const info=wx.getSystemInfoSync();
    // console.log(info);
    this.globalData.screenHeight= info.screenHeight;
    this.globalData.screenWidth=info.screenWidth;
    this.globalData.statusBarHeight=info.statusBarHeight
  }
})

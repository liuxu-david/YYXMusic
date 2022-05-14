// baseui/nav-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  options:{
    // 必须设置这个属性，否者不能使用多个插槽
    multipleSlots:true
  },
  properties: {
    title:{
      type:String,
      value:"默认标题"
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 从app.js中获取数据
    statusBarHeight:getApp().globalData.statusBarHeight,
    navBarHeight:getApp().globalData.navBarHeight
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleLeftClick(){
      this.triggerEvent("click");
    }
  }
})

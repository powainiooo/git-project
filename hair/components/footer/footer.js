// components/footer/footer.js
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    showMenu:{
      type:Boolean,
      value:false
    },
    showClose:{
      type:Boolean,
      value:false
    },
    showPrice:{
      type:Boolean,
      value:false
    }
  },
  ready(){
    this.init();
  },
  attached(){
    this.init();
  },
  /**
   * 组件的初始数据
   */
  data: {
    showMenuList:false,
    initButton:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    init(){
      if(this.data.showMenu){
        this.data.initButton.push('menu')
      }
    },
    openMenu(){
      this.setData({
        showMenu:false,
        showClose:true,
        showMenuList:true
      });
      this.triggerEvent('openMenu')
    },
    closeMenu(){
      if(this.data.initButton.includes('menu')){
        this.setData({
          showMenu:true,
          showClose:false,
          showMenuList:false
        });
        this.triggerEvent('hideMenu')
      }else{
        this.triggerEvent('doclose')
      }
    },
    dobtn(){
      this.triggerEvent('btn')
    }
  }
});

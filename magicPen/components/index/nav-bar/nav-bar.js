// components/index/nav-bar/nav-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    list:[
      {
        src: '../../../res/index/nav-icon1.png',
        name: '大屏互动',
        url: '/pages/interaction/interaction'
      },
      {
        src: '../../../res/index/nav-icon2.png',
        name: '勋章搜集',
        url: '/pages/medal/medal'
      },
      {
        src: '../../../res/index/nav-icon3.png',
        name: '作品空间',
        url: '/pages/works/list/list'
      },
      {
        src: '../../../res/index/nav-icon4.png',
        name: '个人中心',
        url: '/pages/personal/personal'
      },
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    jumpPage(e) {
      const url = e.currentTarget.dataset.url
      wx.navigateTo({
        url
      })
    }
  }
})
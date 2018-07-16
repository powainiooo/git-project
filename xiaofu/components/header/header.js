// components/header/header.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showMenu:{
      type:Boolean,
      value:true
    },
    showClose: {
      type: Boolean,
      value: false
    },
    showSearch: {
      type: Boolean,
      value: false
    },
    showShare: {
      type: Boolean,
      value: false
    },
    showShadow: {
      type: Boolean,
      value: true
    },
    showSearchFrame: {
      type: Boolean,
      value: false
    },
    name: {
      type: String,
      value: ''
    },
    keywords: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    searchAniData: {},
    navAniData: {},
    orderAniData: {},
    userInfo:{},
    navList:[
      {
        name:'小夫特饮',
        nameEn:'lee\'s drink',
        url:''
      },
      {
        name: '推荐主办方',
        nameEn: '1th organizers',
        url: '/pages/sponsor/list'
      },
      {
        name: '隶属于',
        nameEn: 'member of Ho',
        url: '/pages/member/member?page=member'
      },
      {
        name: '保险条例',
        nameEn: 'insurance Act',
        url: '/pages/member/member?page=insurance'
      },
      {
        name: '售后声明',
        nameEn: 'after sales',
        url: '/pages/member/member?page=aftersales'
      },
      {
        name: '联系方式',
        nameEn: 'contact Information',
        url: '/pages/member/member?page=contact'
      }
    ]
  },
  ready(){
    this.setData({
      userInfo: app.globalData.userInfo
    });
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toggleSearch(event){
      let isShow = event.target.dataset.val;
      let animation = wx.createAnimation({
        duration:300,
        timingFunction:'ease-in-out'
      });
      // this.animation = animation;
      
      let dis = isShow ? '0rpx' : '120rpx';
      animation.top(dis).step();
      this.setData({
        searchAniData:animation.export(),
        showSearch: isShow
      })
    },
    toggleMenu(event) {
      let isShow = event.target.dataset.val;//true 打开菜单
      let navAni = wx.createAnimation({
        duration:500,
        timingFunction: 'ease-in-out'
      });
      let delay = isShow ? 500 : 0;
      let orderAni = wx.createAnimation({
        duration: 300,
        delay: delay,
        timingFunction: 'ease-in-out'
      });

      let top = isShow ? '120rpx' : '-100%';
      let bottom = isShow ? '0' : '-300rpx';
      navAni.top(top).step();
      orderAni.bottom(bottom).step();

      this.setData({
        navAniData: navAni.export(),
        orderAniData: orderAni.export(),
        showSearch: !isShow,
        showMenu: !isShow,
        showClose: isShow,
      })
    },
    bindKeyInput: function (e) {
      this.setData({
        keywords: e.detail.value
      })
    },
    doSearch(){
      if (this.data.name != 'search'){
        wx.navigateTo({
          url: '/pages/search/search?keywords=' + this.data.keywords
        })
      }
    },
    gotoHome(){
      wx.navigateTo({
        url: '/pages/index/index'
      })
    }
  },
  
})

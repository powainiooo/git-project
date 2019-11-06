// components/header/header.js
const app = getApp()
Component({
   /**
   * 组件的属性列表
   */
   properties: {
	   initButton: {
         type: Array,
		   value: [],
		   observer (newVal) {
				this.setData({
					showMenu: newVal.includes('menu'),
					showClose: newVal.includes('close'),
					showShare: newVal.includes('share'),
					showRefresh: newVal.includes('refresh'),
					showShadow: newVal.includes('shadow'),
					showArrow: newVal.includes('arrow'),
				})
		   }
      },
      name: {
         type: String,
         value: ''
      }
   },

   /**
   * 组件的初始数据
   */
   data: {
	   showMenu: false,
	   showClose: false,
	   showShare: false,
	   showRefresh: false,
	   showShadow: false,
	   showArrow: false,
      navAniData: {},
      orderAniData: {},
      userInfo: {},
      navList: [
         {
            name: '活动购票',
            nameEn: 'lee\'s tickets',
            url: '/pages/index/index',
            type: 'reLaunch'
         },
         {
            name: '推荐主办方',
            nameEn: '1th organizers',
            url: '/pages/sponsor/list',
            type: 'navigate'
         },
         {
            name: '隶属于',
            nameEn: 'member of Ho',
            url: '/pages/member/member?page=member',
            type: 'navigate'
         },
         {
            name: '保险条例',
            nameEn: 'insurance Act',
            url: '/pages/member/member?page=insurance',
            type: 'navigate'
         },
         {
            name: '售后声明',
            nameEn: 'after sales',
            url: '/pages/member/member?page=aftersales',
            type: 'navigate'
         },
         {
            name: '联系方式',
            nameEn: 'contact Information',
            url: '/pages/member/member?page=contact',
            type: 'navigate'
         }
      ],
      showCover: false,
      isShowMenu: false,
      lastShowBtn: '',
      shareAnimate: {}
   },
   /**
   * 组件的方法列表
   */
   methods: {
      openMenu () {
         this.data.isShowMenu = true
         this.toggleMenu(this.data.isShowMenu)
         this.setData({
            userInfo: app.globalData.userInfo,
            showClose: true
         })
      },
      doClose () {
         if (this.data.isShowMenu) { // 关闭菜单
            this.data.isShowMenu = false
            this.toggleMenu(this.data.isShowMenu)
            let search = false
            let shadow = false
            if (this.data.initButton.includes('search')) {
               search = true
            }
            if (this.data.initButton.includes('shadow')) {
               shadow = true
            }
            this.setData({
               showClose: false,
               showShadow: shadow
            })
         } else { // 其它关闭操作
            this.toggleShare()
            this.triggerEvent('btntap', 'close')
         }
      },
      toggleMenu (isShow) {
         let navAni = wx.createAnimation({
            duration: 500,
            timingFunction: 'ease-in-out'
         })
         let delay = isShow ? 500 : 0
         let orderAni = wx.createAnimation({
            duration: 300,
            delay: delay,
            timingFunction: 'ease-in-out'
         })

         let top = isShow ? '120rpx' : '-100%'
         let bottom = isShow ? '0' : '-300rpx'
         navAni.top(top).step()
         orderAni.bottom(bottom).step()

         this.setData({
            navAniData: navAni.export(),
            orderAniData: orderAni.export(),
            showMenu: !isShow,
            showShadow: !isShow
         })
      },
      bindKeyInput: function (e) {
         this.setData({
            keywords: e.detail.value
         })
      },
      doSearch () {
         if (this.data.name !== 'search') {
            this.triggerEvent('dosearch', this.data.keywords)
         }
      },
	   tapArrow () {
		   this.triggerEvent('btntap', 'arrow')
      },
      doRefresh () {
         this.triggerEvent('doRefresh')
      },
      gotoHome () {
         wx.reLaunch({
            url: '/pages/index/index'
         })
      },
      doShowCover () {
         this.setData({
            showCover: true
         })
      },
      doHideCover () {
         this.setData({
            showCover: false
         })
      },
      toggleShare (event) {
         let isShow
         try {
            isShow = event.target.dataset.val
         } catch (err) {
            isShow = false
         }
         let animation = wx.createAnimation({
            duration: 300,
            timingFunction: 'ease-in-out'
         })
         let dis = isShow ? '0rpx' : '-330rpx'
         animation.bottom(dis).step()
         this.setData({
            showCover: isShow,
            shareAnimate: animation.export()
         })
      },
      drawPoster () {
	      this.triggerEvent('btntap', 'poster')
      },
      gotoLogin () {
         wx.navigateTo({
            url: '/pages/result/result?page=login'
         })
      }
   }
})

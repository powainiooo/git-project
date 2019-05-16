// components/index/nav-bar/nav-bar.js
let myDynData = null
Component({
   /**
    * 组件的属性列表
    */
   properties: {
      myDynData: {
         type: Object,
         value: null,
         observer (val) {
            if(val === null) return
            myDynData = wx.getStorageSync('myDynData')
            if (typeof myDynData === 'string' || myDynData === null) {
               wx.setStorage({
                  key:'myDynData',
                  data: val
               })
            } else {
               let list = this.data.list
               list[1].showDot = val.medalSum > myDynData.medalSum || val.medalDue === 1
               list[2].showDot = val.zanSum > myDynData.zanSum || val.userDynSum > 0
               list[3].showDot = val.fans > myDynData.fans
               this.setData({
                  list
               })
            }
         }
      }
   },

   /**
    * 组件的初始数据
    */
   data: {
      list:[
         {
            src: '../../../res/index/nav-icon1.png',
            name: '大屏互动',
            url: '/pages/interaction/interaction',
            key: 'interaction',
            showDot: false,
         },
         {
            src: '../../../res/index/nav-icon2.png',
            name: '勋章收集',
            url: '/pages/medal/medal',
            key: 'medal',
            showDot: false,
         },
         {
            src: '../../../res/index/nav-icon3.png',
            name: '作品空间',
            url: '/pages/works/list/list',
            key: 'works',
            showDot: false,
         },
         {
            src: '../../../res/index/nav-icon4.png',
            name: '个人中心',
            url: '/pages/personal/personal',
            key: 'personal',
            showDot: false,
         },
      ]
   },

   /**
    * 组件的方法列表
    */
   methods: {
      jumpPage(e) {
         const {url, key} = e.currentTarget.dataset
         if (typeof myDynData !== 'string' && myDynData !== null) {
            this.setStorage(key)
         }
         wx.navigateTo({
            url
         })
      },
      setStorage (key) {
         console.log('nav bar setStorage')
         if (key === 'medal') {
            // myDynData.medalSum = this.data.myDynData.medalSum
            this.data.myDynData.medalDue = 0
         } else if (key === 'works') {
            // myDynData.zanSum = this.data.myDynData.zanSum
            // this.data.myDynData.userDynSum = 0
         } else if (key === 'personal') {
            // myDynData.fans = this.data.myDynData.fans
         }
         wx.setStorage({
            key:'myDynData',
            data: this.data.myDynData
         })
      }
   }
})
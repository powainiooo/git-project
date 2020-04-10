// pages/select/second.js
import regeneratorRuntime from '../../utils/runtime.js'
import {getPetList} from '../../utils/api.js'
const app = getApp()
Page({

   /**
    * 页面的初始数据
    */
   data: {
	   type: '',
	   imgSrc:app.globalData.imgSrc,
	   dogList: {},
	   catList: [],
	   scrollId: '',
	   heights: {},
	   screenHeight: 0,
      selectedID: ''
   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
		const type = options.type || '1'
	   this.setData({
		   type
	   })
	   const self = this
      if (type === '1') {
         wx.getSystemInfo({
            success(res) {
               self.data.screenHeight = res.screenHeight
            }
         })
         this.initSize()
      }
	   this.getData()
   },
	getData () {
		getPetList({
			type: this.data.type
		}).then(res => {
			if (this.data.type === '1') { // 狗
				let obj = {}
				for (let i of res.data) {
					if (!obj[i.head_str]) obj[i.head_str] = []
					obj[i.head_str].push(i)
				}
				this.setData({
					dogList: obj
				})
				wx.nextTick(() => {
					this.initSize()
				})
			} else if (this.data.type === '2') { //猫
				this.setData({
					catList: res.data
				})
			}
		})
	},
	async initSize () {
   	for (let i in this.data.dogList) {
   		this.data.heights[i] = 0
	   }
   	for (let i in this.data.dogList) {
		   const res = await this.getHeights(i)
		   this.data.heights[i] = res.height
	   }
   	let add = 0
   	let index = 0
   	for (let i in this.data.heights) {
   		if (index === 0) {
			   this.data.heights[i] = 0
		   } else {
			   this.data.heights[i] += add
		   }
		   add = this.data.heights[i]
		   index += 1
	   }
		console.log(this.data.heights)
	},
	getHeights (id) {
   	return new Promise((resolve, reject) => {
		   wx.createSelectorQuery().select(`#${id}`).boundingClientRect((rect) => {
			   resolve(rect)
		   }).exec()
	   })
	},
	gotoBlock (e) {
   	const id = e.target.dataset.id
		this.setData({
			scrollId: `${id}`
		})
	},
	scroll (e) {
   	// console.log(e.detail.scrollTop)
	},
	doSelect (e) {
      console.log(e)
      const id = e.currentTarget.dataset.item.id
      this.setData({
         selectedID: id
      })
	},
	doNext () {
		if (this.data.selectedID === '') {
			wx.showToast({
				title: '请选择宠物品种',
				icon: 'none'
			});
		} else {
			app.globalData.petId = this.data.selectedID
			wx.navigateTo({
				url: '/pages/package/package'
			})
		}

	},
   /**
    * 生命周期函数--监听页面初次渲染完成
    */
   onReady: function () {

   },

   /**
    * 生命周期函数--监听页面显示
    */
   onShow: function () {

   },

   /**
    * 生命周期函数--监听页面隐藏
    */
   onHide: function () {

   },

   /**
    * 生命周期函数--监听页面卸载
    */
   onUnload: function () {

   },

   /**
    * 页面相关事件处理函数--监听用户下拉动作
    */
   onPullDownRefresh: function () {

   },

   /**
    * 页面上拉触底事件的处理函数
    */
   onReachBottom: function () {

   },

   /**
    * 用户点击右上角分享
    */
   onShareAppMessage: function () {

   }
})

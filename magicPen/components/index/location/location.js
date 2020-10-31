// components/index/location/location.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		locationData: {
			type: Object,
			value: {}
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		statusBarHeight: 0
	},
	attached () {
		wx.getSystemInfo({
			success: e => {
				this.setData({
					statusBarHeight: e.statusBarHeight
				})
			}
		})
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		openStore(){
			wx.navigateTo({
				url: '/pages/map/map'
			})
		}
	}
})

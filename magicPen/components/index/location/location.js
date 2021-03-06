// components/index/location/location.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		locationData: {
			type: Object,
			value: {}
		},
		isTop: {
			type: Boolean,
			value: true
		}
		// scrollTop: {
		// 	type: Number,
		// 	value: 0,
		// 	observer (val) {
		// 		this.setData({
		// 			isTop: val < 50
		// 		})
		// 	}
		// }
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		statusBarHeight: 0,
		// isTop: true
	},
	attached () {
		wx.getSystemInfo({
			success: e => {
				this.setData({
					statusBarHeight: e.statusBarHeight + 6
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

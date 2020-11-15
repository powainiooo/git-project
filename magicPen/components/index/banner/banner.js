// components/index/banner/banner.js
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		listData: {
			type: Array,
			value: []
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		src: ''
	},
	/**
	 * 组件的方法列表
	 */
	methods: {
		linkWeb (e) {
			const {src} = e.currentTarget.dataset
			const url = 'appid:wxf5f0af8af285a2e6'
			console.log(/appid:/.test(url))
			if (src !== null) {
				if (/url:/.test(src)) {
					const url = src.replace('url:', '')
					wx.navigateTo({
						url: '/pages/webview/webview?src='+url
					})
				} else {
					const appid = src.replace('appid:', '')
					wx.navigateToMiniProgram({
						appId: appid,
						success () {
							console.log('to other wxapp success,', appid)
						}
					})
				}

			}
		}
	}
})

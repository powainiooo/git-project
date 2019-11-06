const ajaxUrl = getApp().globalData.ajaxSrc
const ajax = (opts, autoMsg = true) => {
	return new Promise((resolve, reject) => {
		wx.showNavigationBarLoading()
		const extras = {
			success(res) {
				if(res.data.status === 0) {
					resolve(res.data)
				}else {
					console.log(res.data)
					resolve(res.data)
				}
				wx.hideNavigationBarLoading()
			},
			fail(err) {
				wx.navigateTo({
					url: '/pages/error/error'
				})
				wx.hideNavigationBarLoading()
				reject()
			}
		}
		wx.request({...opts, ...extras})
	})
}

// 首页banner 地址
export const getBannerCity = () => {
	return ajax({
		url: `${ajaxUrl}/city_banner`
	})
}

// 首页列表数据
export const getIndexListData = (data) => {
	return ajax({
		url: `${ajaxUrl}/pro_list`,
		data
	})
}

// 首页详情数据
export const getIndexDetailData = (data) => {
	return ajax({
		url: `${ajaxUrl}/product_info`,
		data
	})
}

// 生成订单
export const createOrder = (data) => {
	return ajax({
		url: `${ajaxUrl}/create_order`,
		data
	})
}

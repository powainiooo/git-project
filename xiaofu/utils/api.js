const ajaxUrl = getApp().globalData.ajaxSrc
const ajax = (opts, autoMsg = true) => {
	return new Promise((resolve, reject) => {
		wx.showNavigationBarLoading()
		const extras = {
         header: {'content-type': 'application/x-www-form-urlencoded'},
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
			   console.log(err)
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

// 首页banner 地址 ${ajaxUrl}/city_banner  http://localhost:8080/mock/banner.json
export const getBannerCity = () => {
	return ajax({
		// url: `${ajaxUrl}/city_banner`
		url: `http://localhost:8080/mock/banner.json`
	})
}

// 首页列表数据 ${ajaxUrl}/pro_list  http://localhost:8080/mock/list.json
export const getIndexListData = (data) => {
	return ajax({
		// url: `${ajaxUrl}/pro_list`,
		url: `http://localhost:8080/mock/list.json`,
		data
	})
}

// 首页详情数据 ${ajaxUrl}/product_info http://localhost:8080/mock/detail.json
export const getIndexDetailData = (data) => {
	return ajax({
		url: `${ajaxUrl}/product_info`,
		// url: `http://localhost:8080/mock/detail.json`,
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

// 获取日期是否有活动
export const getActivityDays = (data) => {
	return ajax({
		url: `${ajaxUrl}/activity_days`,
		data
	})
}

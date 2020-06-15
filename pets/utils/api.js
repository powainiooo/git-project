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

// 查询当月每天的预约数
export const getActivityDays = (data) => {
	return ajax({
		url: `${ajaxUrl}/reser_month`,
		data
	})
}

// 取宠物类型列表
export const getPetList = (data) => {
	return ajax({
		url: `${ajaxUrl}/pet_type`,
		data
	})
}

// 用户当前账户余额
export const getUserMoney = (data) => {
	return ajax({
		url: `${ajaxUrl}/user_money`,
		data
	})
}

// 用户当前账户余额
export const getAjax = (url, data = {}) => {
	return ajax({
		url: `${ajaxUrl}${url}`,
		data
	})
}



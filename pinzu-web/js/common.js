/*
* 登录注册
*  */
// 打开登录
function openLogin () {
	$('#login').show()
	$('#loginContainer').show()
	$('#registerContainer').hide()
}
// 打开注册
function openRegister () {
	$('#login').show()
	$('#registerContainer').show()
	$('#loginContainer').hide()
}
$('#yzmTabs').on('click', function () {
	$('#yzmLogin').show()
	$('#phoneLogin').hide()
	$(this).addClass('active').siblings('li').removeClass('active')
})

$('#phoneTabs').on('click', function () {
	$('#phoneLogin').show()
	$('#yzmLogin').hide()
	$(this).addClass('active').siblings('li').removeClass('active')
})
// 关闭登录
function closeLogin () {
	$('#login').hide()
}

/* 数量选择 */
$('.numsBox .numsReduce').on('click', function () {
	var input = $(this).parents('.numsBox').find('input')
	var val = Number(input.val())
	if (val !== 0) {
		input.val(val - 1)
	}
})
$('.numsBox .numsAdd').on('click', function () {
	var input = $(this).parents('.numsBox').find('input')
	var val = Number(input.val())
	input.val(val + 1)
})

/* 下拉框 */
$('.cSelects select').on('change', function () {
	var text = $(this).find('option:selected').text()
	$(this).prev('.selectValue').html(text)
})


/* 优惠券打开关闭 */
function showCoupon() {
	$("#couponContainer").css('right', '0')
}
function hideCoupon() {
	$("#couponContainer").css('right', '-280px')
}

/* 全局弹窗 */
function cModal(opts) {
	var config = {
		type: 'normal', // 弹窗类型 normal warn success
		title: '提醒', // 弹窗标题
		content: '', // 弹窗内容
		confirmText: '确认', // 确认按钮名
		cancelText: '取消', // 取消按钮名
		onOk: function () {}, // 确认按钮弹窗额外执行方法
		onCancel: function () {} // 取消按钮弹窗额外执行方法
	}
	if (typeof opts === "undefined") {
		config.content = ''
	} else if (typeof opts === "string") {
		config.content = opts
	} else if (typeof opts === "object") {
		Object.assign(config, opts)
	}
	var html = []
	html.push('<div class="c-modal cModal">')
	html.push('<div class="c-modal-bg">')
	html.push('<div class="c-modal-body checkIn-modal">')
	html.push('<div class="c-modal-header">')
	html.push('<h3>' + config.title + '</h3>')
	html.push('<a href="javascript:;" class="close cModalClose"><img src="img/x.png" /></a>')
	html.push('</div>')
	var className = ''
	if (config.type === 'warn') {
		className = 'c-modal-content-warn'
	} else if (config.type === 'success') {
		className = 'c-modal-content-suc'
	}
	html.push('<div class="c-modal-content ' + className + '">' + config.content + '</div>')
	html.push('<div class="c-modal-btns">')
	html.push('<button class="btn-main cModalConfirm">' + config.confirmText + '</button>')
	html.push('<button class="btn cModalClose">' + config.cancelText + '</button>')
	html.push('</div></div></div></div>')
	$("body").append(html.join(''))

	$(".cModalClose").on('click', function () {
		$(this).parents('.cModal').remove()
		if (typeof config.onCancel === 'function') {
			config.onCancel()
		}
	})
	$(".cModalConfirm").on('click', function () {
		$(this).parents('.cModal').remove()
		if (typeof config.onOk === 'function') {
			config.onOk()
		}
	})
}

/* 星数评论 */
$(".starsRate li").on('click', function () {
	var index = $(this).index()
	var list = $(this).parents('.starsRate').find('li')
	for (var i = 0; i < list.length; i++) {
		if (i <= index) {
			list.eq(i).addClass('active')
		} else {
			list.eq(i).removeClass('active')
		}
	}
	$(this).parents('.starsRate').find('input').val(index + 1)
})

/* 输入框检测 */
$(".textarea textarea").on('input', function () {
	var val = $(this).val()
	$(this).parents('.textarea').find('.curLen').html(val.length)
})

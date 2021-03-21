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

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

/*
* 上传组件初始化
* z-upload-style2 实线样式
* z-upload-readonly 如果只展示图片不适用上传功能 添加此class
* */
function initUpload(id) {
	var frame = $(id)
	var input = frame.find('input')
	var img = frame.find('img')
	frame.on('click', function () {
		if (!frame.hasClass('z-upload-readonly')) {
			input.click()
		}
	})
	input.on('click', function (e) {
		e.stopPropagation()
	})
	input.on('change', function (e) {
		console.log(e)
		var file = e.currentTarget.files[0]
		var reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = function (ev) {
			img.attr('src', ev.currentTarget.result)
			frame.addClass('z-upload-img')
		}
	})
}

// 显示审核意见
function showCheckBack(msg) {
	var html = ''
	html += '<div class="z-modal" id="checkBack">' +
		 '<div class="z-modal-frame" style="width: 450px; height: 240px;">' +
		 '<a href="javascript:;" class="z-modal-frame-close"></a>' +
		 '<div class="check-back-frame">' +
		 '<div class="title">' +
		 '<i></i>' +
		 '<span>审核意见</span>' +
		 '</div>' +
		 '<div class="content">'+ msg +'</div>' +
		 '</div></div></div>'
	$("body").append(html)
	$("#checkBack .z-modal-frame-close").on('click', function () {
		$("#checkBack").remove()
	})
}

// confirm 弹窗
function showConfirm(msg, callback) {
	var html = ''
	html += '<div class="z-modal" id="confirm">' +
		 '<div class="z-modal-frame" style="width: 460px; height: 280px;">' +
		 '<div class="confirm-frame">' +
		 '<i class="icon-warn"></i>' +
		 '<div class="content">'+ msg +'</div>' +
		 '<div class="btns">' +
		 '<a href="javascript:;" class="confirm">确定</a>' +
		 '<a href="javascript:;" class="cancel">取消</a>' +
		 '</div></div></div></div>'
	$("body").append(html)
	$("#confirm .confirm").on('click', function () {
		if (typeof callback === 'function') {
			callback()
		}
		$("#confirm").remove()
	})
	$("#confirm .cancel").on('click', function () {
		$("#confirm").remove()
	})
}

// alert 弹窗
function showAlert(msg, submsg) {
	var html = ''
	html += '<div class="z-modal" id="alert">' +
		 '<div class="z-modal-frame" style="width: 460px; height: 280px;">' +
		 '<a href="javascript:;" class="alert-close"><i></i></a>' +
		 '<div class="alert-frame">' +
		 '<i class="icon-success"></i>' +
		 '<div class="content">'+ msg +'</div>'
	if (submsg) {
		html += '<div class="sub-content">'+ submsg +'</div>'
	}
	 html += '</div></div></div>'
	$("body").append(html)
	$("#alert .alert-close").on('click', function () {
		$("#alert").remove()
	})
}

// 设置菜单选中
// level1 一级菜单序号 0为第一个
// level2 二级菜单序号 如果没有就不传
function setMenu(level1, level2) {
	var li = $("#menu>li", parent.document)
	$("#menu li", parent.document).removeClass('active')
	li.eq(level1).addClass('active')
	if (level2 !== undefined) {
		li.find('li').eq(level2).addClass('active')
	}
}

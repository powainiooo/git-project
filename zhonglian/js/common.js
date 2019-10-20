// 上传组件初始化
function initUpload(id) {
    var frame = $(id)
    var input = frame.find('input')
    var img = frame.find('img')
    frame.on('click', function () {
        input.click()
    })
    input.on('click', function (e) {
        e.stopPropagation()
    })
    input.on('change', function (e) {
        var file = e.currentTarget.files[0]
        var reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function (ev) {
            img.attr('src', ev.currentTarget.result)
            frame.addClass('z-upload-img')
        }
    })
}
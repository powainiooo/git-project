$(function(){
    initUpload();
});
function initUpload(){
    $(".form-upload .img").off('click');
    $(".form-upload .file").off('change');
    //ÉÏ´«Í¼Æ¬
    $(".form-upload .img").on('click',function(){
        $(this).nextAll('.file').click();
    });
    $(".form-upload .file").on('change',function(e){
        var self = $(this);
        var file = event.target.files[0];
        var fr = new FileReader();
        fr.onload = function(result){
            self.parents('.form-upload').find('.img').removeClass('img-empty');
            self.parents('.form-upload').find('img').attr("src",result.currentTarget.result);
        };
        fr.readAsDataURL(file);
    });
}
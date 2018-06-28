(function(){
    var swiper1 = {
        index:0,
        speed:2000,
        isMoving:false,
        frame:$("#slide1>.swiper-wrapper"),
        items:$("#slide1>.swiper-wrapper>.swiper-slide"),
        length:$("#slide1>.swiper-wrapper>.swiper-slide").length,
        move:function(direc){
            if(this.isMoving) return;
            this.isMoving = true;

            if(direc == 'up'){
                if(this.index == 0) return;
                this.index --;
            }else if(direc == 'down'){
                if(this.index == this.length - 1) return;
                this.index ++;
            }

            var h = 0;
            for(var i=1;i<this.index+1;i++){
                h += parseInt(this.items.eq(i).height());
            }
            this.frame.css({
                'transform':'translate(0,'+(-h)+'px)',
                'transition-duration':this.speed+'ms'
            });

            this.moveStart();
            this.moveEnd();
        },
        moveStart:function(){
            if(this.index == 0){
                $("#phone").removeClass('phone-small');
                $("#header").removeClass('header-up');
            }else if(this.index == 1){
                $("#phone").addClass('phone-small');
                $("#header").addClass('header-up');
            }
        },
        moveEnd:function(){
            var self = this;
            setTimeout(function(){
                self.isMoving = false;
            },self.speed)
        }
    };
    var swiper2 = {
        index:0,
        selectors:$("#slide2>.swiper-wrapper>.swiper-slide"),
        length:$("#slide2>.swiper-wrapper>.swiper-slide").length
    };

    $('#slide1').mousewheel(function (event, delta) {
        if(delta == -1){//down
            swiper1.move('down');
        }else if(delta == 1){//up
            swiper1.move('up');
        }
    });
})();
<style>
    .poster-frame{ width: 100vw; height: 100vh; position: absolute; top: 0; left: 0; z-index: 600; font-size: 0; overflow-x: hidden; overflow-y: scroll;}
    .poster-frame canvas{ width: 100vw;}
    .poster-frame .btns{ width: 100%; display: flex; justify-content: space-around; margin-bottom: 15px;}
    .poster-frame .btns a{ width: 2.7rem; height: 0.8rem; border-radius: 30px; color: #FFFFFF; font-size: 0.36rem; display: flex; justify-content: center; align-items: center; background-color: #2B5FD5; text-decoration: none;}
</style>

<template>
    <div class="poster-frame" v-show="showPoster" :style="{background:bgColor}" @touchmove.stop="touchmove">
        <canvas id="poster" width="750" height="1213"></canvas>
        <div class="btns">
            <a href="javascript:;" @click="showPoster = false">换个风格</a>
            <a href="javascript:;" @click="doShare">分享给好友</a>
        </div>
    </div>
</template>

<script type='es6'>
    function getImg(src){
        return new Promise((resolve,reject)=>{
            let img = new Image();
            img.onload = function(){
                resolve(img);
            };
            img.onerror = function(){
                reject(new Error('Could not load image at ' + src));
            };
            img.src = src;
        })
    }
    let canvas;
    export default {
        name: 'app',
        props:['styleKey'],
        data(){
            return{
                showPoster:false,
                car:'秦',
                name:'王家卫',
                textArr:['别人总是问我，为什么早出晚归？我也不知道，可是，忙碌跟充实的感觉真像。现在，是我距离节能王者最近的时候，只有0.001毫米，8760个小时之后，我依旧是个王者。','在远程解锁后的1小时27分36秒，一个念头一闪而过，原来，我是一个科技先锋。然而，2018年12月21日14点27分，年度报告生成的这一刻，我被确诊为健忘症，所幸，我仍旧可以用云服务解锁。','别以为要了解一个人是很容易的事，用的越久，云服务越懂你!'],
                bgColor:'#fff'
            }
        },
        methods:{
            touchmove(){},
            draw(){
                this.showPoster = true;
                canvas = document.getElementById('poster');
                let ctx = canvas.getContext('2d');
                let title = '/static/images/title10.png';
                let colorArr = ['#efe9e1','#f0f9fe','#fff1fe'];
                window.tagStyle = this.styleKey;
                window.posterTimes += 1;
                this.bgColor = colorArr[this.styleKey-1];
                if(this.styleKey == 1){
                    title = '/static/images/title11.png';
                }
                let src = `/static/images/bg-share-${this.styleKey}.jpg`;
                Promise.all([
                    getImg(src),
                    getImg(title)
                ]).then((res)=>{
                    let tag = 'style'+window.tagStyle;
                    this[tag](ctx,res);
                })
            },
            style1(ctx,res){
                ctx.drawImage(res[0],0,0);
                ctx.drawImage(res[1],570,850);

                //姓名
                ctx.font = '40px Micro Yahei';
                ctx.fillStyle = '#2F7478';
                ctx.fillText('我是',375-(this.name.length+2)*20,200);
                ctx.fillStyle = '#2B5FD5';
                ctx.fillText(this.name,375+80-(this.name.length+2)*20,200);

                //框
                ctx.beginPath();
                ctx.moveTo(375-(this.name.length+2)*20-20,185);
                ctx.lineTo(30,185);
                ctx.lineTo(30,1150);
                ctx.lineTo(720,1150);
                ctx.lineTo(720,185);
                ctx.lineTo(375-(this.name.length+2)*20-20+(this.name.length+2)*40+40,185);
                ctx.strokeStyle = '#2F7478';
                ctx.stroke();

                //车型
                ctx.font = '30px Micro Yahei';
                ctx.fillStyle = '#2F7478';
                ctx.textAlign = 'center';
                ctx.fillText('我想告诉你，我的车是'+this.car,375,250);

                //内容
                ctx.font = '24px Micro Yahei';
                ctx.fillStyle = '#2F7478';
                ctx.textAlign = 'start';
                let txtHeight = 320;
                for(let i=0;i<this.textArr.length;i++){
                    let h = ctx.wrapText(this.textArr[i],65,txtHeight,623,50);
                    txtHeight = h+70;
                }
            },
            style2(ctx,res){
                ctx.drawImage(res[0],0,0);
                ctx.drawImage(res[1],580,800);

                //姓名
                ctx.font = '40px Micro Yahei';
                ctx.fillStyle = '#333333';
                ctx.fillTextVertical('我是',560,110);
                ctx.fillStyle = '#2B5FD5';
                ctx.fillTextVertical(this.name,560,195);
                ctx.beginPath();
                ctx.moveTo(600,70);
                ctx.lineTo(600,185+(this.name.length+2)*20);
                ctx.strokeStyle = '#000000';
                ctx.stroke();

                //车型
                ctx.font = '30px Micro Yahei';
                ctx.fillStyle = '#333333';
                ctx.fillTextVertical('我想告诉你，我的车是'+this.car,490,100);
                ctx.beginPath();
                ctx.moveTo(520,70);
                ctx.lineTo(520,185+(this.car.length+10)*20);
                ctx.strokeStyle = '#000000';
                ctx.stroke();

                //文案
                let arr = [];
                let per = 35;
                ctx.font = '24px Micro Yahei';
                ctx.fillStyle = '#666666';
                for(let i=0;i<this.textArr.length;i++){
                    let item = this.textArr[i];
                    let len = Math.ceil(item.length/per);
                    for(let j=0;j<len;j++){
                        let str = item.substr(j*per,per);
                        arr.push(str)
                    }
                }
                for(let i=0;i<arr.length;i++){
                    ctx.fillTextVertical(arr[i],420-i*50,94);
                }
            },
            style3(ctx,res){
                ctx.drawImage(res[0],0,0);
                ctx.drawImage(res[1],64,880);

                //姓名
                ctx.font = '40px Micro Yahei';
                ctx.fillStyle = '#333333';
                ctx.fillText('我是',64,240);
                ctx.fillStyle = '#2B5FD5';
                ctx.fillText(this.name,64+80,240);

                //车型
                ctx.font = '30px Micro Yahei';
                ctx.fillStyle = '#333333';
                ctx.fillText('我想告诉你，我的车是'+this.car,64,300);

                //内容
                ctx.font = '24px Micro Yahei';
                ctx.fillStyle = '#333333';
                ctx.textAlign = 'start';
                let txtHeight = 370;
                for(let i=0;i<this.textArr.length;i++){
                    let h = ctx.wrapText(this.textArr[i],65,txtHeight,623,50);
                    txtHeight = h+70;
                }
            },
            doShare(){
                window.posterimgData = canvas.toDataURL().replace('data:image/png;base64,','');
                let endTime = new Date().getTime();
                if(window.stayTime['page'+window.outPage]){
                    window.stayTime['page'+window.outPage] += endTime - window.intoPageStartTime;
                }else{
                    window.stayTime['page'+window.outPage] = endTime - window.intoPageStartTime;
                }
                window.location = '/doShare';
            },
            doError(){
                window.location = '/error';
            }
        }
    }
    CanvasRenderingContext2D.prototype.wrapText = function (text, x, y, maxWidth, lineHeight) {
        if (typeof text != 'string' || typeof x != 'number' || typeof y != 'number') {
            return;
        }

        var context = this;
        var canvas = context.canvas;

        if (typeof maxWidth == 'undefined') {
            maxWidth = (canvas && canvas.width) || 300;
        }
        if (typeof lineHeight == 'undefined') {
            lineHeight = (canvas && parseInt(window.getComputedStyle(canvas).lineHeight)) || parseInt(window.getComputedStyle(document.body).lineHeight);
        }

        // 字符分隔为数组
        var arrText = text.split('');
        var line = '';

        for (var n = 0; n < arrText.length; n++) {
            var testLine = line + arrText[n];
            var metrics = context.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                context.fillText(line, x, y);
                line = arrText[n];
                y += lineHeight;
            } else {
                line = testLine;
            }
        }
        context.fillText(line, x, y);
        return y
    };
    CanvasRenderingContext2D.prototype.fillTextVertical = function (text, x, y) {
        var context = this;
        var canvas = context.canvas;

        var arrText = text.split('');
        var arrWidth = arrText.map(function (letter) {
            return context.measureText(letter).width;
        });

        var align = context.textAlign;
        var baseline = context.textBaseline;

        if (align == 'left') {
            x = x + Math.max.apply(null, arrWidth) / 2;
        } else if (align == 'right') {
            x = x - Math.max.apply(null, arrWidth) / 2;
        }
        if (baseline == 'bottom' || baseline == 'alphabetic' || baseline == 'ideographic') {
            y = y - arrWidth[0] / 2;
        } else if (baseline == 'top' || baseline == 'hanging') {
            y = y + arrWidth[0] / 2;
        }

        context.textAlign = 'center';
        context.textBaseline = 'middle';

        // 开始逐字绘制
        arrText.forEach(function (letter, index) {
            // 确定下一个字符的纵坐标位置
            var letterWidth = arrWidth[index];
            // 是否需要旋转判断
            var code = letter.charCodeAt(0);
            if (code <= 256) {
                context.translate(x, y);
                // 英文字符，旋转90°
                context.rotate(90 * Math.PI / 180);
                context.translate(-x, -y);
            } else if (index > 0 && text.charCodeAt(index - 1) < 256) {
                // y修正
                y = y + arrWidth[index - 1] / 2;
            }
            context.fillText(letter, x, y);
            // 旋转坐标系还原成初始态
            context.setTransform(1, 0, 0, 1, 0, 0);
            // 确定下一个字符的纵坐标位置
            var letterWidth = arrWidth[index];
            y = y + letterWidth;
        });
        // 水平垂直对齐方式还原
        context.textAlign = align;
        context.textBaseline = baseline;
    };
</script>


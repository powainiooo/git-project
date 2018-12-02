<style>
    .poster-frame{ width: 100vw; height: 100vh; position: absolute; top: 0; left: 0; z-index: 600; font-size: 0; overflow-x: hidden; overflow-y: scroll;}
    .poster-frame canvas{ width: 100vw;}
    .poster-frame .btns1{ width: 100%; display: flex; justify-content: space-around; margin-bottom: 15px;}
    .poster-frame .btns1 a{ width: 2.7rem; height: 0.8rem; border-radius: 30px; color: #FFFFFF; font-size: 0.36rem; display: flex; justify-content: center; align-items: center; background-color: #2B5FD5; text-decoration: none;}

    .poster-frame .hint{ display: flex; background-color: #fff; border-radius: 20px; font-size: 14px; color: #333; position: absolute; top: 17%; left: 50%; z-index: 20; align-items: center; padding: 4px 10px;}
    .poster-frame .hint2{ top: 22vh; left: 44%; flex-direction: row-reverse;}
    .poster-frame .hint3{ top: 14.5vh; left: 38%;}
    .poster-frame .hint  img{ width: 20px; margin:0 5px;}

    .poster-frame .btn-name{ width: 80px; height: 30px; background-color: rgba(0,0,0,0);position: absolute; top: 12vh; left: 46%; z-index: 25;}
    .poster-frame .btn-name2{ width: 30px; height: 80px; top: 11vh; left: 70%;}
    .poster-frame .btn-name3{ top: 14.5vh; left: 19%;}
</style>

<template>
    <div class="poster-frame" v-show="showPoster" :style="{background:bgColor}" @touchmove.stop="touchmove">
        <canvas id="poster" width="750" height="1213"></canvas>
        <div class="btns1">
            <a href="javascript:;" @click="showPoster = false">换个风格</a>
            <a href="javascript:;" @click="doShare">分享给好友</a>
        </div>

        <div class="btn-name" :class="'btn-name'+styleKey" @click="showName = true"></div>
        <div class="hint" :class="'hint'+styleKey" @click="showName = true">
            <img src="@/assets/images/hand.png">
            <span>点击可修改姓名</span>
        </div>

        <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <div class="style-container" v-if="showName">
                <div class="style-frame">
                    <h3>选择风格</h3>
                    <p style="margin: 20px;"><input type="text" v-model="name"></p>
                    <div class="btns">
                        <a href="javascript:;" @click="showName = false">取消</a>
                        <a href="javascript:;" @click="draw">确定</a>
                    </div>
                </div>
            </div>
        </transition>
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
    import textConfig from '@/assets/document.json'
    export default {
        name: 'app',
        props:['styleKey'],
        data(){
            return{
                showPoster:false,
                showName:false,
                car:'秦',
                name:'王家卫',
                textArr:[],
                bgColor:'#fff'
            }
        },
        computed:{
            tag1(){
                return '朝九晚五'
            },
            tag2(){
                return '会省钱'
            },
            tag3(){
                return '科技先锋'
            },
            tag4(){
                return '分享达人'
            }
        },
        methods:{
            touchmove(){},
            initText(){
                let data = textConfig.poster['style'+this.styleKey];
                this.textArr = [];
                if(this.styleKey == 3)this.textArr.push('2018年，我们度过了激动人心的一年： ');
                this.textArr.push(data[this.tag1]);
                this.textArr.push(data[this.tag2]);
                this.textArr.push(data[this.tag3]);
                this.textArr.push(data[this.tag4]);
                this.textArr.push(data.add);
            },
            draw(){
                this.showPoster = true;
                this.showName = false;
                this.initText();
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
                ctx.drawImage(res[1],570,890);

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
                    txtHeight = h+60;
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
                ctx.fillTextVertical('2018年，我遇见了我人生中的最爱，就是'+this.car,490,100);
                ctx.beginPath();
                ctx.moveTo(520,70);
                ctx.lineTo(520,185+(this.car.length+23)*20);
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
                    ctx.fillTextVertical(arr[i],430-i*45,94);
                }
            },
            style3(ctx,res){
                ctx.drawImage(res[0],0,0);
                ctx.drawImage(res[1],580,900);

                //姓名
                ctx.font = '40px Micro Yahei';
                ctx.fillStyle = '#333333';
                ctx.fillText('我是',64,240);
                ctx.fillStyle = '#2B5FD5';
                ctx.fillText(this.name,64+80,240);

                //车型
                ctx.font = '30px Micro Yahei';
                ctx.fillStyle = '#333333';
                ctx.wrapText('我对钱没有兴趣哦，我的爱车是'+this.car,64,300,623,50);

                //内容
                ctx.font = '24px Micro Yahei';
                ctx.fillStyle = '#333333';
                ctx.textAlign = 'start';
                let txtHeight = 370;
                for(let i=0;i<this.textArr.length;i++){
                    let h = ctx.wrapText(this.textArr[i],65,txtHeight,623,50);
                    txtHeight = h+60;
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


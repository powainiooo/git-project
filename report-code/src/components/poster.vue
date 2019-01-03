<style>
    .poster-frame{ width: 100vw; height: 100vh; position: absolute; top: 0; left: 0; z-index: 600; font-size: 0; overflow: hidden;}
    .poster-frame canvas{ width: 100vw; position: fixed; top: -10000px; left: -10000px;}
    .poster-frame .shareImg{ width: 100vw; height:161.7vw;  display: block;}
    .poster-frame .btns1{ width: 100%; display: flex; justify-content: space-around; position: absolute; top: 89vh; left: 0;}
    .poster-frame .btns1 a{ width: 2.7rem; height: 0.8rem; border-radius: 30px; color: #FFFFFF; font-size: 0.32rem; display: flex; justify-content: center; align-items: center; background-color: #2B5FD5; text-decoration: none;}

    .poster-frame .hint{ width: 110px; display: flex; background-color: #fff; border-radius: 20px; font-size: 14px; color: #333; position: absolute; top: 21vw; left: 5vw; z-index: 20; align-items: center; padding: 4px 10px; transform-origin: 0 50%;}
    .poster-frame .hint2{ top: 35vw; left: 71vw; width: 20px; flex-direction: column; justify-content: center; align-items: center; padding: 10px 6px; text-align: center; transform-origin: 50% 0;}
    .poster-frame .hint3{ top: 25.5vw; left: 33vw;}
    .poster-frame .hint  img{ width: 20px; margin-right:5px;}

    .poster-frame .btn-name{ min-width: 12vw;  height: 10vw; background-color: rgba(0,0,0,0);position: absolute; top: 20vw; left: 45vw; z-index: 25;}
    .poster-frame .btn-name2{ width: 10vw; height: 15vw; top: 20vw; left: 70vw;}
    .poster-frame .btn-name3{ top: 25vw; left: 19vw;}

    .poster-frame .btn-close{ width: 8vw; position: absolute; top: 3vw; right: 3vw;}
</style>

<template>
    <div class="poster-frame" v-show="showPoster" :style="{background:bgColor}" @touchmove.stop="touchmove">
        <canvas id="poster" width="750" height="1213"></canvas>
        <img :src="shareImgSrc" class="shareImg" :style="{opacity:shareImgSrc == '' ? 0 : 1}"/>
        <div class="btns1">
            <a href="javascript:;" @click="doChange">换个风格</a>
            <a href="javascript:;" @click="doShare">分享给好友</a>
        </div>

        <div class="btn-close" @click="closePoster"><img src="@/assets/images/btn-close.png"/> </div>

        <div class="btn-name" :class="'btn-name'+styleKey" @click="showEditor">{{name}}</div>
        <div class="hint"
             v-if="showHint"
             :class="'hint'+styleKey"
             @click="showEditor"
             :style="{left:hintLeft+'px',top:hintTop+'px',transform:'scale('+hintScale+')'}">
            <img src="@/assets/images/hand.png">
            <span>点击编辑姓名</span>
        </div>

        <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <div class="style-container" v-if="showName">
                <div class="style-frame">
                    <h3>编辑名字</h3>
                    <p style="margin: 20px; margin-bottom: 0;"><input type="text" v-model="lastname" maxlength="5" /></p>
                    <p style="margin: 20px; margin-top: 0; font-size: 12px; color: #ccc;" v-if="!nameError">所取名字仅在生成小传时使用</p>
                    <p style="margin: 20px; margin-top: 0; font-size: 12px; color: #f00;" v-if="nameError">名字不能为空</p>
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
    import window from './params.js'
    export default {
        name: 'app',
        props:['styleKey'],
        data(){
            return{
                showPoster:false,
                showName:false,
                car:getParams.carType,
                name:getParams.userName,
                lastname:getParams.userName,
                textArr:[],
                bgColor:'#fff',
                shareImgSrc:'',
                showHint:false,
                hintLeft:0,
                hintTop:0,
                hintScale:1,
                nameError:false
            }
        },
        computed:{
            tagList(){
                let tagName = ['P2','P4','P7','P8'],arr = [],data = this.$store.state.pageData;
                for(let item of tagName){
                    if(data[item] != undefined && data[item].tag != undefined){
                        arr.push(data[item].tag)
                    }
                }
                return arr
            }
        },
        methods:{
            touchmove(){},
            showEditor(){
                this.nameError = false;
                this.lastname = this.name;
                this.showName = true;
            },
            doChange(){
                this.lastname = this.name;
                //this.closePoster();
                this.$emit('showChange')
            },
            closePoster(){
                this.showPoster = false;
                this.showHint = false;
            },
            initText(){
                let data = textConfig.poster['style'+this.styleKey];
                this.textArr = [];
                if(this.styleKey == 3)this.textArr.push('2018年，我们度过了激动人心的一年： ');
                for(let item of this.tagList){
                    // if(this.styleKey == 1 && item == '强迫症' || item == '分享达人' || item == '有底气' || item == '有态度' || item == '有计划'){
                    //     let date = new Date(),time = '';
                    //     time += `${date.getFullYear()}年`;
                    //     time += `${date.getMonth()+1}月`;
                    //     time += `${date.getDate()}日 `;
                    //     time += `${date.getHours()}时`;
                    //     time += `${date.getMinutes()}分`;
                    //     this.textArr.push(time+data[item]);
                    // }else{
                    //     this.textArr.push(data[item]);
                    // }
                    this.textArr.push(data[item].replace('比亚迪秦',this.car));
                }
                this.textArr.push(data.add);
            },
            draw(){
                if(this.lastname.length == 0){
                    this.nameError = true;
                    return;
                }else if(this.lastname.length > 5){
                    this.lastname = this.lastname.substr(0,5);
                }
                this.showPoster = true;
                this.showName = false;
                this.name = this.lastname;
                this.initText();
                canvas = document.getElementById('poster');
                let ctx = canvas.getContext('2d');
                let title = '/static/images/title10.png';
                let colorArr = ['#efe9e1','#f0f9fe','#fff1fe'];
                window.footPrinter.tagStyle = this.styleKey;
                window.footPrinter.posterTimes += 1;
                this.bgColor = colorArr[this.styleKey-1];
                if(this.styleKey == 1){
                    title = '/static/images/title11.png';
                }
                let src = `/static/images/bg-share-${this.styleKey}.jpg`;
                Promise.all([
                    getImg(src),
                    getImg(title)
                ]).then((res)=>{
                    let tag = 'style'+window.footPrinter.tagStyle;
                    this[tag](ctx,res);
                    this.shareImgSrc = canvas.toDataURL();
                    this.showHint = true;
                })
            },
            style1(ctx,res){
                ctx.drawImage(res[0],0,0);
                ctx.drawImage(res[1],570,890);

                //姓名
                ctx.font = 'bold 40px Micro Yahei';
                ctx.fillStyle = '#2F7478';
                ctx.fillText('我是',375-(this.name.length+2)*20,200);
                ctx.fillStyle = '#2B5FD5';
                ctx.fillText(this.name,375+80-(this.name.length+2)*20,200);
                let nameWidth = (this.name.length+2)*40;
                let gap = (750 - nameWidth)/2/750*window.innerWidth;
                this.hintScale = gap*0.9/130;
                this.hintLeft = window.innerWidth - gap + gap*0.05;
                this.hintTop = window.innerWidth*0.205;

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
                ctx.font = 'bold 30px Micro Yahei';
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
                ctx.font = 'bold 40px Micro Yahei';
                ctx.fillStyle = '#333333';
                ctx.fillTextVertical('我叫',560,110);
                ctx.fillStyle = '#2B5FD5';
                ctx.fillTextVertical(this.name,560,195);
                ctx.beginPath();
                ctx.moveTo(600,70);
                ctx.lineTo(600,185+(this.name.length+2)*20);
                ctx.strokeStyle = '#000000';
                ctx.stroke();
                let nameWidth = (this.name.length+2)*40;
                let gap = (nameWidth+64)/750*window.innerWidth;
                this.hintScale = 0.7;
                this.hintLeft = window.innerWidth*0.71;
                this.hintTop = gap + gap*0.1;

                //车型
                ctx.font = 'bold 30px Micro Yahei';
                ctx.fillStyle = '#333333';
                ctx.fillTextVertical('2018年，同我的人生最爱一起度过，她就是'+this.car,490,100);
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
                    ctx.fillTextVertical(arr[i],435-i*45,100);
                }
            },
            style3(ctx,res){
                ctx.drawImage(res[0],0,0);
                ctx.drawImage(res[1],580,1000);

                //姓名
                ctx.font = 'bold 40px Micro Yahei';
                ctx.fillStyle = '#333333';
                ctx.fillText('我是',64,240);
                ctx.fillStyle = '#2B5FD5';
                ctx.fillText(this.name,64+80,240);
                let nameWidth = (this.name.length+2)*40;
                let gap = (nameWidth+64)/750*window.innerWidth;
                this.hintScale = 1;
                this.hintLeft = gap + gap*0.05;
                this.hintTop = window.innerWidth*0.255;

                //车型
                ctx.font = 'bold 30px Micro Yahei';
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
                window.posterImgData = this.shareImgSrc.replace('data:image/png;base64,','');
                window.pageOutFunc();
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
                if(code>=48 && code<=57){
                    y = y + letterWidth;
                }else{
                    // context.translate(x, y);
                    // // 英文字符，旋转90°
                    // context.rotate(90 * Math.PI / 180);
                    // context.translate(-x, -y);
                    y = y + 8;
                }
            } else if (index > 0 && text.charCodeAt(index - 1) < 256) {
                // y修正
                y = y + arrWidth[index - 1] / 2 + 8;
            }
            // 确定下一个字符的纵坐标位置
            if(code == 8230){
                context.translate(x, y);
                // 英文字符，旋转90°
                context.rotate(90 * Math.PI / 180);
                context.translate(-x, -y);
            }
            var letterWidth = arrWidth[index];
            if(code == 65292 || code == 65307 || code == 12290 || code == 12289){//符合兼容
                context.fillText(letter, x, y-4);
                y = y + letterWidth+4;
            }else if(code == 8230){//…兼容
                context.fillText(letter, x-2, y-4);
                y = y + letterWidth+4;
            }else{
                context.fillText(letter, x, y);
                y = y + letterWidth+1;
            }
            // 旋转坐标系还原成初始态
            context.setTransform(1, 0, 0, 1, 0, 0);
        });
        // 水平垂直对齐方式还原
        context.textAlign = align;
        context.textBaseline = baseline;
    };
</script>


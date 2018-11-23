<style>
    .poster-frame{ width: 100vw; height: 100vh; position: absolute; top: 0; left: 0; z-index: 600; font-size: 0; overflow: hidden;}
    .poster-frame canvas{ width: 100vw;}
    .poster-frame .btns{ width: 100%; display: flex; justify-content: space-around; position: absolute; bottom: 5%; left: 0;}
    .poster-frame .btns a{ width: 2.7rem; height: 0.8rem; border-radius: 30px; color: #FFFFFF; font-size: 0.36rem; display: flex; justify-content: center; align-items: center; background-color: #2B5FD5; text-decoration: none;}
</style>

<template>
    <div class="poster-frame" v-show="showPoster">
        <canvas id="poster" width="750" height="1333"></canvas>
        <div class="btns">
            <a href="javascript:;" @click="showPoster = false">换个风格</a>
            <a href="javascript:;" @click="doShare">分享给好友</a>
            <a href="javascript:;" @click="doError">报错测试</a>
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
                showPoster:false
            }
        },
        methods:{
            draw(){
                this.showPoster = true;
                canvas = document.getElementById('poster');
                let ctx = canvas.getContext('2d');
                window.tagStyle = this.styleKey;
                let src = `/static/bg-${this.styleKey}.jpg`;
                Promise.all([
                    getImg(src),
                    getImg('/static/title10.png')
                ]).then((res)=>{
                    ctx.drawImage(res[0],0,0);
                })
            },
            doShare(){
                window.posterimgData = canvas.toDataURL();
                window.location = '/doShare';
            },
            doError(){
                window.location = '/error';
            }
        }
    }

</script>


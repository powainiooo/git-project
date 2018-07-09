<style scoped>
    .audio{ width: 500px; height: 45px; overflow: hidden; position: relative;}
    .audio>a{ position: absolute; top: 0; left: 0;}
    .audio .mid{ margin: 0 55px;}
    .audio .mid .name{ font-size: 14px;}
    .audio .mid .line{ height: 3px; background-color:  rgba(158,159,159,1); position: relative; margin-top: 14px;}
    .audio .mid .line .bar{ width: 50%; height: 3px; background-color: #bc9e44;}
    .audio .time-name{ position: absolute; top: 25px; right: 0;font-size: 14px;}
</style>

<template>
    <div class="audio">
        <a href="javascript:;" v-if="paused" @click="doPlay"><img src="../assets/images/music-play.png" width="42" height="42"> </a>
        <a href="javascript:;" v-if="!paused" @click="doPause"><img src="../assets/images/music-pause.png" width="42" height="42"> </a>
        <div class="mid">
            <div class="name">{{title}}</div>
            <div class="line">
                <div class="bar" :style="{width:progress+'%'}"></div>
            </div>
        </div>
        <div class="time-name">{{duration}}</div>{{refresh}}
    </div>
</template>

<script type="es6">
    export default{
        name: 'App',
        props:['src','title'],
        computed:{
            refresh(){
                console.log(this.src);
                this.init();
                return ""
            },
            media(){
                return this.$store.state.audio;
            }
        },
        data(){
            return{
                duration:'--',
                progress:0,
                paused:true,
                t:0
            }
        },
        methods:{
            init(){
                let self = this;
                this.$store.commit('setAudio',new Audio(this.src));
                this.media.addEventListener('loadeddata',function(){
                    let time = parseInt(self.media.duration);
                    self.duration = self.getTime(time);
                });
                this.media.addEventListener('ended',function(){
                    self.media.currentTime = 0;
                    self.progress = 0;
                    self.paused = true;
                    self.duration = self.getTime(time);
                    clearInterval(self.t);
                });
            },
            doPlay(){
                this.media.play();
                this.paused = false;
                this.refreshBar();
            },
            doPause(){
                this.media.pause();
                this.paused = true;
                clearInterval(this.t);
            },
            getTime(time){
                if(time === NaN){
                    return '--'
                }else{
                    let m = Math.floor(time/60);
                    m = m > 9 ? m : '0'+m;
                    let s = Math.floor(time%60);
                    s = s > 9 ? s : '0'+s;
                    return `${m}:${s}`;
                }
            },
            refreshBar(){
                let self = this;
                self.t = setInterval(()=>{
                    self.progress = Math.floor(self.media.currentTime/self.media.duration*100);
                    self.duration = self.getTime(self.media.duration-self.media.currentTime);
                },1000)
            }
        }
    }

</script>


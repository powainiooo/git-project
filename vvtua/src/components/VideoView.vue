<style>
    .vframe{ position: relative;}
    .vframe,.mod_player,.tenvideo_player{ width: 100%; height: 100%;}
    .postImg{ position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-repeat: no-repeat; background-position: center center; background-size: cover;}
    .postImg a{ position: absolute; top: 50%; left: 50%; margin: -40px 0 0 -40px;}
    .postImg .cover{ position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0,0,0,0.5);}
</style>

<template>
    <div class="vframe">
        <div id="mod_player" class="mod_player">
            <div id="mod_player_skin">&nbsp;</div>
        </div>
        <div class="postImg" :style="{'background-image':'url('+postImg+')'}" v-if="!isPlay">
            <div class="cover"></div>
            <a href="javascript:;" @click="doPlay"><img src="@/assets/images/btn-play.png"></a>
        </div>
    </div>
</template>

<script type="es6">
    export default {
        name: 'HelloWorld',
        data () {
            return {
                video:{},
                player:{},
                isPlay:false
            }
        },
        props:['vid','postImg'],
        mounted(){
            //this.init();
        },
        methods:{
            init(){
                var self = this;
                self.video = new tvp.VideoInfo();
                //向视频对象传入视频vid
                self.video.setVid(self.vid);
                self.player =new tvp.Player();
                self.player.create({
                    width: '100%',       //播放器的宽度
                    height: '100%', //播放器的高度
                    video: self.video,       //默认的视频对象
                    modId: 'mod_player',       //默认的 DOM 元素 ID
                    autoplay: true,
                    pic: self.postImg
                });
            },
            doPlay(){
                this.init();
                this.isPlay = true;
            }
        }
    }
</script>


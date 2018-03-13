<style>
    .vframe{ position: relative;}
    .vframe,.mod_player,.tenvideo_player{ width: 100%; height: 100%;}
    .postImg{position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-repeat: no-repeat; background-position: center center; background-size: cover; z-index: 100;}
    .postImg a{  width: 100px; height: 100px; position: absolute; top: 50%; left: 50%; margin: -40px 0 0 -40px;}
    .postImg a img{ width: 100%; height: 100%;}
</style>

<template>
    <div class="vframe">
        <div id="mod_player" class="mod_player">
            <div id="mod_player_skin">&nbsp;</div>
        </div>
        <div class="postImg" :style="{'background-image':'url('+postImg+')'}" v-if="!isPlay">
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
                isPlay:true,
                tvpSetting:{
                    vid: 'l0171ne1fjx',
                    vid2: 'o0171fmfwmf',
                    vid_limit: 'z0016v1ocio',
                    vid_short: 'f162169s71x',
                    lid: '123002500'
                }
            }
        },
        props:['vid','postImg'],
        mounted(){
            this.init();
        },
        methods:{
            init(){
                let self = this;
                self.video = new tvp.VideoInfo();
                self.video.setVid(self.tvpSetting.vid);
                var player = new tvp.Player();
                player.create({
                    width  : '100%',
                    height : '100%',
                    video  : self.video,
                    playerType: 'html5',
                    modId  : "mod_player",
                    autoplay: false,
                    pic: self.postImg
                });

            },
            doPlay(){
                //this.isPlay = true;
                //this.player.play();
            }
        }
    }
</script>


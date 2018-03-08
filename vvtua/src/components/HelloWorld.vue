<template>
    <div class="detail-con clear">
        <div id="mod_player_wrap" class="mod_player_wrap">
            <div class="mod_inner">
                <div id="mod_inner" class="mod_player_section center mod_independent">
                    <div>
                        <div id="mod_player" class="mod_player">
                            <div id="mod_player_skin">&nbsp;</div>
                            <!-- 这个div是播放器准备输出的位置 --><!-- 引入腾讯视频播放器组件 -->
                            <script language="javascript" src="http://qzs.qq.com/tencentvideo_v1/js/tvp/tvp.player.js" charset="utf-8"></script>
                            <script language="javascript">
                                //定义视频对象
                                var video = new tvp.VideoInfo();
                                //向视频对象传入视频vid
                                video.setVid("k0015trfczz");
                                //定义播放器对象
                                var player = new tvp.Player(600, 400);
                                //设置播放器初始化时加载的视频
                                player.setCurVideo(video);
                                //设置精简皮肤，仅点播有效
                                //player.addParam("flashskin", "http://imgcache.qq.com/minivideo_v1/vd/res/skins/TencentPlayerMiniSkin.swf");
                                //输出播放器,参数就是上面div的id，希望输出到哪个HTML元素里，就写哪个元素的id
                                player.addParam("autoplay","1");
                                player.addParam("wmode","transparent");
                                //player.addParam("pic","http://img1.gtimg.com/ent/pics/hv1/75/182/1238/80547435.jpg");
                                player.write("mod_player_skin");
                            </script></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

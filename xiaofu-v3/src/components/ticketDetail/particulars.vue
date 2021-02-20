<style scoped>
.parti-item {
  width: 634px;
}
.parti-item img {
  width: 100%;
  height: 334px;
  background: #D8D8D8;
  box-shadow: 0px 10px 15px 0px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  margin-bottom: 40px;
}
.parti-item div {
  margin: 0 16px;
  font-size: 20px;
  color: #9E9E9F;
  line-height: 30px;
}
.parti-bBorder {
  height: 1px;
  margin: 0 25px;
}
</style>

<template>
<div>
  <div class="c-ticket-title"><span>Particulars</span>详情</div>
  <swiper previous-margin="58rpx" next-margin="35rpx" style="min-height: 640rpx;">
    <swiper-item v-for="i in 3" :key="i">
      <div class="parti-item">
        <img src="/static/images/img.jpg" class="pic" />
        <div>生于日本大阪的Joji，是一位多才且远见卓识的歌手兼制作人，在网
          络上他吸引了来自各地的追随者。Joji的音乐创作风格标新立异：将
          缓慢的节奏，忧郁的情绪，动情的嗓音覆盖在简单粗粝的结构之上，
          再混入trap、folk、 electronic、和R&B元素。被Pigeons & Planes网
          站列入“2017年度最佳新人”的他，无疑是当下数字音乐时代最令人关
          注的，有前景的艺术家之一。</div>
      </div>
    </swiper-item>
  </swiper>
  <div class="parti-bBorder bBorder"></div>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  data () {
    return {}
  },
  methods: {}
}
</script>

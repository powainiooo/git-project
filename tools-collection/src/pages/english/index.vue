<style scoped>
.box1 { border: 2px solid #D4D4D4; border-radius: 4px; padding: 30px 20px; min-height: 294px; font-size: 24px; color: #666666; line-height: 40px; margin-bottom: 40px; }
.tabs3 li { width: 60px; font-size: 24px; margin-right: 50px; }
/deep/.tabs3 li.active { color: #3366CC; border-bottom-color: #3366CC; }

.box2 { min-height: 216px; background-color: #F9F9F9; border-radius: 4px; padding: 30px 20px; font-size: 24px; color: #666666; line-height: 40px; }

.e-title { height: 70px; padding-left: 38px; font-size: 24px; color: #3366CC; }

.audio-box h3 { font-size: 28px; margin-top: 10px; }

.timer { width: 520px; }
.timer .bar { height: 2px; background-color: #777878; margin-top: 60px; margin-bottom: 10px; position: relative; }
.timer .bar .dot { width: 10px; height: 10px; border-radius: 50%; position: absolute; top: -4px; left: 0; background-color: #333333; }
.timer span { color: #666666; font-size: 18px; }

.audio-box .play { width: 80px; }
</style>

<template>
  <div class="container">
    <div class="hr20"></div>

    <div class="ml30 mr30">

      <div class="between mt40 mb20">
        <div class="f24 c-99">前一天</div>
        <div class="f24 c-99">后一天</div>
      </div>

      <div class="box1">
        It's not that there's no water in the well, it's that you don't dig deep enough. It's not that success comes slowly, but that you don't work hard enough.
      </div>

      <ul class="tabs2 tabs3">
        <li class="active">译文</li>
        <li>来源</li>
      </ul>

      <div class="box2">不是井里没有水，而是你挖的不够深。不是成功来得慢，而是你努力的不够多。</div>

      <h3 class="e-title acenter">音频地址</h3>
      <div class="box2 audio-box">
        <h3>商务礼仪培训</h3>
        <div class="between">
          <div class="timer">
            <div class="bar">
              <div class="dot"></div>
            </div>
            <div class="between">
              <span>00:01</span>
              <span>00:01</span>
            </div>
          </div>
          <img src="/static/images/play.png" mode="widthFix" class="play">
        </div>
      </div>
      <h3 class="e-title acenter">图示</h3>
      <img src="/static/images/banner3.png" mode="widthFix" class="w100 mb40">
    </div>


    <operates />
  </div>
</template>

<script>
import operates from '@/components/operates'

export default {
  components: {
    operates
  },
  data () {
    return {}
  },

  created () {
  }
}
</script>

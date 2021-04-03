<style scoped>
.bg { width: 100%; height: 560px; display: block; }
.line1 { position: absolute; top: 40px; left: 40px; font-size: 30px; line-height: 48px; color: #FFFFFF; }
.line2 { width: 100%; position: absolute; top: 224px; left: 0; }
.line2 img { width: 320px; margin-right: 32px; }
.line2 h3 { font-size: 130px; line-height: 130px; margin-bottom: 16px; color: #FFFFFF; }
.line2 p { font-size: 22px; line-height: 22px; color: #FFFFFF; margin-left: 20px; }
.wet-list { margin: 40px 30px; }
.wet-list li { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
.wet-list li div { display: flex; align-items: center; font-size: 24px; color: #999999; }
.wet-list li div span { color: #333333; margin-right: 20px; }
.wet-list li div img { width: 44px; margin-right: 10px; }
</style>

<template>
  <div class="container3">
    <img src="/static/images/weather/bg1.png" class="bg" mode="aspectFill" />
    <img src="/static/images/weather/ad.png" class="w100" mode="widthFix" />
    <div class="line1"><text>深圳南山区\n4月28日，周日</text></div>
    <div class="line2 center">
      <img src="/static/images/weather/icon-big1.png" mode="widthFix" />
      <div>
        <h3>21°</h3>
        <p>21° - 32°</p>
      </div>
    </div>
    <ul class="wet-list">
      <li>
        <div><span>今天</span>4/28</div>
        <div><img src="/static/images/weather/icon1.png" mode="widthFix" />晴</div>
        <div><span>27°</span>18°</div>
      </li>
      <li>
        <div><span>今天</span>4/28</div>
        <div><img src="/static/images/weather/icon1.png" mode="widthFix" />晴</div>
        <div><span>27°</span>18°</div>
      </li>
      <li>
        <div><span>今天</span>4/28</div>
        <div><img src="/static/images/weather/icon1.png" mode="widthFix" />晴</div>
        <div><span>27°</span>18°</div>
      </li>
    </ul>
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

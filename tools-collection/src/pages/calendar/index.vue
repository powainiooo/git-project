<style scoped>
.line1 { height: 88px; background-color: #FFFFFF; box-shadow: 0px 1px 0px 0px #E2E8EF; padding: 0 40px; margin-bottom: 20px; }
.line1 p { font-size: 26px; color: #666666; }
.line1 button { width: 30px; height: 30px; background-color: transparent; }
.line1 button img { width: 18px; height: 30px; display: block; margin: 0 auto; }
.line1 div { font-size: 32px; color: #000000; }

.thead { width: 700px; height: 60px; margin: 0 auto 30px auto; display: flex; align-items: center; background-color: #446CB2; border-radius: 10px; }
.thead li { width: 100px; font-size: 24px; color: #FFFFFF; text-align: center; }

.tbody { width: 700px; display: flex; flex-wrap: wrap; margin: 0 auto 80px auto; }
.tbody li { width: 100px; margin-bottom: 40px; text-align: center; }
.tbody li div { font-size: 32px; line-height: 32px; margin-bottom: 10px; }
.tbody li:nth-child(7n) div { color: #999999; }
.tbody li:nth-child(7n + 1) div { color: #999999; }
.tbody li p { font-size: 22px; line-height: 22px; color: #999999; }

.line2 { margin-left: 46px; margin-bottom: 26px; display: flex; align-items: baseline; }
.line2 h3 { font-size: 60px; color: #446CB2; margin-right: 20px; }
.line2 div { font-size: 24px; margin-right: 20px; }
.line2 p { font-size: 22px; color: #999999; }

.line3 { display: flex; align-items: center; font-size: 24px; margin-left: 46px; }
.line3 span { width: 34px; height: 34px; line-height: 22px; border-radius: 50%; background-color: #67CC3F; color: #FFFFFF; margin-right: 10px; }
.line3 p { margin-right: 20px; }
</style>

<template>
  <div class="container3">
    <div class="hr20"></div>
    <div class="line1 between">
      <p>今日</p>
      <button><img src="/static/images/arrow4.png" /></button>
      <div>2018年12月</div>
      <button><img src="/static/images/arrow5.png" /></button>
      <p>选择日期</p>
    </div>

    <ul class="thead">
      <li>日</li>
      <li>一</li>
      <li>二</li>
      <li>三</li>
      <li>四</li>
      <li>五</li>
      <li>六</li>
    </ul>

    <ul class="tbody">
      <li>
        <div>2</div>
        <p>十二</p>
      </li>
      <li>
        <div>2</div>
        <p>十二</p>
      </li>
      <li>
        <div>2</div>
        <p>十二</p>
      </li>
      <li>
        <div>2</div>
        <p>十二</p>
      </li>
      <li>
        <div>2</div>
        <p>十二</p>
      </li>
      <li>
        <div>2</div>
        <p>十二</p>
      </li>
      <li>
        <div>2</div>
        <p>十二</p>
      </li>
      <li>
        <div>2</div>
        <p>十二</p>
      </li>
      <li>
        <div>2</div>
        <p>十二</p>
      </li>
      <li>
        <div>2</div>
        <p>十二</p>
      </li>
    </ul>

    <div class="line2">
      <h3>28日</h3>
      <div>农历腊月十六</div>
      <p>庚子鼠年 已丑月 丙子日</p>
    </div>

    <div class="line3">
      <span class="center">宜</span>
      <p>交易   沐浴   裁衣</p>
      <span class="center" style="background-color: #DB3D3D;">忌</span>
      <p>安葬   伐木  作灶</p>
    </div>
    <a href="#" class="f30 c-link ml45 mt20 bold">查看今天的行程</a>
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

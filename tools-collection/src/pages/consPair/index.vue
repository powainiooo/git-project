<style scoped>
.pair-item { width: 188px; height: 130px; background: #F9F9F7; border-radius: 4px; }
.pair-item .line1 { width: 100%; height: 50px; border-radius: 0 0 50px 50px; font-size: 30px; color: #FFFFFF; margin-bottom: 20px; background-color: #436CB3; }
.pair-item .line1 img { width: 28px; margin-right: 10px; }
.pair-item .selects { width: 160px; height: 42px; border: 2px solid #B6B6B6; border-radius: 4px; font-size: 24px; color: #B6B6B6; padding-left: 14px; margin: 0 auto; }
.pair-item .selects img { width: 14px; margin-left: 12px; }

.btn-pair { width: 250px; border-radius: 35px; }
</style>

<template>
  <div class="container">
    <div class="hr20"></div>

    <div class="ml120 mr120 between mt40 mb40">
      <div class="pair-item">
        <div class="line1 center">
          <img src="/static/images/male.png" mode="widthFix" />男生
        </div>
        <div class="selects acenter">
          <span>选择星座</span>
          <img src="/static/images/arrow8.png" mode="widthFix" />
        </div>
      </div>
      <div class="pair-item">
        <div class="line1 center" style="background-color: #EA749E;">
          <img src="/static/images/female.png" mode="widthFix" />女生
        </div>
        <div class="selects acenter">
          <span>选择星座</span>
          <img src="/static/images/arrow8.png" mode="widthFix" />
        </div>
      </div>
    </div>

    <div class="tc mb55">
      <button class="btn btn-min btn-pair">立即配对</button>
    </div>

    <div class="blue-box">
      <h3>白羊座男配白羊座女</h3>
      <div>
        <p>配对指数：80</p>
      </div>
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

<style scoped>
.o-title { font-size: 36px; color: #080808; margin-bottom: 30px; }
.o-title img { width: 16px; margin-left: 34px; }

.oil-list { margin: 0 -25px; display: flex; flex-wrap: wrap;  }
.oil-list li { width: 305px; height: 166px; background: #FFFFFF; border: 1px solid #E1E1E1; box-shadow: 0px 0px 6px 0px rgba(172, 172, 172, 0.29); border-radius: 10px; margin: 0 25px 40px 25px; display: flex; align-items: center;}
.oil-list li img { width: 84px; margin-left: 30px; margin-right: 60px; }
.oil-list li h3 { font-size: 36px; color: #070707; margin-bottom: 30px; }
.oil-list li p { font-size: 36px; color: #2490FD; }
</style>

<template>
  <div class="container">
    <div class="hr20"></div>

    <div class="ml40 mr40">
      <div class="o-title acenter mt30">深圳市<img src="/static/images/arrow7.png" mode="widthFix" /></div>

      <ul class="oil-list">
        <li>
          <img src="/static/images/gas.png" mode="widthFix" />
          <div>
            <h3>7.43元</h3>
            <p>98#</p>
          </div>
        </li>
        <li>
          <img src="/static/images/gas.png" mode="widthFix" />
          <div>
            <h3>7.43元</h3>
            <p>98#</p>
          </div>
        </li>
        <li>
          <img src="/static/images/gas.png" mode="widthFix" />
          <div>
            <h3>7.43元</h3>
            <p>98#</p>
          </div>
        </li>
        <li>
          <img src="/static/images/gas.png" mode="widthFix" />
          <div>
            <h3>7.43元</h3>
            <p>98#</p>
          </div>
        </li>
      </ul>

      <div class="o-title acenter mt30">深圳市<img src="/static/images/arrow7.png" mode="widthFix" /></div>
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

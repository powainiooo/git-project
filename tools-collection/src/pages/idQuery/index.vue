<style scoped>
.box { width: 690px; margin: 0 auto 36px auto; background-color: #FFFFFF; box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.08); border-radius: 4px; overflow: hidden; }
.search-box { height: 90px; margin: 70px 50px 60px 50px; background-color: #F2F5F9; position: relative; }
.search-box input { width: 100%; height: 100%; padding-left: 210px; box-sizing: border-box; font-size: 28px; }
.search-box img { width: 28px; position: absolute; top: 30px; left: 160px; }

.res-list { margin: 50px 45px 50px 200px; }
.res-list li { display: flex; font-size: 26px; margin-bottom: 20px; }
.res-list li span { width: 145px; }
.res-list li p { color: #436CB3; }
</style>

<template>
  <div class="container3">
    <img src="/static/images/banner3.png" class="w100" mode="widthFix">

    <div class="box" style="margin-top: -220rpx">
      <div class="search-box">
        <img src="/static/images/sousuo3.png" mode="widthFix" />
        <input type="text" placeholder="请输入身份证号码" />
      </div>
      <div class="ml50 mr50 mb95">
        <button class="btn">马上查询</button>
      </div>
    </div>

    <div class="box">
      <h3 class="tc mt50">【查询结果】</h3>
      <ul class="res-list">
        <li>
          <span>地　　区：</span>
          <p>广东省</p>
        </li>
        <li>
          <span>性　　别：</span>
          <p>女</p>
        </li>
        <li>
          <span>出生日期：</span>
          <p>2021年1月</p>
        </li>
      </ul>
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

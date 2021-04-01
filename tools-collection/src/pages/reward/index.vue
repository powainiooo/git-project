<style scoped>
.banner { width: 100%; }
.top { width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; flex-direction: column; position: absolute; top: 0; left: 0; }
.top p { font-size: 30px; color: #FFFFFF; }
.top div { font-size: 68px; color: #FFFFFF; line-height: 68px; margin-top: 30px; margin-bottom: 38px; }
.list { background-color: #FFFFFF; padding: 50px 0; }
.list .list-item { display: flex; align-items: center; justify-content: space-between; margin-bottom: 50px; }
.list .list-item .tool-item { width: 190px; height: 98px; }
.list .list-item .time { font-size: 20px; }
.list .list-item .point { font-size: 34px; margin-right: 30px; }
</style>

<template>
  <div class="container2">
    <div class="pr">
      <img src="/static/images/banner1.png" mode="widthFix" class="banner"/>
      <div class="top">
        <p>共发出</p>
        <div>¥30.00</div>
        <p>发出5个打赏</p>
      </div>
    </div>
    <div class="list">
      <div class="list-item">
        <div class="acenter">
          <a href="#" class="tool-item">
            <img src="/static/images/img/icon1.png" mode="aspectFill" />
            <div>汇率转换</div>
          </a>
          <p class="time">2018.04.02  18:46:16</p>
        </div>
        <div class="point">+26</div>
      </div>
      <div class="list-item">
        <div class="acenter">
          <a href="#" class="tool-item">
            <img src="/static/images/img/icon1.png" mode="aspectFill" />
            <div>汇率转换</div>
          </a>
          <p class="time">2018.04.02  18:46:16</p>
        </div>
        <div class="point">+26</div>
      </div>
      <div class="list-item">
        <div class="acenter">
          <a href="#" class="tool-item">
            <img src="/static/images/img/icon1.png" mode="aspectFill" />
            <div>汇率转换</div>
          </a>
          <p class="time">2018.04.02  18:46:16</p>
        </div>
        <div class="point">+26</div>
      </div>
      <div class="list-item">
        <div class="acenter">
          <a href="#" class="tool-item">
            <img src="/static/images/img/icon1.png" mode="aspectFill" />
            <div>汇率转换</div>
          </a>
          <p class="time">2018.04.02  18:46:16</p>
        </div>
        <div class="point">+26</div>
      </div>
    </div>
  </div>
</template>

<script>

export default {

  data () {
    return {}
  },

  created () {}
}
</script>

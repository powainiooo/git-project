<style>
page { background-color: #F8F8F8; }
.footPrint-container { margin-top: 40px; }
.footPrint-container .line { width: 5px; position: fixed; top: 20px; left: 50px; bottom: 0; background-color: #FFFFFF; }
.footPrint-item { margin-bottom: 40px; }
.footPrint-item .time { margin-left: 75px; position: relative; margin-bottom: 40px; }
.footPrint-item .time:before { content: ''; width: 20px; height: 20px; border-radius: 50%; border: 4px solid #F1380D; background-color: #F8F8F8; box-sizing: border-box; position: absolute; top: 8px; left: -36px; }
.footPrint-item .list { width: 610px; padding: 40px 20px 0 20px; display: flex; flex-wrap: wrap; border-radius: 6px; background-color: #FFFFFF; margin-left: 90px; }
.footPrint-item .list .tool-item { margin: 0 34px 40px 34px; }
</style>

<template>
  <div class="footPrint-container">
    <div class="line"></div>
    <div class="footPrint-item">
      <div class="time">2020年    1月19日</div>
      <div class="list">
        <a href="#" class="tool-item">
          <img src="/static/images/img/icon1.png" mode="aspectFill" />
          <div>汇率转换</div>
        </a>
        <a href="#" class="tool-item">
          <img src="/static/images/img/icon1.png" mode="aspectFill" />
          <div>汇率转换</div>
        </a>
        <a href="#" class="tool-item">
          <img src="/static/images/img/icon1.png" mode="aspectFill" />
          <div>汇率转换</div>
        </a>
      </div>
    </div>
    <div class="footPrint-item">
      <div class="time">2020年    1月19日</div>
      <div class="list">
        <a href="#" class="tool-item">
          <img src="/static/images/img/icon1.png" mode="aspectFill" />
          <div>汇率转换</div>
        </a>
        <a href="#" class="tool-item">
          <img src="/static/images/img/icon1.png" mode="aspectFill" />
          <div>汇率转换</div>
        </a>
        <a href="#" class="tool-item">
          <img src="/static/images/img/icon1.png" mode="aspectFill" />
          <div>汇率转换</div>
        </a>
      </div>
    </div>
    <div class="footPrint-item">
      <div class="time">2020年    1月19日</div>
      <div class="list">
        <a href="#" class="tool-item">
          <img src="/static/images/img/icon1.png" mode="aspectFill" />
          <div>汇率转换</div>
        </a>
        <a href="#" class="tool-item">
          <img src="/static/images/img/icon1.png" mode="aspectFill" />
          <div>汇率转换</div>
        </a>
        <a href="#" class="tool-item">
          <img src="/static/images/img/icon1.png" mode="aspectFill" />
          <div>汇率转换</div>
        </a>
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

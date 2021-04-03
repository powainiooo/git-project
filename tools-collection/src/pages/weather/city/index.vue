<style scoped>
.search-box { margin: 0 28px 40px 28px; position: relative; }
.search-box input { width: 100%; height: 76px; border-radius: 38px; background-color: #FFFFFF; font-size: 30px; padding: 0 30px 0 80px; box-sizing: border-box; }
.search-box img { width: 28px; position: absolute; top: 23px; left: 30px; }
.city-list { width: 630px; margin-left: 20px;  display: flex; flex-wrap: wrap; }
.city-list li { width: 170px; height: 70px; line-height: 70px; text-align: center; border-radius: 35px; background-color: #FFFFFF; font-size: 28px; color: #666666; margin: 0 20px 30px 20px;  }

.index-list { position: fixed; top: 140px; bottom: 46px; right: 26px; display: flex; justify-content: space-between; align-items: center; flex-direction: column; }
.index-list li { font-size: 24px; color: #436CB3; }
</style>

<template>
  <div class="container2">
    <div class="hr20"></div>
    <div class="search-box">
      <img src="/static/images/sousuo3.png" mode="widthFix" />
      <input type="text" placeholder="输入城市名" />
    </div>
    <h3 class="f32 ml30 bold mb35">热门城市</h3>
    <ul class="city-list">
      <li>北京</li>
      <li>北京</li>
      <li>北京</li>
      <li>北京</li>
      <li>北京</li>
      <li>北京</li>
    </ul>
    <ul class="index-list">
      <li>热门</li>
      <li>A</li>
      <li>B</li>
      <li>C</li>
      <li>D</li>
      <li>E</li>
      <li>F</li>
      <li>G</li>
      <li>H</li>
      <li>I</li>
      <li>J</li>
      <li>K</li>
      <li>L</li>
      <li>M</li>
      <li>N</li>
      <li>O</li>
      <li>P</li>
      <li>Q</li>
      <li>R</li>
      <li>S</li>
      <li>T</li>
      <li>U</li>
      <li>V</li>
      <li>W</li>
      <li>X</li>
      <li>Y</li>
      <li>Z</li>
    </ul>
  </div>
</template>

<script>

export default {
  data () {
    return {}
  },

  created () {
  }
}
</script>

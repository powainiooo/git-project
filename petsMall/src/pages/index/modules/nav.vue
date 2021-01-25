<style>
.c-nav { overflow: hidden; height: 752px; position: relative;}
.c-nav .bg { width: 100%; height: 100%; position: absolute; top: 0; left: 0; z-index: 1;}

.c-nav .nav-box { height: 200px; margin: 60px 45px 40px 45px; background-color: #ffffff; border-radius: 10px; box-shadow: var(--boxShadow); display: flex; align-items: center; justify-content: space-between; box-sizing: border-box; padding: 0 28px 0 20px; position: relative; z-index: 5; }
.c-nav .nav-box img { width: 250px; height: 230px; margin-top: -46px; align-self: flex-start; }
.c-nav .nav-box p { font-size: 30px; color: var(--textColor); text-shadow: var(--textShadow); }
.c-nav .nav-box p span { margin-left: 12px;}

.c-nav .nav-list { margin: 0 45px; display: flex; justify-content: space-between; flex-wrap: wrap; position: relative; z-index: 5; }
.c-nav .nav-list a { width: 206px; height: 135px; box-shadow: var(--boxShadow); margin-bottom: 20px; }
.c-nav .nav-list a img { width: 100%; height: 100%; }
</style>

<template>
<div class="c-nav">
   <img src="/static/images/index/bg.png" class="bg"/>

   <a href="#" class="nav-box">
      <img src="/static/images/index/goods-catbox.png" />
      <p>订购猫盒<span>| Order cat box</span></p>
   </a>

   <div class="nav-list">
      <a href="#"><img src="/static/images/index/sort-btn1.png" /></a>
      <a href="#"><img src="/static/images/index/sort-btn2.png" /></a>
      <a href="#"><img src="/static/images/index/sort-btn3.png" /></a>
      <a href="#"><img src="/static/images/index/sort-btn4.png" /></a>
      <a href="#"><img src="/static/images/index/sort-btn5.png" /></a>
      <a href="#"><img src="/static/images/index/sort-btn6.png" /></a>
   </div>
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

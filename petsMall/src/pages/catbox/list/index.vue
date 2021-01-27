<style>
page { background-color: #F3F2F1; }
.container { padding: 300px 0 200px 0;}
.list-container { margin: 60px 45px; }
.list-container .c-list-item { margin-bottom: 40px; }

.footer-btn { width: 100%; height: 200px; position: fixed; left: 0; bottom: 0; z-index: 1000; display: flex; align-items: center; box-shadow: 0 -5px 8px rgba(0, 0, 0, .05); background-color: #ffffff; }
.footer-btn .menu { width: 114px; height: 90px; margin-left: 70px; margin-right: 30px; }
.footer-btn .arrow { width: 80px; height: 80px; margin-left: 110px; }
.footer-btn div p { font-size: 30px; color: #372C1E; text-shadow: var(--textShadow); }
.footer-btn div p.en { font-size: 34px; font-family: HelveThin; }
</style>

<template>
<div class="container">
   <c-header title="选择猫盒|Selection cat box" />
   <div class="list-container">
      <c-list-item />
      <c-list-item />
      <c-list-item />
      <c-list-item />
   </div>

   <a href="#" class="footer-btn">
      <img src="/static/images/catbox/icon-menu.png" class="menu" />
      <div>
         <p class="en">Customized cat box</p>
         <p>自定义猫盒套餐</p>
      </div>
      <img src="/static/images/catbox/icon-arrow.png" class="arrow" />
   </a>
</div>
</template>

<script>
import cHeader from '@/components/header'
import cListItem from './modules/listItem'

export default {
   components: {
      cHeader,
      cListItem
   },

   data () {
      return {}
   },

   created () {
   }
}
</script>

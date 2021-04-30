<style scoped>
.c-navs { margin: 120px 20px 50px 20px; }
.c-navs li { height: 64px; display: flex; align-items: center; padding-left: 40px; border-bottom: 1px solid #EEEEEF; font-size: 18px; color: #000000; cursor: pointer; }
.c-navs li span { width: 30px; }
.c-navs li img { width: auto; height: 24px;}
</style>

<template>
<div class="c-navs">
  <ul class="menu-nav">
    <li @click="$emit('toggle','infos')"><span><img :src="getIndexSrc(1)" /></span>基本资料</li>
    <li @click="$emit('toggle','banks')"><span><img :src="getIndexSrc(2)" /></span>银行卡管理</li>
    <li @click="$emit('toggle','records')"><span><img :src="getIndexSrc(3)" /></span>流水管理</li>
    <li @click="$emit('toggle','rules')"><span><img :src="getIndexSrc(4)" /></span>条例</li>
    <li @click="$emit('toggle','contacts')"><span><img :src="getIndexSrc(5)" /></span>联系</li>
  </ul>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  data () {
    return {}
  },
  methods: {
    getIndexSrc (index) {
      return require('@/assets/img/nums/' + index + '.png')
    }
  }
}
</script>

<style scoped>
.mj-list li { padding: 40px 30px; }
.mj-list li h2 { font-size: 26px; color: #3D7FC7; margin-bottom: 30px; text-align: center; }
.mj-list li h3 { font-size: 20px; color: #FF3600; margin-bottom: 30px; text-align: right; margin-right: 65px; }
.mj-list li div { font-size: 20px; color: #000000; line-height: 40px; padding-left: 80px; position: relative; }
.mj-list li div:before { color: #FF3600; position: absolute; top: 0; left: 0; }
.mj-list li div.n1:before { content: '【释义】'; }
.mj-list li div.n2:before { content: '【延伸】'; }
</style>

<template>
<div class="container1">
  <div class="hr20"></div>
  <div class="mt30 mb30">
    <c-search />
  </div>

  <ul class="mj-list borderT">
    <li class="borderB">
      <h2>【智者千虑，必有一失；愚者千虑，必有一得。】</h2>
      <h3>——《史记·淮阴侯列传》</h3>
      <div class="n1">聪明的人在上千次考虑中，总会有一次失误；愚蠢的人，在上千次考虑中，总会有一次收获。</div>
      <div class="n2">骄傲是失败的另一个名字。</div>
    </li>
  </ul>

  <operates />
</div>
</template>

<script>
import operates from '@/components/operates'
import cSearch from '@/components/search'

export default {
  components: {
    operates,
    cSearch
  },
  data () {
    return {}
  },

  created () {
  }
}
</script>

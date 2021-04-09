<style scoped>
.title { font-size: 32px; color: #2C2C2C; }

.pos-list { display: flex; flex-wrap: wrap; margin: 0 50px; }
.pos-list li { border-radius: 16px; background-color: #F2F2F2; margin: 0 20px 20px 0; font-size: 24px; color: #656565; padding: 0 24px; height: 54px; display: flex; align-items: center; }
</style>

<template>
  <div class="container">
    <div class="hr20"></div>
    <div class="mt120">
      <c-search />
    </div>

    <div class="title acenter mt90 mb60 ml50">
      <img src="/static/images/remen.png" mode="widthFix" class="w28 mr20" />
      <span>热门搜索</span>
    </div>
    <ul class="pos-list">
      <li>银 行</li>
      <li>银 行</li>
      <li>银 行</li>
      <li>银 行</li>
      <li>银 行</li>
      <li>银 行</li>
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

  created () {}
}
</script>

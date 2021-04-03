<style scoped>
.line1 { position: relative; display: flex; align-items: center; }
.line1:after { content: ''; width: 100%; height: 4px; background-color: #F1380D; position: absolute; bottom: 0; left: 0; }
.line1 .grid-bg { width: 160px; display: block; }
.line1 ul { width: 420px; display: flex; flex-wrap: wrap; margin-left: 36px; }
.line1 ul li { width: 210px; margin-bottom: 20px; font-size: 22px; color: #656565; }
.line1 ul li:first-child { width: 100%; }
.line1 ul li span { color: #000000; margin-right: 10px; }
.line1 ul li:nth-last-child(1),.line1 ul li:nth-last-child(2) { margin-bottom: 0; }
.line1 .grid { width: 160px; height: 160px; font-size: 88px; color: #000000; position: absolute; top: 0; left: 0; }

.word-list { display: flex; flex-wrap: wrap; margin: 30px -15px; }
.word-list li { background-color: #F7F7F7; height: 54px; line-height: 54px; padding: 0 26px; border-radius: 10px; font-size: 24px; color: #656565; margin: 0 15px 30px 15px; }

.word-bg { font-size: 18px; color: #656565; padding: 35px 25px; }
</style>

<template>
  <div class="container1">
    <div class="hr20" style="background-color: #436CB3"></div>
    <div class="mt30 mb30">
      <c-search />
    </div>
    <div class="hr10"></div>

    <div class="ml30 mr30 mt25">
      <div class="line1">
        <img src="/static/images/grid.png" class="grid-bg" mode="widthFix" />
        <ul>
          <li><span>拼 音</span> xiang</li>
          <li><span>部 首</span> xiang</li>
          <li><span>笔 画</span> xiang</li>
          <li><span>五 行</span> xiang</li>
          <li><span>繁 体</span> xiang</li>
        </ul>
        <div class="grid center">想</div>
      </div>

      <ul class="word-list">
        <li>妄 想</li>
        <li>妄 想</li>
        <li>妄 想</li>
        <li>妄 想</li>
        <li>妄 想</li>
      </ul>

      <div class="box-bg word-bg">形声。心形相声</div>

    </div>

    <operates />
  </div>
</template>

<script>
import operates from '@/components/operates'
import cSearch from '@/components/search2'

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

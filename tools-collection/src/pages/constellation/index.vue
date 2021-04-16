<style scoped>
.con-nav { width: 216px; position: fixed; top: 20px; left: 0; bottom: 100px; background-color: #F9F9F7; overflow-y: auto; }
.con-nav li { width: 100%; height: 106px; display: flex; align-items: center; padding-left: 40px; position: relative; font-size: 28px; }
.con-nav li.active { background-color: #FFFFFF; }
.con-nav li.active:before { content: ''; width: 2px; height: 36px; border-radius: 0 10px 10px 0; background-color: #5FBD80; position: absolute; top: 35px; left: 0; }

.con-details { margin: 15px 30px 30px 240px }
.con-details p { font-size: 18px; color: #666666; line-height: 35px; margin-bottom: 30px; }
</style>

<template>
  <div class="container">
    <div class="hr20"></div>
    <ul class="con-nav">
      <li class="active">双鱼座</li>
      <li>双鱼座</li>
      <li>双鱼座</li>
      <li>双鱼座</li>
      <li>双鱼座</li>
    </ul>

    <div class="con-details">
      <div class="c-tag" style="background-color: #80BEE4;">今日运势</div>
      <p>{{}}</p>
      <div class="c-tag" style="background-color: #7FBE58;">明日运势</div>
      <p>整体运势棒棒哒的节奏，运气的助攻下，你会拥有过更多行动的优势。你能通过对生活的用心感悟得到一些灵感，让你拥有更多的创意点子，利于为自己的计划方案加分。生活方面也会收获满满，不管精神还是物质都富足。</p>
      <div class="c-tag" style="background-color: #EA749E;">本周运势</div>
      <p>整体运势棒棒哒的节奏，运气的助攻下，你会拥有过更多行动的优势。你能通过对生活的用心感悟得到一些灵感，让你拥有更多的创意点子，利于为自己的计划方案加分。生活方面也会收获满满，不管精神还是物质都富足。</p>
      <div class="c-tag" style="background-color: #AB92DC;">本月运势</div>
      <p>整体运势棒棒哒的节奏，运气的助攻下，你会拥有过更多行动的优势。你能通过对生活的用心感悟得到一些灵感，让你拥有更多的创意点子，利于为自己的计划方案加分。生活方面也会收获满满，不管精神还是物质都富足。</p>
      <div class="c-tag" style="background-color: #F39F5B;">今年运势</div>
      <p>整体运势棒棒哒的节奏，运气的助攻下，你会拥有过更多行动的优势。你能通过对生活的用心感悟得到一些灵感，让你拥有更多的创意点子，利于为自己的计划方案加分。生活方面也会收获满满，不管精神还是物质都富足。</p>
    </div>
    <operates />
  </div>
</template>

<script>
import operates from '@/components/operates'
import {postAction} from '../../utils/api'

export default {
  components: {
    operates
  },
  data () {
    return {
      record: {}
    }
  },
  methods: {
    getData () {
      postAction('constellation_query').then(res => {
        if (res.ret === 0) {
          this.record = res.data
        }
      })
    }
  },
  onLoad () {
    this.getData()
  }
}
</script>

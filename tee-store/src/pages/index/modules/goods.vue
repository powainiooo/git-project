<style>
.index-goods { width: 700px; height: calc(100vh - 104px); margin-top: 0; position: absolute; top: calc(100vh - 270px); left: 0; z-index: 50; transition: top 0.4s cubic-bezier(.23,.78,.33,.97); }
.index-goods-show { top: 126px; }
.index-goods .arrows { width: 80px; height: 60px; position: absolute; top: -22px; left: 66px; display: flex; flex-direction: column; align-items: center; }
.index-goods .arrows .a1 { width: 100%; }
.index-goods .arrows .a2 { width: 16px; transition: transform 0.4s cubic-bezier(.23,.78,.33,.97); }
.index-goods-show .arrows .a2 { width: 16px; transform: rotateZ(180deg); }

.index-scrolls { width: 100%; height: 100%; overflow-y: auto; }
</style>

<template>
<div class="container2 index-goods" :class="{'index-goods-show': visible}">
  <div class="arrows" @click="toggle">
    <img src="/static/images/index/arrow1.png" mode="widthFix" class="a1" />
    <img src="/static/images/index/arrow2.png" mode="widthFix" class="a2" />
  </div>
  <div class="index-scrolls">
    <div class="acenter mt50 ml50">
      <img src="/static/images/index/icon1.png" mode="widthFix" class="w28 mr15" />
      <span class="f30">兑换好礼</span>
    </div>
    <goods-list v-if="visible" />
  </div>
</div>
</template>

<script type='es6'>
import goodsList from '@/components/goodsList'
export default {
  name: 'app',
  components: {
    goodsList
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    toggle () {
      this.visible = !this.visible
    }
  }
}
</script>

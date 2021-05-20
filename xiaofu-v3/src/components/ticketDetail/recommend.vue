<style scoped>
.scroll-frame { width: 100%; }
.scroll-list { display: flex; margin-left: 25px; }
.recom-item {
  transform-origin: 0 0;
  transform: scale(.882);
  margin-right: -15px;
}
</style>

<template>
<div style="margin-bottom: 50rpx">
  <div class="c-ticket-title"><span>Recommend</span>推荐</div>
<!--  <swiper previous-margin="25rpx" next-margin="416rpx" duration="100">-->
<!--    <swiper-item v-for="item in list" :key="id">-->
<!--      <div class="recom-item">-->
<!--        <c-ticket :record="item" />-->
<!--      </div>-->
<!--    </swiper-item>-->
<!--  </swiper>-->
  <scroll-view scroll-x class="scroll-frame">
    <div class="scroll-list" :style="{width: (325 * list.length + 25) + 'rpx'}">
      <div class="recom-item" v-for="(item, index) in list" :key="index">
        <c-ticket :record="item" />
      </div>
    </div>
  </scroll-view>
</div>
</template>

<script type='es6'>
import cTicket from '@/pages/index/modules/ticket'
export default {
  name: 'app',
  components: {
    cTicket
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

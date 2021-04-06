<style scoped>
.recom-item {
  width: 34px;
  transform-origin: 0 0;
  transform: scale(.882);
}
</style>

<template>
<div style="margin-bottom: 50rpx">
  <div class="c-ticket-title"><span>Recommend</span>推荐</div>
  <swiper previous-margin="25rpx" next-margin="416rpx" duration="100">
    <swiper-item v-for="item in list" :key="id">
      <div class="recom-item">
        <c-ticket :record="item" />
      </div>
    </swiper-item>
  </swiper>
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

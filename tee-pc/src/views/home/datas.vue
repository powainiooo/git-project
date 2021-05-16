<style lang="stylus" type="text/stylus">
@import "../../assets/css/mixin.styl"
.datas-container
  .nums-list
    padding-bottom 22px; border-bottom 1px solid #E2E2E2; display flex;
    li
      margin-right 40px; padding-right 40px; position relative;
      &:after
        content ''; size(1px, 68px); background-color #E2E2E2; abTR(0, 0);
      span
        background-color #C8B69C; padding 0 6px; font-size 12px; color #ffffff; line-height 18px; height 18px; border-radius 10px;
      div
        font-size 48px; font-family DinB; line-height 56px;
</style>

<template>
<div class="datas-container pa60">
  <!-- 统计数量 -->
  <ul class="nums-list">
    <li>
      <span>今日收益</span>
      <div>8271</div>
    </li>
    <li>
      <span>今日杯数</span>
      <div>8271</div>
    </li>
    <li>
      <span>今日订单</span>
      <div>8271</div>
    </li>
  </ul>
  <div class="between ml25 mr25 mt30">
    <charts />
    <hots />
  </div>
  <div class="mt60 mb60">
    <orders />
  </div>
</div>
</template>

<script type='es6'>
import charts from './datas/charts'
import hots from './datas/hots'
import orders from './datas/orders'
export default {
  name: 'app',
  components: {
    charts,
    hots,
    orders
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

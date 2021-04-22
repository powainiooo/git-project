<style lang="stylus" type="text/stylus">
@import "../../assets/css/global.styl"

.details-frame
  width 600px
  height 100%
  overflow-y auto
  background-color #ffffff
  position relative
  transition all 0.5s cubic-bezier(.25,.76,.36,.97)
  &::-webkit-scrollbar
    width 2px
    background-color transparent
  &::-webkit-scrollbar-thumb
    background-color #5B85E6
  .details-btns
    position absolute
    top 30px
    left 30px
    right 30px
  .details-tabs
    margin-top 84px
    margin-right 40px
    display flex
    justify-content flex-end
    .tab-bar
      width 250px
.c-infos-titles
  between()
  border-bottom 1px solid #EEEEEF
  padding-bottom 20px
  .l
    height 26px
    font-size 18px
    line-height 26px
    position relative
    padding-left 38px
    color #000000
    img
      width auto
      height 26px
      abTL(0, 10px)
  .ivu-btn
    width 90px
    margin-right 20px
</style>

<template>
<div class="details-frame" :style="{width: page === 'info' ? '650px' : '1300px'}">
  <div class="details-btns">
    <a href="javascript:;" class="fl" v-show="page === 'charts' || page === 'table'" @click="page = 'info'"><img src="@/assets/img/ico-back.png" width="28" /></a>
    <a href="javascript:;" class="fr" @click="$emit('close')"><img src="@/assets/img/ico-close2.png" width="28" /></a>
  </div>

  <div class="details-tabs" v-if="page === 'charts' || page === 'table'">
    <RadioGroup v-model="page" type="button" button-style="solid" class="tab-bar">
      <Radio label="charts">销售数量</Radio>
      <Radio label="table">订单列表</Radio>
    </RadioGroup>
  </div>

  <infos v-if="page === 'info'" :record="record" @toggle="toggle" />
  <charts v-if="page === 'charts'" :record="record" />
  <orders v-if="page === 'orders'" :record="record" @toggle="toggle" />
  <refunds v-if="page === 'refunds'" @toggle="toggle" />
</div>
</template>

<script type='es6'>
import infos from './infos'
import charts from './charts'
import orders from './orders'
import refunds from './refunds'
export default {
  name: 'app',
  components: {
    infos,
    charts,
    orders,
    refunds
  },
  props: {
    record: Object,
    default: () => {}
  },
  data () {
    return {
      visible: false,
      page: 'refunds'
    }
  },
  methods: {
    toggle (page) {
      this.page = page
    }
  }
}
</script>

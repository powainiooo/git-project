<style lang="stylus" type="text/stylus">
@import "../../assets/css/mixin.styl"
.orders-container
  background-color #ffffff; min-height 100%; position relative; overflow hidden; padding-top 11px;
  &:before
    content ''; size(100%, 68px); background-color #F9F9F9; abTL(0, 0); z-index 0;
.table-scroll
  height calc(100vh - 308px); overflow-y auto
</style>

<template>
<div class="orders-container">
  <div class="pr">
    <Tabs type="card" class="tee-tabs" @on-click="tabChange">
      <TabPane name="tee" label="茶饮订单">
        <tee ref="tee" />
      </TabPane>
      <TabPane name="peri" label="周边订单">
        <peripheral ref="peri" />
      </TabPane>
    </Tabs>
  </div>
</div>
</template>

<script type='es6'>
import tee from './orders/tee'
import peripheral from './orders/peripheral'
export default {
  name: 'app',
  components: {
    tee,
    peripheral
  },
  data () {
    return {}
  },
  mounted () {
    this.$refs.tee.getListData()
    this.$refs.tee.interval()
  },
  beforeRouteLeave (to, from, next) {
    this.$refs.tee.stop()
    next()
  },
  methods: {
    tabChange (name) {
      this.$refs[name].getListData()
    }
  }
}
</script>

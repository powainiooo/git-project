<style scoped>
.list-container { height: calc(100vh - 224px); overflow-x: hidden; overflow-y: auto; position: relative; }
.list-container .item { width: 634px; margin: 40px auto; }
.coupon-bg { width: 100%; height: calc(100vh - 224px); position: absolute; left: 0; bottom: 0; z-index: 0; background-color: #ffffff; }
.coupon-bg .coupon-img { width: 400px; opacity: .2; }
</style>

<template>
<div class="page">
  <c-header />
  <div class="container2 pt20 pr" style="padding-bottom: 0;">
    <div class="coupon-bg center"><img src="/static/images/index/coupon.png" mode="widthFix" class="coupon-img" /></div>
    <tabs>
      <tab-pane name="tee" title="未使用">
        <div class="list-container">
          <div class="item" v-for="i in 5">
            <item extraClass="coupon-item-min" />
          </div>
        </div>
      </tab-pane>
      <tab-pane name="nearby" title="已使用">
        <div class="list-container">
          <div class="item" v-for="i in 5">
            <item extraClass="coupon-item-min" />
          </div>
        </div>
      </tab-pane>
    </tabs>
  </div>
</div>
</template>

<script>
import cHeader from '@/components/header'
import cFooter from '@/components/footer'
import tabs from '@/components/Tabs/tabs'
import tabPane from '@/components/Tabs/tabPane'
import item from '@/pages/coupon/modules/item'
export default {
  components: {
    cHeader,
    cFooter,
    tabs,
    tabPane,
    item
  },
  data () {
    return {
    }
  },

  methods: {
  },

  onLoad () {
    Object.assign(this.$data, this.$options.data())
  }
}
</script>

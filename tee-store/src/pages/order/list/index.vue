<style scoped>
.list-item { margin-bottom: 35px; }
</style>

<template>
<div class="page">
  <c-header />
  <div class="container2 pt20">
    <tabs>
      <tab-pane name="tee" title="茶饮订单">
        <div class="bg-fff pt40">
          <div class="list-item" v-for="i in 5" :key="i">
            <item />
          </div>
        </div>
      </tab-pane>
      <tab-pane name="nearby" title="周边订单">
        <div class="bg-fff pt40">
          <div class="list-item" v-for="i in 5" :key="i">
            <item2 />
          </div>
        </div>
      </tab-pane>
    </tabs>
  </div>
  <c-footer current="list" />
</div>
</template>

<script>
import cHeader from '@/components/header'
import cFooter from '@/components/footer'
import tabs from '@/components/Tabs/tabs'
import tabPane from '@/components/Tabs/tabPane'
import item from './modules/item'
import item2 from './modules/item2'
export default {
  components: {
    cHeader,
    cFooter,
    item,
    item2,
    tabs,
    tabPane
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

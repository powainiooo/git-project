<style scoped>

</style>

<template>
<div class="container ovh">
  <div class="infos-line">
    <button class="btn">喜茶·深圳宝安大仟里店</button>
    <button class="btn-circle"><img src="@/assets/img/home.png" class="w28" /></button>
  </div>
  <div class="container2 container3 list-container">
    <tabs>
      <tab-pane name="tee" title="茶饮订单">
        <item />
      </tab-pane>
      <tab-pane name="nearby" title="周边订单">
        <item2 />
      </tab-pane>
    </tabs>
  </div>
</div>
</template>

<script type='es6'>
import tabs from '@/components/Tabs/tabs'
import tabPane from '@/components/Tabs/tabPane'
import item from './modules/item'
import item2 from './modules/item2'
export default {
  name: 'app',
  components: {
    tabs,
    tabPane,
    item,
    item2
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

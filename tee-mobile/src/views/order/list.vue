<style scoped>

</style>

<template>
<div class="container ovh">
  <infos />
  <div class="container2 container3 list-container">
    <tabs>
      <tab-pane name="tee" title="茶饮订单">
        <tee />
      </tab-pane>
      <tab-pane name="nearby" title="周边订单">
        <nearby />
      </tab-pane>
    </tabs>
  </div>
</div>
</template>

<script type='es6'>
import tabs from '@/components/Tabs/tabs'
import tabPane from '@/components/Tabs/tabPane'
import infos from '@/components/infos'
import tee from './modules/tee'
import nearby from './modules/nearby'
export default {
  name: 'app',
  components: {
    tabs,
    tabPane,
    infos,
    tee,
    nearby
  },
  data () {
    return {}
  },
  methods: {
  }
}
</script>

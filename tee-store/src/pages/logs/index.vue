<style scoped>

</style>

<template>
<div class="page">
<!--  <c-header />-->
  <div class="container">
    <tabs>
      <tab-pane name="tee" title="tee1">
        <div class="test" v-if="show">{{test}}</div>
      </tab-pane>
    </tabs>
  </div>
<!--  <c-footer current="order" />-->
</div>
</template>

<script>
import cHeader from '@/components/header'
import cFooter from '@/components/footer'
import tabs from '@/components/Tabs/tabs'
import tabPane from '@/components/Tabs/tabPane'
export default {
  components: {
    cHeader,
    cFooter,
    tabs,
    tabPane
  },
  data () {
    return {
      show: true,
      test: 'test1'
    }
  },

  methods: {
  },

  onLoad () {
    setTimeout(() => {
      this.test = 'test2'
    }, 1000)
    setTimeout(() => {
      this.show = false
    }, 2000)
    setTimeout(() => {
      this.show = true
      this.test = 'test3'
    }, 3000)
  }
}
</script>

<style scoped>

</style>

<template>
<div class="container">
  <div class="hr20"></div>
  <div class="consult-frame">
    <div class="blue-frame mb60">
      <h3>心率正常值</h3>
      <p>{{record.sm}}</p>
    </div>

    <div class="title1">常规检查</div>
    <div class="consult-table">
      <rich-text :nodes="record.desc"></rich-text>
    </div>
  </div>
  <operates :id="id" />
</div>
</template>

<script>
import operates from '@/components/operates'
import {postAction} from '../../utils/api'

export default {
  components: {
    operates
  },
  data () {
    return {
      id: '',
      record: {}
    }
  },
  methods: {
    getData () {
      postAction('heart_rate').then(res => {
        if (res.ret === 0) {
          this.record = res.data
        }
      })
    }
  },
  onLoad (options) {
    this.id = options.id
    this.getData()
  }
}
</script>

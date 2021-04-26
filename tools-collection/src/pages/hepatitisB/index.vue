<style scoped>

</style>

<template>
<div class="container">
  <div class="hr20"></div>
  <div class="consult-frame">
    <div class="blue-frame mb60">
      <h3>乙肝五项</h3>
      <p>{{record.sm}}</p>
    </div>

    <div class="title1">定义</div>
    <div class="consult-table">
      <rich-text :nodes="record.desc"></rich-text>
    </div>
    <div class="title1">指标</div>
    <div class="consult-table">
      <rich-text :nodes="record.desc_2"></rich-text>
    </div>
    <div class="title1">结果分析</div>
    <div class="consult-table">
      <rich-text :nodes="record.desc_3"></rich-text>
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
      postAction('y_gan').then(res => {
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

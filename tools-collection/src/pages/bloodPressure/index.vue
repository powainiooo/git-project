<style scoped>

</style>

<template>
  <div class="container">
    <div class="hr20"></div>
    <div class="consult-frame">
      <div class="blue-frame mb30">
        <h3 class="f30">正常血压</h3>
        <p class="f30">{{record.normal}}</p>
      </div>
      <div class="blue-frame mb60">
        <h3 class="f30">异常血压</h3>
        <p class="f30">（1）高血压：{{record.high}}</p>
        <p class="f30">（2）低血压：{{record.low}}</p>
      </div>

      <div class="title1">中国人的平均正常血压参考值：</div>
      <div class="consult-table" v-if="record.list">
        <ul class="thead">
          <li>年龄</li>
          <li>收缩压（男）</li>
          <li>舒张压（男）</li>
          <li>收缩压（女）</li>
          <li>舒张压（女）</li>
        </ul>
        <ul class="tr" v-for="item in record.list" :key="index">
          <li>{{item.age}}</li>
          <li>{{item.nan_ss}}</li>
          <li>{{item.nan_sz}}</li>
          <li>{{item.nv_ss}}</li>
          <li>{{item.nv_sz}}</li>
        </ul>
      </div>
      <div class="hint1">注：以上统计为1998年完成的，如今人的平均血压有所增加。</div>
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
      postAction('blood_pressure').then(res => {
        if (res.ret === 0) {
          this.record = res.data
        }
      })
    }
  },
  onShareAppMessage () {
    const pages = getCurrentPages()
    const view = pages[pages.length - 1]
    return {
      title: '血压参考表',
      path: `/${view.route}?id=${this.id}`
    }
  },
  onLoad (options) {
    this.id = options.id
    this.getData()
  }
}
</script>

<style scoped>

</style>

<template>
  <div class="container3">
    <div class="hr20"></div>
    <div class="consult-frame">
      <div class="blue-frame mb60">
        <h3>血糖正常值</h3>
        <p>{{record.normal}}</p>
      </div>

      <div class="title1">血糖值对照表（血糖浓度单位：mmol/l）</div>
      <div class="consult-table" v-if="record.list">
        <ul class="thead">
          <li>诊断</li>
          <li>条件</li>
          <li>静脉（全血）</li>
          <li>毛细血管</li>
          <li>静脉（血浆）</li>
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
    <operates />
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
      record: {}
    }
  },
  methods: {
    getData () {
      postAction('blood_suger').then(res => {
        if (res.ret === 0) {
          this.record = res.data
        }
      })
    }
  },
  onLoad () {
    this.getData()
  }
}
</script>

<style scoped>
.consult-table2 ul li { flex: auto; }
.consult-table2 .td-w1 { width: 100px; text-align: left; padding-right: 36px; }
.consult-table2 .td-w2 { width: 150px; text-align: center; }
.consult-table2 .tr { align-items: center; }
.consult-table2 .tr div { width: 550px }
.consult-table2 .tr .td-w1 { padding-right: 10px; }
</style>

<template>
  <div class="container">
    <div class="hr20"></div>
    <div class="consult-frame">
      <div class="blue-frame mb60">
        <h3>血糖正常值</h3>
        <p>{{record.normal}}</p>
      </div>

      <div class="title1">血糖值对照表（血糖浓度单位：mmol/l）</div>
      <div class="consult-table consult-table2" v-if="record.list">
        <ul class="thead">
          <li class="td-w1">诊断</li>
          <li class="td-w1">条件</li>
          <li class="td-w2">静脉（全血）</li>
          <li class="td-w2">毛细血管</li>
          <li class="td-w2">静脉（血浆）</li>
        </ul>
        <ul class="tr" v-for="item in record.list" :key="index">
          <li class="td-w1">{{item.result}}</li>
          <div>
            <ul class="td flex" v-for="(item2, index2) in item.sub" :key="index2">
              <li class="td-w1">{{item2.condition}}</li>
              <li class="td-w2">{{item2.jm}}</li>
              <li class="td-w2">{{item2.xg}}</li>
              <li class="td-w2">{{item2.xj}}</li>
            </ul>
          </div>
        </ul>
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
      postAction('blood_suger').then(res => {
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
      title: '血糖参考表',
      path: `/${view.route}?id=${this.id}`
    }
  },
  onLoad (options) {
    this.id = options.id
    this.getData()
  }
}
</script>

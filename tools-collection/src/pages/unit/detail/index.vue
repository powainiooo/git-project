<style scoped>
.unit-list li { display: flex; height: 100px; }
.unit-list li img { width: 12px; position: absolute; top: 39px; right: 30px; }
.unit-list li div { width: 340px; font-size: 28px; position: relative; }
.unit-list li div:after { content: ''; width: 2px; height: 100%; position: absolute; top: 0; right: 0; background-color: #D5D5D5; transform: scaleX(.5); }
.unit-list li input { width: 300px; height: 100%; padding-left: 38px; font-size: 28px; }
</style>

<template>
<div class="container">
  <div class="hr20"></div>

  <ul class="unit-list">
    <li class="borderB" v-for="(key, name) in units" :key="key">
      <div class="center">{{key}}({{name}})</div>
      <input type="digit" placeholder="请输入数字" v-model="values[name]" @input="inputChange($event, name)" />
      <img src="/static/images/arrow6.png" mode="widthFix" />
    </li>
  </ul>

  <operates :id="id" />
</div>
</template>

<script>
import operates from '@/components/operates'
import {postAction} from '../../../utils/api'

export default {
  components: {
    operates
  },
  data () {
    return {
      id: '',
      key: '',
      units: {},
      values: {}
    }
  },
  methods: {
    getUnits () {
      postAction(`pre_${this.key}_unit`).then(res => {
        if (res.ret === 0) {
          this.units = res.data
          for (const key in res.data) {
            this.$set(this.values, key, '')
          }
        }
      })
    },
    inputChange (e, key) {
      if (e.target.value === '') {
        for (const key in this.units) {
          if (this.values[key] !== undefined) {
            this.values[key] = ''
          }
        }
        return
      }
      postAction(`${this.key}_unit`, {
        from_unit: key,
        num: e.target.value
      }).then(res => {
        if (res.ret === 0) {
          const data = res.data.result
          for (const key in data) {
            console.log(this.values[key], data[key])
            if (this.values[key] !== undefined) {
              this.values[key] = data[key]
            }
          }
          console.log('this.values[key]', this.values)
        }
      })
    }
  },
  onShow () {
    this.units = {}
    this.values = {}
  },
  onLoad (options) {
    this.key = options.key || 'length'
    this.id = options.id
    mpvue.setNavigationBarTitle({
      title: options.name
    })
    this.getUnits()
  }
}
</script>

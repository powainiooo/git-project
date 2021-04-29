<style scoped>
.con-nav { width: 216px; position: fixed; top: 20px; left: 0; bottom: 100px; background-color: #F9F9F7; overflow-y: auto; }
.con-nav li { width: 100%; height: 106px; display: flex; align-items: center; padding-left: 40px; position: relative; font-size: 28px; }
.con-nav li.active { background-color: #FFFFFF; }
.con-nav li.active:before { content: ''; width: 2px; height: 36px; border-radius: 0 10px 10px 0; background-color: #5FBD80; position: absolute; top: 35px; left: 0; }

.con-details { margin: 15px 30px 30px 240px }
.con-details p { font-size: 18px; color: #666666; line-height: 35px; margin-bottom: 30px; }
</style>

<template>
  <div class="container">
    <div class="hr20"></div>
    <ul class="con-nav">
      <li v-for="item in list"
          :key="index"
          :class="{'active': item === name}"
          @click="toggle(item)">{{item}}</li>
    </ul>

    <div class="con-details">
      <div class="c-tag" style="background-color: #80BEE4;">今日运势</div>
      <p>{{today}}</p>
      <div class="c-tag" style="background-color: #7FBE58;">明日运势</div>
      <p>{{tomorrow}}</p>
      <div class="c-tag" style="background-color: #EA749E;">本周运势</div>
      <p>{{week}}</p>
      <div class="c-tag" style="background-color: #AB92DC;">本月运势</div>
      <p>{{month}}</p>
      <div class="c-tag" style="background-color: #F39F5B;">今年运势</div>
      <p>{{year}}</p>
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
      list: ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'],
      name: '白羊座',
      today: '',
      tomorrow: '',
      week: '',
      month: '',
      year: ''
    }
  },
  methods: {
    toggle (name) {
      this.name = name
      this.getData()
    },
    getData () {
      postAction('constellation_query', {
        consName: this.name
      }).then(res => {
        if (res.ret === 0) {
          this.today = res.data.today
          this.tomorrow = res.data.tomorrow
          this.week = res.data.week
          this.month = res.data.month
          this.year = res.data.year
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

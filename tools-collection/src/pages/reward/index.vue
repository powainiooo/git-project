<style scoped>
.banner { width: 100%; }
.top { width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; flex-direction: column; position: absolute; top: 0; left: 0; }
.top p { font-size: 30px; color: #FFFFFF; }
.top div { font-size: 68px; color: #FFFFFF; line-height: 68px; margin-top: 30px; margin-bottom: 38px; }
.list { background-color: #FFFFFF; padding: 50px 0; }
.list .list-item { display: flex; align-items: center; justify-content: space-between; margin-bottom: 50px; }
.list .list-item .tool-item { width: 190px; height: 98px; }
.list .list-item .time { font-size: 20px; }
.list .list-item .point { font-size: 34px; margin-right: 30px; }
</style>

<template>
  <div class="container2">
    <div class="pr">
      <img src="/static/images/banner1.png" mode="widthFix" class="banner"/>
      <div class="top">
        <p>共发出</p>
        <div>¥{{money}}</div>
        <p>发出{{nums}}个打赏</p>
      </div>
    </div>
    <div class="list">
      <div v-for="item in list"
           :key="id"
           class="list-item">
        <div class="acenter">
          <a href="#" class="tool-item">
            <img :src="imgSrc + item.imgpath" mode="aspectFill" />
            <div>{{item.name}}</div>
          </a>
          <p class="time">{{item.timeStr}}</p>
        </div>
        <div class="point">+{{item.ds_money}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { postAction } from '@/utils/api'
import { formatDate } from '@/utils'

export default {

  data () {
    return {
      imgSrc: mpvue.imgSrc,
      money: 0,
      nums: 0,
      list: []
    }
  },
  methods: {
    getData () {
      postAction('dsjl').then(res => {
        if (res.ret === 0) {
          this.money = res.data.ds_total_money
          this.nums = res.data.ds_total_num
          res.data.dsjl.forEach(i => {
            i.timeStr = formatDate(new Date(i.ctime * 1000), 'yyyy.MM.dd HH:mm:ss')
          })
          this.list = res.data.dsjl
        }
      })
    }
  },
  onShow () {
    this.getData()
  }
}
</script>

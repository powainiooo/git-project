<style>
page { background-color: #F8F8F8; }
.footPrint-container { margin-top: 40px; }
.footPrint-container .line { width: 5px; position: fixed; top: 20px; left: 50px; bottom: 0; background-color: #FFFFFF; }
.footPrint-item { margin-bottom: 40px; }
.footPrint-item .time { margin-left: 75px; position: relative; margin-bottom: 40px; }
.footPrint-item .time:before { content: ''; width: 20px; height: 20px; border-radius: 50%; border: 4px solid #F1380D; background-color: #F8F8F8; box-sizing: border-box; position: absolute; top: 8px; left: -36px; }
.footPrint-item .list { width: 610px; padding: 40px 20px 0 20px; display: flex; flex-wrap: wrap; border-radius: 6px; background-color: #FFFFFF; margin-left: 90px; }
.footPrint-item .list .tool-item { margin: 0 34px 40px 34px; }
</style>

<template>
  <div class="footPrint-container">
    <div class="line"></div>
    <div class="footPrint-item" v-for="item in list" :key="index">
      <div class="time">{{item.date}}</div>
      <div class="list">
        <a v-for="(child, index2) in item.list"
           :key="id"
           :href="child.href"
           class="tool-item">
          <img :src="imgSrc + child.imgpath" mode="aspectFill" />
          <div>{{child.name}}</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { postAction } from '@/utils/api'
import { formatUrl } from '@/utils'

export default {

  data () {
    return {
      imgSrc: mpvue.imgSrc,
      list: []
    }
  },
  methods: {
    getData () {
      postAction('my_zj').then(res => {
        if (res.ret === 0) {
          const list = res.data.list
          const arr = []
          for (let i in list) {
            for (let j in list[i]) {
              for (let k in list[i][j]) {
                console.log(k)
                arr.push({
                  date: k,
                  list: formatUrl(list[i][j][k])
                })
              }
            }
          }
          this.list = arr
        }
      })
    }
  },
  onShow () {
    this.getData()
  }
}
</script>

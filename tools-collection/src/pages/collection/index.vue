<style scoped>
.list {}
</style>

<template>
  <div>
    <div class="hr20"></div>
    <div class="tool-list mt70" v-if="list.length > 0">
      <a v-for="item in list"
         :key="id"
         href="#"
         class="tool-item">
        <img :src="imgSrc + item.imgpath" mode="aspectFill" />
        <div>{{item.name}}</div>
      </a>
    </div>
    <div class="empty" v-else>
      没有任何信息
    </div>
  </div>
</template>

<script>
import { postAction } from '@/utils/api'
export default {

  data () {
    return {
      imgSrc: mpvue.imgSrc,
      list: []
    }
  },
  methods: {
    getData () {
      postAction('my_sc').then(res => {
        if (res.code === 0) {
          this.list = res.data.my_sc
        }
      })
    }
  },
  onShow () {
    this.getData()
  }
}
</script>

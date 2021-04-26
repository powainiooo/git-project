<style scoped>
.tips-content { margin: 40px 30px; }
.tips-content h3 { font-size: 28px; color: #000000; margin-bottom: 40px; text-align: center; }
.tips-content p { font-size: 20px; line-height: 44px; }
</style>

<template>
  <div class="container3" @touchstart="tstart" @touchmove="tmove" @touchend="tend">
    <div class="hr20"></div>

    <div class="to-next">
      <a href="javascript:;" @click="getData">右划显示下一条</a>
    </div>

    <div class="tips-content" v-for="item in list" :key="index">
      <p><rich-text :nodes="item.content"></rich-text></p>
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
      list: [],
      sx: 0,
      ex: 0
    }
  },
  methods: {
    getData () {
      postAction('life_tip').then(res => {
        if (res.ret === 0) {
          this.list = res.data
        }
      })
    },
    tstart (e) {
      this.sx = e.clientX
    },
    tmove (e) {
      this.ex = e.clientX
    },
    tend (e) {
      if (this.sx > this.ex) {
        this.getData()
      }
    }
  },
  onLoad (options) {
    this.id = options.id
    this.getData()
  }
}
</script>

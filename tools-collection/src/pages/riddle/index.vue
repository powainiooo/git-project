<style scoped>
.riddle-item { padding: 40px 60px; }
.riddle-item h3 { font-size: 30px; color: #3D7FC7; margin-bottom: 20px; text-align: center; }
.riddle-item h4 { font-size: 26px; color: #666666; margin-bottom: 50px; text-align: center; }
.riddle-item div { font-size: 26px; line-height: 40px; }
.riddle-item div span { color: #3D7FC7; }
</style>

<template>
  <div class="container" @touchstart="tstart" @touchmove="tmove" @touchend="tend">
    <div class="hr20"></div>
    <div class="to-next">
      <a href="javascript:;" @click="getData">右划显示下一条</a>
    </div>
    <div class="riddle-item borderT borderB" v-for="item in list" :key="index">
      <h3>{{item.quest}}</h3>
<!--      <h4>（打一四字成语）</h4>-->
      <div><span>答案：</span>{{item.answer}}</div>
    </div>

    <operates :id="id" />
  </div>
</template>

<script>
import operates from '@/components/operates'
import {postAction} from '@/utils/api'

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
      postAction('riddle').then(res => {
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
      if (this.sx > this.ex && this.ex !== 0) {
        this.getData()
      }
      this.ex = 0
    }
  },
  onLoad (options) {
    this.id = options.id
    this.getData()
  }
}
</script>

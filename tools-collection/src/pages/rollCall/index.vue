<style scoped>
.txt { width: 100%; height: 350px; background-color: #F4F4F4; padding: 20px 40px; box-sizing: border-box; font-size: 28px; color: #333333; }
.line1 { width: 500px; margin: 36px auto 88px auto; }
.line2 { width: 330px; height: 330px; background-color: #436CB3; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-size: 90px; line-height: 100px; color: #FFFFFF; text-align: center; margin: 0 auto 50px auto; }
</style>

<template>
  <div class="container">
    <div class="hr20"></div>
    <textarea class="txt" :rows="6" placeholder="请输入所有点名的姓名，以 | 分隔" v-model="names"></textarea>
    <div class="line1"><button class="btn" @click="doCall">立即点名</button></div>
    <div class="line2" v-if="current !== ''">{{current}}</div>
    <operates />
  </div>
</template>

<script>
import operates from '@/components/operates'

export default {
  components: {
    operates
  },
  data () {
    return {
      names: '', // 张三|赵四|王五|周六
      current: '',
      index: 0,
      list: []
    }
  },
  methods: {
    doCall () {
      console.log('doCall')
      if (this.list.length === 0) {
        if (this.names === '') {
          mpvue.showToast({
            title: '请输入姓名',
            icon: 'none'
          })
          return false
        }
        const arr = this.names.split('|').filter(i => i.trim() !== '').sort((a, b) => Math.random() - 0.5)
        console.log('arr', arr)
        this.list = arr
        this.doCall()
      } else {
        this.current = this.list[this.index]
        this.index += 1
        if (this.index === this.list.length) {
          mpvue.showToast({
            title: '已经全部完成'
          })
        }
      }
    }
  },
  created () {
  }
}
</script>

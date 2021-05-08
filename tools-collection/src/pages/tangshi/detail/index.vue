<style scoped>
.details h1 { font-size: 36px; color: #3D7FC7; text-align: center; margin: 40px 30px 30px 30px; }
.details .author { font-size: 26px; color: #666666; margin-bottom: 30px; margin-right: 120px; text-align: right; }
.details .poetry { font-size: 36px; line-height: 65px; margin:0 50px 70px 50px; display: flex; justify-content: center;  }
.details .content { margin: 30px; font-size: 26px; line-height: 44px; }
</style>

<template>
  <div class="container details">
    <div class="hr20"></div>
    <h1>《{{record.title}}》</h1>
    <div class="author">[唐] {{record.author}}</div>
    <div class="poetry">
      <rich-text :nodes="record.content"></rich-text>
    </div>
    <ul class="tabs1">
      <li :class="{'active': tabKey === 0}" @click="toggle(0)">注释</li>
      <li :class="{'active': tabKey === 1}" @click="toggle(1)">译文</li>
      <li :class="{'active': tabKey === 2}" @click="toggle(2)">赏析</li>
    </ul>

    <div class="content">{{details}}</div>
  </div>
</template>

<script>
import store from '../../../store'

export default {
  data () {
    return {
      tabKey: 0
    }
  },
  computed: {
    record () {
      return store.state.poetryData
    },
    details () {
      if (this.tabKey === 0) {
        return this.record.zs
      } else if (this.tabKey === 1) {
        return this.record.fy
      } else if (this.tabKey === 2) {
        return this.record.sx
      }
    }
  },
  methods: {
    toggle (key) {
      this.tabKey = key
      console.log('this.tabKey', this.tabKey)
    }
  },
  created () {
  }
}
</script>

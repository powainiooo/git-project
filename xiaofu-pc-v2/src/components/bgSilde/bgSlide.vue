<style scoped>
.c-bg-slide {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 1);
  z-index: 0;
  overflow: hidden;
}
.c-bg-slide-list {
  width: 100%;
  height: 100%;
}
.c-bg-slide:after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.88);
}
</style>

<template>
<div class="c-bg-slide">
  <div class="c-bg-slide-list" :style="{width: nums * 360 + 'px'}">
    <slide-item v-for="i in nums"
                :key="i"
                :list="list"
                :direct="i % 2 === 0 ? 'down' : 'up'" />
  </div>
</div>
</template>

<script type='es6'>
import slideItem from './slideItem'
import { postAction } from '../../utils'
export default {
  name: 'app',
  components: {
    slideItem
  },
  data () {
    return {
      list: [],
      nums: 0
    }
  },
  mounted () {
    const ww = window.innerWidth > 1920 ? window.innerWidth : 1920
    this.nums = Math.ceil(ww / 360)
    this.getData()
  },
  methods: {
    getData () {
      postAction('/editor/ticket/random').then(res => {
        if (res.code === 1) {
          this.list = res.data.list
        }
      })
    }
  }
}
</script>

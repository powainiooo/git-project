<style scoped>
.points-list2 li { height: 132px; }
</style>

<template>
<div class="c-drawer" v-if="visible">
  <div class="c-drawer-cover" :class="{'c-drawer-cover-show': showItem}" @animationend="animationend"></div>
  <div class="c-drawer-box" :class="{'c-drawer-show': showItem}">
    <div class="btn-circle c-drawer-close" @click="hide"><img src="/static/images/x2.png" /></div>
    <div class="c-drawer-title">使用记录</div>
    <div class="points-list points-list2">
      <ul>
        <li class="borderB between">
          <div>
            <div class="f24">扫码获得</div>
            <div class="f20 c-c9">喜茶·深圳大仟里店</div>
            <div class="f20 c-c9">2021/04/01 13:10:30</div>
          </div>
          <div class="price c-main"><span>+10</span>积分</div>
        </li>
        <li class="borderB between">
          <div>
            <div class="f24">扫码获得</div>
            <div class="f20 c-c9">喜茶·深圳大仟里店</div>
            <div class="f20 c-c9">2021/04/01 13:10:30</div>
          </div>
          <div class="price c-main"><span>+10</span>积分</div>
        </li>
        <li class="borderB between">
          <div>
            <div class="f24">扫码获得</div>
            <div class="f20 c-c9">喜茶·深圳大仟里店</div>
            <div class="f20 c-c9">2021/04/01 13:10:30</div>
          </div>
          <div class="price c-main"><span>+10</span>积分</div>
        </li>
        <li class="borderB between">
          <div>
            <div class="f24">扫码获得</div>
            <div class="f20 c-c9">喜茶·深圳大仟里店</div>
            <div class="f20 c-c9">2021/04/01 13:10:30</div>
          </div>
          <div class="price c-main"><span>+10</span>积分</div>
        </li>
        <li class="borderB between">
          <div>
            <div class="f24">扫码获得</div>
            <div class="f20 c-c9">喜茶·深圳大仟里店</div>
            <div class="f20 c-c9">2021/04/01 13:10:30</div>
          </div>
          <div class="price c-main"><span>+10</span>积分</div>
        </li>
        <li class="borderB between">
          <div>
            <div class="f24">扫码获得</div>
            <div class="f20 c-c9">喜茶·深圳大仟里店</div>
            <div class="f20 c-c9">2021/04/01 13:10:30</div>
          </div>
          <div class="price c-main"><span>+10</span>积分</div>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  data() {
    return {
      visible: false,
      showItem: false
    }
  },
  methods: {
    show () {
      this.visible = true
      this.$nextTick(() => {
        this.showItem = true
      })
    },
    hide () {
      this.showItem = false
    },
    animationend () {
      this.visible = false
    }
  }
}
</script>

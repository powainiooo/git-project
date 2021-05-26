<style scoped>

</style>

<template>
<div class="c-drawer" v-if="visible">
  <div class="c-drawer-cover" :class="{'c-drawer-cover-show': showItem}" @animationend="animationend"></div>
  <div class="c-drawer-box" :class="{'c-drawer-show': showItem}">
    <div class="btn-circle c-drawer-close" @click="hide"><img src="/static/images/x2.png" /></div>
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

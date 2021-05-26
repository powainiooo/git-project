<style scoped>
.c-carts .list { margin: 40px 30px; }
.c-carts .list .list-item { display: flex; align-items: center; margin-bottom: 60px; }
.c-carts .list .list-item .del { width: 30px; height: 30px; margin-right: 20px; }
.c-carts .list .list-item .del img { width: 100%; }
.c-carts .list .list-item .c-goods-item { flex: 1; }
.c-carts .list .list-item .c-goods-item .infos .intro { width: 320px; }
</style>

<template>
<div class="c-drawer" v-if="visible">
  <div class="c-drawer-cover" :class="{'c-drawer-cover-show': showItem}" @animationend="animationend"></div>
  <div class="c-drawer-box c-carts" :class="{'c-drawer-show': showItem}">
    <div class="btn-circle c-drawer-close" @click="hide"><img src="/static/images/x2.png" /></div>
    <div class="c-drawer-title">
      <img src="/static/images/cart.png" mode="widthFix" class="w34 mr10" />
      <span>购物车</span>
    </div>
    <div class="list">
      <div class="list-item" v-for="i in 3">
        <div class="del center">
          <img src="/static/images/reduce.png" mode="widthFix" />
        </div>
        <div class="c-goods-item" @click="$emit('detail')">
          <div class="imgs"><img src="/static/images/img2.png" mode="aspectFill" /></div>
          <div class="infos">
            <h3 class="title">[免费] 夏日特饮</h3>
            <div class="intro">优选新鲜柠檬、红茶。整颗新鲜柠檬加入其中，柠檬的清香与红茶的醇，柠檬的清香与红茶的醇</div>
            <div class="price"><span>25</span>元</div>
            <div class="tagC nums">1</div>
          </div>
        </div>
      </div>
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

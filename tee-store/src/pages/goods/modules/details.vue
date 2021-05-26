<style scoped>
.c-details .bg { width: 100%; height: 334px; border-radius: 70px 70px 0 0; }
.c-details .infos { margin: 20px 34px 36px 34px; padding: 0 10px 50px 10px; }
.c-details .infos .name { font-size: 30px; }
.c-details .infos .price { font-size: 20px; }
.c-details .infos .price span { font-size: 54px; line-height: 65px; }
.c-details .infos .intro { font-size: 20px; line-height: 26px; color: #C9C9C9; margin-top: 20px; }
.c-details .cates { margin: 0 40px 35px 40px; }
.c-details .cates h3 { font-size: 24px; margin: 0 0 25px 12px; }
.c-details .cates ul { display: flex; flex-wrap: wrap; }
.c-details .cates ul li { min-width: 110px; margin: 0 15px 15px 0; text-align: center; }
</style>

<template>
<div class="c-drawer" v-if="visible">
  <div class="c-drawer-cover" :class="{'c-drawer-cover-show': showItem}" @animationend="anEnd"></div>
  <div class="c-drawer-box c-details" :class="{'c-drawer-show': showItem}">
    <div class="btn-circle c-drawer-close" @click="hide"><img src="/static/images/x2.png" /></div>
    <img src="/static/images/img.jpg" mode="aspectFill" class="bg" />
    <div class="infos">
      <div class="between">
        <div class="name">夏日特饮</div>
        <div class="price"><span>25</span>元</div>
      </div>
      <div class="intro">优选新鲜柠檬、红茶。整颗新鲜柠檬加入其中，柠檬的清香与红茶的醇香，为夏日带来清爽的口感。优选新鲜柠檬、红茶。整颗新鲜柠檬加入其中，柠檬的清香与红茶的醇香，为夏日带来清爽的口感。</div>
    </div>

    <div class="cates">
      <h3>温度</h3>
      <ul>
        <li class="btn btn-style1">冰</li>
        <li class="btn btn-style2">温</li>
        <li class="btn btn-style2">烫</li>
      </ul>
    </div>
    <div class="cates">
      <h3>温度</h3>
      <ul>
        <li class="btn btn-style1">冰</li>
        <li class="btn btn-style2">温</li>
        <li class="btn btn-style2">烫</li>
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
      setTimeout(() => {
        this.visible = false
      }, 500)
    }
  }
}
</script>

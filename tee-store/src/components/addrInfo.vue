<style scoped>

</style>

<template>
<div class="addr-info">
  <div class="between">
    <button class="btn">
      <span>喜茶·深圳宝安大仟里店</span>
      <img src="/static/images/arrow1.png" mode="widthFix" class="w10 ml20" />
    </button>
    <div class="acenter">
      <button class="btn-circle btn-cart" v-if="showCart" @click="openCarts">
        <img src="/static/images/icon-cart.png" mode="widthFix" class="w32" />
        <span class="nums">10</span>
      </button>
      <button class="btn-circle ml20" open-type="share" v-if="showShare">
        <img src="/static/images/icon-share.png" mode="widthFix" class="w28" />
      </button>
    </div>
  </div>
  <div class="dis">距离你1km</div>
  <!-- 购物车 -->
  <carts ref="cart" />
</div>
</template>

<script type='es6'>
import carts from './carts'
export default {
	name: 'app',
  props: {
	  showCart: {
	    type: Boolean,
      default: false
    },
	  showShare: {
	    type: Boolean,
      default: false
    }
  },
  components: {
    carts
  },
	data() {
		return {}
	},
	methods: {
    openCarts () {
      this.$refs.cart.show()
    }
  }
}
</script>

<style scoped>

</style>

<template>
<div class="addr-info">
  <div class="between">
    <button class="btn">
      <span>{{record.name}}</span>
      <img src="/static/images/arrow1.png" mode="widthFix" class="w10 ml20" />
    </button>
    <div class="acenter">
      <button class="btn-circle btn-cart" v-if="showCart" @click="openCarts">
        <img src="/static/images/icon-cart.png" mode="widthFix" class="w32" />
        <span class="nums" v-if="record.cartNum > 0">{{record.cartNum}}</span>
      </button>
      <button class="btn-circle ml20" open-type="share" v-if="showShare">
        <img src="/static/images/icon-share.png" mode="widthFix" class="w28" />
      </button>
    </div>
  </div>
  <div class="dis">距离你{{record.dis}}km</div>
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
    },
    record: {
	    type: Object,
      default: () => {}
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
      this.$refs.cart.show({
        shopId: this.record.shopId,
        type: this.record.cartType
      })
    }
  }
}
</script>

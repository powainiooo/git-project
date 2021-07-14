<style scoped>
.cartMove { animation: cartMove .5s ease-out both; }
@keyframes cartMove {
  0%, 100% { transform: scale(1) }
  50% { transform: scale(1.2) }
}
</style>

<template>
<div class="addr-info">
  <div class="between">
    <button class="btn acenter"
            v-if="showBtn"
            :hover-class="record.onlyName ? '' : 'hscale'"
            hover-stay-time="10"
            @click="btntap">
      <span>{{record.name}}</span>
      <img src="/static/images/arrow1.png" mode="widthFix" class="w10 ml20" v-if="!record.onlyName" />
    </button>
    <button class="btn acenter"
            v-if="showLocation"
            hover-class="hscale"
            hover-stay-time="10"
            @click="btntap">
      <img src="/static/images/icon-geo.png" mode="widthFix" class="w26 mr10" />
      <span>{{record.name}}</span>
    </button>
    <button open-type="contact" class="btn acenter" v-if="showService">
      <img src="/static/images/service.png" mode="widthFix" class="w26 mr20" />
      <span>客服</span>
    </button>
    <picker :range="cList" range-key="cname" @change="typeChange">
      <button class="btn" v-if="showTypes">
        <span>{{cname === '' ? '选择产品分类' : cname}}</span>
        <img src="/static/images/arrow1.png" mode="widthFix" class="w10 ml20" />
      </button>
    </picker>
    <div class="acenter">
      <button class="btn-circle btn-cart"
              :class="{'cartMove': cartBtnMove}"
              @animationend="cartBtnMove = false"
              v-show="showCart && record.cartNum > 0"
              @click="openCarts">
        <img src="/static/images/icon-cart.png" mode="widthFix" class="w32" />
        <span class="nums" v-if="record.cartNum > 0">{{record.cartNum}}</span>
      </button>
      <button class="btn-circle ml20" open-type="share" v-if="showShare">
        <img src="/static/images/icon-share.png" mode="widthFix" class="w28" />
      </button>
    </div>
  </div>
  <div class="dis" v-if="record.dis">距离你{{record.dis}}km</div>
  <!-- 购物车 -->
  <carts ref="cart" @refresh="handleRefresh" />
</div>
</template>

<script type='es6'>
import carts from './carts'
import { getAction } from '@/utils/api'

export default {
	name: 'app',
  props: {
	  showBtn: {
	    type: Boolean,
      default: true
    },
    showLocation: {
	    type: Boolean,
      default: false
    },
    showTypes: {
	    type: Boolean,
      default: false
    },
    showService: {
	    type: Boolean,
      default: false
    },
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
  watch: {
    record: {
      handler (val) {
        if (val.cartNum > this.oldCarts) {
          this.oldCarts = val.cartNum
          this.cartBtnMove = true
        } else {
          if (val.cartNum !== 0) {
            this.oldCarts = val.cartNum
          }
        }
      },
      immediate: true,
      deep: true
    }
  },
  components: {
    carts
  },
	data() {
		return {
		  cname: '',
      cList: [],
      oldCarts: 1110,
      cartBtnMove: false
    }
	},
  mounted () {
	  if (this.showTypes) {
      getAction('/userapi/nearby/cate/all').then(res => {
        if (res.code === 0) {
          this.cList = res.data
        }
      })
    }
  },
	methods: {
    handleRefresh () {
      this.$emit('refresh')
    },
    btntap () {
      this.$emit('tap')
    },
    openCarts () {
      this.$refs.cart.show({
        shopId: this.record.shopId,
        type: this.record.cartType
      })
    },
    hideCarts () {
      this.$refs.cart.hide()
    },
    typeChange (e) {
      const item = this.cList[e.mp.detail.value]
      this.cname = item.cname
      this.$emit('change', item.cid)
    }
  }
}
</script>

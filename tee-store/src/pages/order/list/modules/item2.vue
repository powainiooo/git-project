<style scoped>

</style>

<template>
<div class="order-item">
  <div class="order-item-box" hover-class="hscale" hover-stay-time="10" @click="toDetail">
    <div class="header between">
      <div class="title">{{record.express_type === 0 ? '门店自提' : '邮寄'}}</div>
      <button class="btn-circle btn-style1 mr30"
              v-if="record.express_type === 1 && record.status === 5"
              hover-stop-propagation
              @click.stop="$emit('post', record.id)">
        <img src="/static/images/post.png" mode="widthFix" class="w36" />
      </button>
      <button class="btn-circle btn-style1 mr30" v-if="record.express_type === 0" @click="btnGuide">
        <img src="/static/images/icon-guide.png" mode="widthFix" class="w26" />
      </button>
      <button class="btn mr30 btn-style3" v-if="record.status === 4 && record.express_type === 1">待发货</button>
    </div>

    <div class="body between">
      <div class="l">
        <h3 class="f24" v-if="record.express_type === 0">{{record.shop.shop_name}}</h3>
        <p class="f20 c-9e">{{record.created_at}}</p>
        <div class="flex mt20">
          <div class="imgs mr15" v-for="good in record.goods" :key="index"><img :src="imgSrc + good.goods_cover" mode="aspectFill" /></div>
        </div>
      </div>
      <div class="r">
        <div class="price"><span>{{record.pay_amount}}</span>元</div>
        <p class="tr f20 c-c9">共{{goodsNum}}件</p>
      </div>
    </div>

    <div class="footer ovh" v-if="record.status === 4 && record.express_type === 0">
      <div class="mt30">
        <c-codes :code="record.fetch_code" size="small" />
      </div>
    </div>
    <div class="cover" v-if="record.status === 7"><span>已完成</span></div>
  </div>
  <img src="/static/images/sd1.png" class="sd" mode="widthFix" />
</div>
</template>

<script type='es6'>
import cCodes from '@/components/codes'
export default {
	name: 'app',
  components: {
    cCodes
  },
  props: {
    record: Object
  },
  computed: {
    goodsNum () {
      return this.record.goods.reduce((total, i) => total + i.buy_nums, 0)
    }
  },
	data() {
		return {
      imgSrc: mpvue.imgSrc
		}
	},
	methods: {
    toDetail () {
      mpvue.navigateTo({
        url: `/pages/order/detail/nearby/main?id=${this.record.id}`
      })
    },
    btnGuide () {
      mpvue.openLocation({
        latitude: Number(this.record.shop.lat),
        longitude: Number(this.record.shop.lng)
      })
    }
	}
}
</script>

<style scoped>

</style>

<template>
<div class="order-item">
  <div class="order-item-box" hover-class="hscale" hover-stay-time="10" @click="toDetail">
    <div class="header between">
      <div class="title">门店自提</div>
      <button class="btn-circle btn-style1 mr30"><img src="/static/images/post.png" mode="widthFix" class="w36" /></button>
      <button class="btn-circle btn-style1 mr30" v-if="false"><img src="/static/images/icon-guide.png" mode="widthFix" class="w26" /></button>
      <button class="btn mr30 btn-style3" v-if="false">待发货</button>
    </div>

    <div class="body between">
      <div class="l">
        <h3 class="f24">喜茶·深圳大仟里店</h3>
        <p class="f20 c-9e">2021/04/01 13:10:30</p>
        <div class="flex mt20">
          <div class="imgs mr15"><img src="/static/images/img2.png" mode="aspectFill" /></div>
          <div class="imgs mr15"><img src="/static/images/img2.png" mode="aspectFill" /></div>
          <div class="imgs mr15"><img src="/static/images/img2.png" mode="aspectFill" /></div>
        </div>
      </div>
      <div class="r">
        <div class="price"><span>45</span>元</div>
        <p class="tr f20 c-c9">共3件</p>
      </div>
    </div>

    <div class="footer ovh">
      <div class="mt30">
        <c-codes code="3910" size="small" />
      </div>
    </div>
    <div class="cover" v-if="record.status === 7"><span>已完成</span></div>
  </div>
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
	data() {
		return {}
	},
	methods: {
    toDetail () {
      mpvue.navigateTo({
        url: `/pages/order/detail/nearby/main?id=${this.record.id}`
      })
    }
	}
}
</script>

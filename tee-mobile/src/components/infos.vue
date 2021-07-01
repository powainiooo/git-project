<style scoped>

</style>

<template>
<div class="infos-line">
  <button class="btn" @click="backIndex">{{currentDate}}</button>
  <div class="acenter">
    <button class="btn btn-style4 mr20" style="width: 18vw;" @click.stop="openModal(1)" v-if="pause === 0">休店</button>
    <button class="btn btn-style4 mr20" style="width: 18vw;" @click.stop="openModal(0)" v-if="pause === 1">恢复营业</button>
<!--    <button class="btn-circle" @click="backIndex"><img src="@/assets/img/home.png" class="w28" /></button>-->
  </div>

  <!-- 关门弹窗 -->
  <div class="c-modal" v-if="visible">
    <div class="c-modal-box">
      <img src="@/assets/img/bg2.png" class="bg" />
      <div class="pr">
        <div class="line1 center">
          <div class="txt1" v-if="pause === 0">CLOSED</div>
          <div class="txt1" v-if="pause === 1">OPEN</div>
        </div>
        <div class="title" v-if="pause === 0">是否确认休店？</div>
        <div class="desc" v-if="pause === 0">休店后消费者将无法在线上下单，小程序中将显示门店休息，请确认操作。</div>
        <div class="title" v-if="pause === 1">是否确认营业？</div>
        <div class="desc" v-if="pause === 1">恢复营业后消费者可在线上下单，请确认操作。</div>
        <div class="center">
          <button class="btn btn-style1" @click="changeStatus" v-if="pause === 0">确认休店</button>
          <button class="btn btn-style1" @click="changeStatus" v-if="pause === 1">确认营业</button>
          <button class="btn btn-style2" @click="visible = false">取消</button>
        </div>
      </div>
      <a href="javascript:;" class="close center" @click="visible = false"><img src="@/assets/img/x2.png" mode="widthFix" class="w18" /></a>
    </div>
  </div>
</div>
</template>

<script type='es6'>
import { postAction } from '@/utils'

export default {
  name: 'app',
  data () {
    return {
      visible: false,
      status: 0,
      isAjax: false
    }
  },
  computed: {
    pause () {
      if (this.$store.state.globalData.shop) {
        return this.$store.state.globalData.shop.pause
      }
      return -1
    },
    currentDate () {
      return this.$store.state.currentDate
    }
  },
  methods: {
    openModal (status) {
      this.status = status
      this.visible = true
    },
    changeStatus () {
      if (this.isAjax) return
      this.isAjax = true
      postAction('/shopapi/shop/pause', {
        pause: this.status
      }).then(res => {
        this.isAjax = false
        if (res.code === 0) {
          this.$Toast.success(res.msg)
          this.$store.dispatch('getUserData')
          this.visible = false
        }
      })
    },
    backIndex () {
      this.$router.replace({
        name: 'Home'
      })
    }
  }
}
</script>

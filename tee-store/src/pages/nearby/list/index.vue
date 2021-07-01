<style scoped>
.nearby-container { height: calc(100vh - 260px); margin-top: 0; overflow: hidden; overflow-y: scroll; }
</style>

<template>
<div class="page">
  <c-header menus />
  <div class="container" style="padding-bottom: 0;">
    <!-- 地址信息 -->
    <addr-info ref="top" :showBtn="false" showTypes showCart showShare :record="addrData" @change="typeChange" @refresh="getCart" />

    <div class="container2 nearby-container">
      <div class="mt25">
        <goods-list :list="list" />
      </div>
    </div>

  </div>
  <c-footer current="store" />
</div>
</template>

<script>
import cHeader from '@/components/header'
import cFooter from '@/components/footer'
import addrInfo from '@/components/addrInfo'
import goodsList from '@/components/goodsList'
import { getAction } from '@/utils/api'

export default {
  components: {
    cHeader,
    cFooter,
    addrInfo,
    goodsList
  },
  computed: {
    addrData () {
      return {
        cartNum: this.cartNum,
        cartType: 2,
        shopId: 0
      }
    }
  },
  data () {
    return {
      cartNum: 0,
      cid: 0,
      page: 1,
      list: [],
      total: 0
    }
  },

  methods: {
    getData () {
      getAction('/userapi/nearby/index/data', {
        cid: this.cid,
        recommend: 0,
        page: this.page,
        limit: 20
      }).then(res => {
        if (res.code === 0) {
          this.list = this.list.concat(res.data)
          this.total = res.count
        }
      })
    },
    getCart () {
      getAction('/userapi/shopping/card/count', {
        shop_id: 0,
        type: 2
      }).then(res => {
        if (res.code === 0) {
          this.cartNum = res.data.count
        }
      })
    },
    typeChange (e) {
      this.cid = e
      this.page = 1
      this.list = []
      this.getData()
    }
  },
  onReachBottom () {
    if (this.total > this.list.length) {
      this.page += 1
      this.getData()
    }
  },
  onShow () {
    this.$refs.top.hideCarts()
  },
  onLoad (options) {
    Object.assign(this.$data, this.$options.data())
    this.getData()
    this.getCart()
  }
}
</script>

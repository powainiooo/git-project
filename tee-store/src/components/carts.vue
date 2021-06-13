<style scoped>
.c-carts { padding-bottom: 150px; }
.c-carts .list { margin: 40px 30px; }
.c-carts .list .list-item { display: flex; align-items: center; margin-bottom: 60px; }
.c-carts .list .list-item .del { width: 60px; height: 60px; margin-right: 10px; }
.c-carts .list .list-item .del img { width: 30px; }
.c-carts .list .list-item .c-goods-item { flex: 1; }
.c-carts .list .list-item .c-goods-item .infos .intro { width: 320px; }
.c-carts .footer-btns { left: -25px; right: -25px; z-index: 1100 }
</style>

<template>
<div class="c-drawer" v-if="visible" style="z-index: 1500">
  <div class="c-drawer-cover" :class="{'c-drawer-cover-show': showItem}"></div>
  <div class="c-drawer-box c-carts" :class="{'c-drawer-show': showItem}">
    <div class="btn-circle c-drawer-close" @click="hide"><img src="/static/images/x2.png" /></div>
    <div class="c-drawer-title">
      <img src="/static/images/cart.png" mode="widthFix" class="w34 mr10" />
      <span>购物车</span>
    </div>
    <div class="list">
      <div class="list-item" v-for="item in list" :key="id">
        <div class="del center" @click="del(item.id)">
          <img src="/static/images/reduce.png" mode="widthFix" />
        </div>
        <div class="c-goods-item" @click="$emit('detail')">
          <div class="imgs"><img :src="imgSrc + item.cover" mode="aspectFill" /></div>
          <div class="infos">
            <h3 class="title">{{item.title}}</h3>
            <div class="intro" v-if="type === 1">{{item.attrs}}</div>
            <div class="intro" v-else>
              <span class="c-tag" v-for="(attr, i2) in item.attr_names" :key="i2">{{attr}}</span>
            </div>
            <div class="price"><span>{{item.price}}</span>元</div>
            <picker :range="nums" @change="numChange($event, item.id)">
              <div class="tagC nums">{{item.buy_nums}}</div>
            </picker>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-btns">
      <div class="l center">
        <div class="price"><span>{{price}}</span>元</div>
      </div>
      <div class="r">
        <button @click="confirm">确定</button>
      </div>
    </div>
  </div>
</div>
</template>

<script type='es6'>
import { getAction, postAction } from '../utils/api'

export default {
  name: 'app',
  data() {
    return {
      visible: false,
      showItem: false,
      imgSrc: mpvue.imgSrc,
      shopId: '',
      type: '',
      list: [],
      nums: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      price: 0
    }
  },
  methods: {
    show ({shopId, type}) {
      this.shopId = shopId
      this.type = type
      this.getData()
    },
    getData () {
      getAction('/userapi/shopping/card/index/data', {
        shop_id: this.shopId,
        type: this.type
      }).then(res => {
        if (res.code === 0) {
          let price = 0
          res.data.forEach(i => {
            i.attrs = i.attr_names.join('、')
            price += Number(i.price) * Number(i.buy_nums)
          })
          this.price = Number(price.toFixed(2))
          this.list = res.data
          this.visible = true
          this.$nextTick(() => {
            this.showItem = true
            if (res.data.length === 0) {
              this.hide()
            }
          })
        }
      })
    },
    hide () {
      console.log('onHide 3')
      this.showItem = false
      setTimeout(() => {
        this.visible = false
      }, 500)
    },
    animationend () {
      console.log('animationend')
      this.visible = false
    },
    del (id) {
      postAction('/userapi/shopping/card/destroy', {
        id
      }).then(res => {
        if (res.code === 0) {
          this.getData()
          this.$emit('refresh')
        }
      })
    },
    confirm () {
      if (this.type === 1) {
        mpvue.navigateTo({
          url: '/pages/order/confirm/main'
        })
      } else if (this.type === 2) {
        mpvue.navigateTo({
          url: '/pages/order/confirm2/main?type=cart'
        })
      }
    },
    numChange (e, id) {
      const nums = this.nums[e.mp.detail.value]
      postAction('/userapi/shopping/card/nums/add', {
        id,
        type: this.type,
        nums
      }).then(res => {
        if (res.code === 0) {
          this.getData()
        }
      })
    }
  }
}
</script>

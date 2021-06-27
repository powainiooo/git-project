<style scoped>
.c-details2 { max-height: 100vh; height: calc(100vh - 210px);  }
.c-details .cates { margin: 0 40px 35px 40px; }
.c-details .cates h3 { font-size: 24px; margin: 0 0 25px 12px; }
.c-details .cates ul { display: flex; flex-wrap: wrap; }
.c-details .cates ul li { min-width: 110px; margin: 0 15px 15px 0; text-align: center; }
.c-details .footer-btns { left: -25px; right: -25px; }
</style>

<template>
<div class="c-drawer" v-if="visible">
  <div class="c-drawer-cover" :class="{'c-drawer-cover-show': showItem}" @animationend="anEnd"></div>
  <div class="c-drawer-box c-details c-details2" :class="{'c-drawer-show': showItem}">
    <div class="btn-circle c-drawer-close" @click="hide"><img src="/static/images/x2.png" /></div>
    <div class="c-drawer-scroll">
      <div class="nearby-goods-detail">
<!--        <img :src="imgSrc + record.goods.cover" mode="aspectFill" class="bg" />-->
        <div class="bg">
          <banner :list="images" />
        </div>
        <div class="between">
          <div class="title">{{record.goods.title}}</div>
          <div class="prices">
            <p>{{record.goods.price}}元</p>
            <div class="acenter">
              <img src="/static/images/jfh.png" mode="widthFix" />
              <div><span>{{price}}</span>元</div>
            </div>
          </div>
        </div>
        <div class="flex mt30 ml35">
          <div class="c-tag" v-for="item in tags" :key="index">{{item}}</div>
        </div>
      </div>
      <div class="borderB mb40 mt20 ml35 mr35 hr"></div>

      <div class="cates" v-for="(cate, i1) in record.attrs" :key="id">
        <h3>{{cate.attr_name}}</h3>
        <ul>
          <li v-for="(child, i2) in cate.children"
              :key="id"
              class="btn "
              :class="{
              'btn-style1': child.id === cateIds['c'+cate.id],
              'btn-style2': child.id !== cateIds['c'+cate.id]
            }" @click="selectCate('c'+cate.id, child.id)">{{child.attr_name}}</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="footer-btns" v-if="visible && showItem">
    <div class="l center">
      <picker :range="nums" @change="numChange">
        <div class="nums"><span>{{num}}</span>杯</div>
        <img src="/static/images/arrow5.png" mode="widthFix" class="ar" />
      </picker>
    </div>
    <div class="r">
      <button @click="handleConfirm">确定</button>
    </div>
  </div>
</div>
</template>

<script type='es6'>
import banner from '@/components/banner'
export default {
  name: 'app',
  components: {
    banner
  },
  props: {
    record: Object
  },
  computed: {
    price () {
      let price = 0
      const ids = []
      const attrs = this.record.attrs || []
      for (const attr of attrs) {
        const id = this.cateIds[`c${attr.id}`]
        if (id) {
          ids.push(id)
        }
      }
      console.log('ids', ids)
      const id = `|${ids.join('|')}|`
      console.log('id', id)
      const sku = this.record.sku || []
      const item = sku.find(i => i.attr_ids === id)
      console.log('item', item)
      return item !== undefined ? price + item.price : price
    },
    images () {
      if (this.record.detail && this.record.detail.images) {
        return this.record.detail.images
      }
      return []
    }
  },
  data() {
    return {
      imgSrc: mpvue.imgSrc,
      visible: false,
      showItem: false,
      tags: [],
      cates: [],
      cateIds: {},
      nums: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      num: 1,
      isAjax: false
    }
  },
  methods: {
    show () {
      this.visible = true
      this.$nextTick(() => {
        setTimeout(() => {
          this.showItem = true
        }, 50)

        const ids = {}
        for (const i of this.record.attrs) {
          ids[`c${i.id}`] = i.children[0].id
        }
        this.cateIds = ids
        this.tags = this.record.detail.tags
      })
    },
    hide () {
      this.showItem = false
      setTimeout(() => {
        this.visible = false
      }, 500)
    },
    selectCate (key, id) {
      this.cateIds[key] = id
      console.log(this.cateIds)
    },
    numChange (e) {
      this.num = this.nums[e.mp.detail.value]
    },
    handleConfirm () {
      const ids = []
      for (const key in this.cateIds) {
        ids.push(this.cateIds[key])
      }
      const goods = {
        nearby_id: this.record.goods.id,
        buy_nums: this.num,
        attrs: ids
      }
      this.$emit('confirm', goods)
    }
  }
}
</script>

<style scoped>
.c-details { padding-bottom: 150px; }
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

.c-details .footer-btns { left: -25px; right: -25px; }
</style>

<template>
<div class="c-drawer" v-if="visible">
  <div class="c-drawer-cover" :class="{'c-drawer-cover-show': showItem}" @animationend="anEnd"></div>
  <div class="c-drawer-box c-details" :class="{'c-drawer-show': showItem}">
    <div class="btn-circle c-drawer-close" @click="hide"><img src="/static/images/x2.png" /></div>
    <div class="c-drawer-scroll">
      <img :src="imgSrc + goods.cover" mode="aspectFill" class="bg" />
      <div class="infos">
        <div class="between">
          <div class="name">{{goods.title}}</div>
          <div class="price"><span>{{goods.price}}</span>元</div>
        </div>
        <div class="intro">{{goods.content}}</div>
      </div>

      <div class="cates" v-for="(cate, i1) in cates" :key="id">
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


    <div class="footer-btns">
      <div class="l center">
        <picker :range="nums" @change="numChange">
          <div class="nums"><span>{{num}}</span>杯</div>
          <img src="/static/images/arrow5.png" mode="widthFix" class="ar" />
        </picker>
      </div>
      <div class="r">
        <button @click="addCart">确定</button>
      </div>
    </div>
  </div>
</div>
</template>

<script type='es6'>
import { getAction } from '@/utils/api'

export default {
	name: 'app',
	data() {
		return {
		  imgSrc: mpvue.imgSrc,
		  visible: false,
      showItem: false,
      goods: {},
      cates: [],
      cateIds: {},
      nums: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      num: 1,
      isAjax: false
    }
	},
	methods: {
	  show (data) {
	    getAction('/userapi/goods/show', {
	      id: data.id
      }).then(res => {
        if (res.code === 0) {
          this.goods = res.data.goods
          this.cates = res.data.attrs

          const ids = {}
          for (const i of res.data.attrs) {
            ids[`c${i.id}`] = i.children[0].id
          }
          this.cateIds = ids

          this.visible = true
          this.$nextTick(() => {
            this.showItem = true
          })
        }
      })
    },
    hide () {
	    this.showItem = false
	    this.isAjax = false
      setTimeout(() => {
        this.visible = false
      }, 500)
    },
    selectCate (key, id) {
	    this.cateIds[key] = id
    },
    numChange (e) {
	    console.log('numChange', e)
      this.num = this.nums[e.mp.detail.value]
    },
    addCart () {
	    const ids = []
      for (const key in this.cateIds) {
        ids.push(this.cateIds[key])
      }
	    const goods = {
        goods_id: this.goods.id,
        buy_nums: this.num,
        attrs: ids
      }
      this.$emit('confirm', goods)
    }
  }
}
</script>

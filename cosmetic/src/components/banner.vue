<style>
.c-banner { width: 100%; height: 600px;}
.c-banner-img { width: 100%; height: 100%;}
.c-banner-dots { width: 100%; display: flex; justify-content: center; position: absolute; bottom: 20px; left: 0;}
.c-banner-dots li { width: 26px; height: 3px; background-color: rgba(255, 255, 255, .2); margin: 0 5px;}
.c-banner-dots li.active { background-color: rgba(255, 255, 255, 1);}
</style>

<template>
<div style="position: relative;">
   <swiper class="c-banner" autoplay @change="bannerChange" :style="{'height': swiperHeight}">
      <swiper-item v-for="(item, index) in list" :key="index" @click="toDetail(item.link)">
         <img :src="imgSrc + item.img" :id="imgKey+index" class="c-banner-img" mode="widthFix" @load="imgLoad($event, index)"/>
      </swiper-item>
   </swiper>
   <ul class="c-banner-dots">
      <li v-for="(item, index) in list" :key="index" :class="{active: index === activeIndex}"></li>
   </ul>
</div>

</template>

<script type='es6'>
import store from '../store'
export default {
	name: 'app',
   props: {
	   list: Array,
      autoHeight: {
	      type: Boolean,
         default: false
      }
   },
	data() {
		return {
		   activeIndex: 0,
         swiperHeight: 0,
         heightArr: [],
         imgKey: 'img'
      }
	},
   computed: {
      imgSrc () {
         return store.state.imgSrc
      }
   },
   mounted () {
      this.imgKey = `img${this._uid}-`
   },
	methods: {
      bannerChange (e) {
         this.activeIndex = e.mp.detail.current
         if (this.autoHeight) {
            this.swiperHeight = this.heightArr[this.activeIndex] + 'px'
         }
      },
      imgLoad (e, index) {
         const query = mpvue.createSelectorQuery()
         const imgList = query.select(`#${this.imgKey}${index}`).boundingClientRect()
         imgList.exec(res => {
            this.heightArr[index] = res[0].height
            if (index === 0) {
               this.swiperHeight = res[0].height + 'px'
            }

         })
      },
      toDetail (id) {
         if (id === '') return
         mpvue.navigateTo({
            url: `/pages/goodsDetail/main?id=${id}`
         })
      }
   }
}
</script>

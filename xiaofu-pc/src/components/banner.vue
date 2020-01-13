<style lang="stylus" type="text/stylus">
   .banner-container
      min-width 1090px
      width 100%
      height 365px
      position relative
      background-position center center
      background-repeat no-repeat
      background-size cover
      background-image: url("../assets/images/banner.jpg")
      .z-btn
         width 280px
         position absolute
         top 160px
         right 160px
      .opera
         width 1090px
         position absolute
         bottom -20px
         left 50%
         margin-left -545px
      .z-select
         .ivu-select-selection
            height 40px
            border-radius 20px
            border none
            .ivu-select-placeholder,.ivu-select-selected-value
               height 40px
               line-height 40px
               padding-left 20px
</style>

<template>
<div class="banner-container" :style="styles">
   <t-button class="z-btn" @dotap="gotoDetail" extraClass="white">了解详情</t-button>
   <div class="opera" v-if="showCity">
      <div class="z-select" v-if="showCitySelect">
         <Select v-model="city" style="width:200px" class="z-select" @on-change="cityChange" placeholder="选择城市" :capture="false">
            <Option :value="0">全部</Option>
            <Option v-for="item in citys" :value="item.id" :key="item.id">{{ item.name }}</Option>
         </Select>
      </div>
   </div>
</div>
</template>

<script type='es6'>
import TButton from './TButton.vue'
import { bannerVisit } from '@/api.js'
export default {
	name: 'app',
   components: { TButton },
	data() {
		return {
         city: ''
      }
	},
   props: {
	   showCity: {
	      type: Boolean,
         default: false
      },
	   id: {
	      type: [String, Number],
         default: ''
      },
      citys: {
	      type: Array,
         default: () => []
      },
      img: {
	      type: String,
         default: ''
      },
      type: {
	      type: String,
         default: '1'
      }
   },
   computed: {
      imgSrc () {
         return this.$store.state.imgSrc
      },
      showCitySelect () {
         return this.$store.state.showCitySelect
      },
      styles () {
         return {
            'background-image' : `url('${this.imgSrc + this.img}')`
         }
      }
   },
	methods: {
	   gotoDetail () {
         bannerVisit(this.type, this.id).then(res => {
            console.log(res)
         })
	      this.$emit('linkTo', this.id)
      },
      cityChange (e) {
	      if (e !== undefined) {
            this.$emit('getcity', e)
         }
      },
      resetCity () {
	      this.city = ''
      }
   }
}
</script>

<style lang="stylus" type="text/stylus">
   .z-btn
      width 270px
      height 40px
      display flex
      justify-content center
      align-items center
      background-color #ffffff
      border-radius 20px
      box-shadow 0 2px 3px rgba(0, 0, 0, 0.2)
      color #000000
      font-weight bold
   .z-select
      width 200px
      .vs__dropdown-toggle
         height 40px
         border-radius 20px
         box-shadow 0 2px 3px rgba(0, 0, 0, 0.2)
         padding 0 10px
         outline none
         border none
         background-color #ffffff
   .banner-container
      min-width 1090px
      width 100%
      height 365px
      position relative
      background-position center center
      background-repeat no-repeat
      background-image: url("../assets/images/banner.jpg")
      .z-btn
         position absolute
         top 160px
         right 160px
      .opera
         width 1090px
         position absolute
         bottom -20px
         left 50%
         margin-left -545px
</style>

<template>
<div class="banner-container" :style="styles">
   <a href="javascript:;" class="z-btn" @click="gotoDetail">了解详情</a>
   <div class="opera" v-if="showCity">
      <div class="z-select">
         <v-select label="name" :options="citys" placeholder="选择城市" @input="cityChange"></v-select>
      </div>
   </div>
</div>
</template>

<script type='es6'>
import vSelect from 'vue-select'
export default {
	name: 'app',
   components: {vSelect},
	data() {
		return {}
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
      }
   },
   computed: {
      imgSrc () {
         return this.$store.state.imgSrc
      },
      styles () {
         return {
            'background-image' : `url('${this.imgSrc + this.img}')`
         }
      }
   },
	methods: {
	   gotoDetail () {
	      this.$emit('linkTo', this.id)
      },
      cityChange (e) {
	      this.$emit('getcity', e.id)
      }
   }
}
</script>

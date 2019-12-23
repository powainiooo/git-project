<style scoped>
.z-page1 { width: 100%; height: 100vh; position: absolute; top: 0; left: 0; overflow: hidden;}
.z-page1 .data-content { position: absolute; top: 250px; left: 120px; z-index: 10;}
.z-page1 .earth { width: 100vw; height: 100vw; position: absolute; left: 0; bottom: 0;}
.z-page1 .earth img { width: 1100px; height: 1100px; display: block; margin-top: 54px; margin-left: -175px; animation: roll 30s linear infinite;}
.z-page1 .fadeIn { animation: fadeIn 0.5s linear;}
.z-page1 .fadeOut { animation: fadeOut 0.5s linear;}
.z-page1 .slideUpIn { animation: slideUpIn 0.5s cubic-bezier(.32,.6,.62,1.22) 0.5s both;}
.z-page1 .tag-content { width: 500px; left: 125px; bottom: 220px;  text-align: center; color: #ffffff;}
.z-page1 .tag-content span { color: #ffea00;}
.z-page1 .scaleIn { animation: scaleIn 0.5s cubic-bezier(.34,.66,.62,1.18) 1s both;}
</style>

<template>
<div class="z-page1" :style="{'z-index':showParts ? 10 : 5}">
   <transition enter-active-class="slideUpIn" leave-active-class="fadeOut" @after-enter="enter">
   <div class="data-content" v-if="showParts">
      <p>过去一年</p>
      <p>你行驶了<span class="value">{{total_mile}}</span>公里</p>
      <div v-if="type === 'gasoline'">
         <p>全年总油耗<span class="value">{{total_fuel}}</span>升</p>
         <p>百公里能耗排名超过全国<span class="value">{{fuel100_over_per}}</span>% 的车主</p>
      </div>
      <div v-if="type === 'DM'">
         <p>纯电里程<span class="value">{{total_evmile}}</span>公里</p>
         <p>全年总能耗<span class="value">{{total_elect}}</span>度+<span class="value">{{total_fuel}}</span>升</p>
         <p>相比用油，一年节省<span class="value">{{save_money}}</span>元</p>
      </div>
      <div v-if="type === 'EV'">
         <p>全年总电耗<span class="value">{{total_elect}}</span>度</p>
         <p>相比燃油车一年节省<span class="value">{{save_money}}</span>元</p>
      </div>
   </div>
   </transition>
   <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
      <div class="earth" v-if="showParts"><img src="static/earth.png"/></div>
   </transition>
   <transition enter-active-class="scaleIn" leave-active-class="fadeOut">
      <div class="tag-content" v-if="showParts" v-html="tagContent"></div>
   </transition>

</div>
</template>

<script type='es6'>
import TweenLite from 'gsap'
export default {
	name: 'app',
	data() {
		return {
		   outTime: 300,
         oilPrecent: 20,
         total_mile: 0,
         total_mile_over_per: 0,
         total_evmile: 0,
         total_fuel: 0,
         total_elect: 0,
         fuel100: 0,
         fuel100_over_per: 0,
         elect100: 0,
         save_money: 0,
         save_co2: 0,
         save_meat: 0,
         numsInterval: 1
      }
	},
   computed: {
      currentPage () {
         return this.$store.state.currentPage
      },
      showParts () {
         return this.currentPage === 'p1'
      },
      type () {
         return 'EV'
      },
      tagContent () {
         if (this.type === 'gasoline') {
            if (this.fuel100_over_per >= 70) {
               return '恭喜你！获得<br/>“2019感动比亚迪<br/><span style="color: #ffea00;">年度环保卫士</span>“称号'
            } else if (this.fuel100_over_per >= 30 && this.fuel100_over_per < 70) {
               return '沉稳开车<br/>油耗随缘'
            } else {
               return '别的咱不说<br/><span style="color: #ffea00;">踩油门</span><br/>咱一定是专业的'
            }
         } else if (this.type === 'DM') {
            return `省下的钱可以<br/>买${this.save_meat}斤猪肉<br/><span style="color: #ffea00;">恩，真香！</span>`
         } else if (this.type === 'EV') {
            return '节能省钱<br/>又环保<br/><span style="color: #ffea00;">从此不再关注油价</span>'
         }
      }
   },
   watch: {
      currentPage (page, lastPage) {
         if (lastPage === 'p1') {
            this.reset()
         }
      }
   },
	methods: {
	   reset () {
	      this.total_mile = 0
	      this.total_mile_over_per = 0
	      this.total_evmile = 0
	      this.total_fuel = 0
	      this.total_elect = 0
	      this.fuel100 = 0
	      this.fuel100_over_per = 0
	      this.elect100 = 0
	      this.save_money = 0
	      this.save_co2 = 0
	      this.save_meat = 0
      },
      enter () {
         // this.totalMiles = 1000
         TweenLite.to(
            this.$data,
            this.numsInterval,
            {
               total_mile: 20,
               total_mile_over_per: 20,
               total_evmile: 20,
               total_fuel: 20,
               total_elect: 20,
               fuel100: 20,
               fuel100_over_per: 20,
               elect100: 20,
               save_money: 20,
               save_co2: 20,
               save_meat: 20,
            }
         )
      }
   }
}
</script>

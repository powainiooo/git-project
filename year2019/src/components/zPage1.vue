<style scoped>
.z-page1 { width: 100%; position: fixed; top: 0; left: 0; bottom: 0; overflow: hidden;}
.z-page1 .data-content { position: absolute; top: 250px; left: 120px; z-index: 10;}
.z-page1 .earth { width: 1100px; height: 1100px; position: absolute; left: -175px; bottom: -400px; display: flex; justify-content: center; align-items: center;}
.z-page1 .earth img { width: 100%; height: 100%;}
/* animation: roll 120s linear infinite;*/
@keyframes roll {
   0% { transform: rotateZ(1440deg);}
   100% { transform: rotateZ(0deg);}
}
.z-page1 .fadeIn { animation: fadeIn 0.5s linear;}
.z-page1 .fadeOut { animation: fadeOut 0.5s linear;}
.z-page1 .slideUpIn { animation: slideUpIn 0.5s cubic-bezier(.32,.6,.62,1.22) 0.5s both;}
.z-page1 .tag-content { width: 500px; left: 125px; bottom: 220px;  text-align: center; color: #ffffff;}
.z-page1 .tag-content span { color: #ffea00;}
.z-page1 .scaleIn { animation: scaleIn 0.5s cubic-bezier(.34,.66,.62,1.18) 1s both;}
</style>

<template>
<div class="z-page1" :style="{'z-index':showParts ? 10 : 5}">
   <transition enter-active-class="fadeIn" leave-active-class="fadeOut">
      <div class="earth" v-if="showParts" :style="earth"><img :src="imgSrc+'static/earth.png'"/></div>
   </transition>
   <transition enter-active-class="slideUpIn" leave-active-class="fadeOut" @after-enter="enter">
   <div class="data-content" v-if="showParts">
      <p>过去一年</p>
      <p>你行驶了<span class="value">{{total_mile.toFixed(0)}}</span>公里</p>
      <div v-if="type === 'gasoline'">
         <p>全年总油耗<span class="value">{{total_fuel.toFixed(0)}}</span>升</p>
         <p>百公里能耗排名超过全国<span class="value">{{rank.toFixed(0)}}</span>% 的车主</p>
      </div>
      <div v-if="type === 'DM'">
         <p v-if="showEvMileage">纯电里程<span class="value">{{total_evmile.toFixed(0)}}</span>公里</p>
         <div v-html="energyHtml"></div>
         <p v-if="showMoney">纯电里程相比用油，一年节省<span class="value">{{save_money.toFixed(0)}}</span>元</p>
      </div>
      <div v-if="type === 'EV'">
         <p v-if="showElect">全年总电耗<span class="value">{{total_elect.toFixed(0)}}</span>度</p>
         <p v-if="showMoney">相比燃油车一年节省<span class="value">{{save_money.toFixed(0)}}</span>元</p>
      </div>
   </div>
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
   data () {
      return {
		   outTime: 300,
         oilPrecent: 20,
         total_mile: 0,
         total_evmile: 0,
         total_fuel: 0,
         total_elect: 0,
         rank: 0,
         save_money: 0,
         save_co2: 0,
         save_meat: 0,
         numsInterval: 1,
         rotate: 1440
      }
   },
   computed: {
      imgSrc () {
         return this.$store.state.imgSrc
      },
      currentPage () {
         return this.$store.state.currentPage
      },
      showParts () {
         return this.currentPage === 'p1'
      },
      type () {
         return this.$store.state.powerMode
      },
      tagContent () {
         if (this.type === 'gasoline') {
            if (this.pageData.fPlacing >= 70) {
               return `恭喜你！获得<br/>“2019感动比亚迪<br/><span style="color: #ffea00;">年度环保卫士</span>“称号`
            } else if (this.pageData.fPlacing >= 30 && this.pageData.fPlacing < 70) {
               return '沉稳开车<br/>油耗随缘'
            } else {
               return '别的咱不说<br/><span style="color: #ffea00;">踩油门</span><br/>咱一定是专业的'
            }
         } else if (this.type === 'DM') {
            if (this.pokeMeat === '--') {
               return ''
            } else {
               return `省下的钱可以<br/>买${this.pokeMeat.toFixed(1)}斤猪肉<br/><span style="color: #ffea00;">嗯，真香！</span>`
            }
         } else if (this.type === 'EV') {
            return '节能省钱<br/>又环保<br/><span style="color: #ffea00;">从此不再关注油价</span>'
         }
      },
      pageData () {
         return this.$store.state.pageData.P1
      },
      showEvMileage () {
         return this.pageData.evMileage !== undefined
      },
      showElect () {
         return this.pageData.eConsumption !== undefined
      },
      energyHtml () {
         const fuel = this.pageData.fConsumption
         const elect = this.pageData.eConsumption
         if (fuel === undefined && elect === undefined) {
            return ''
         } else if (fuel === undefined && elect !== undefined) {
            return `全年总能耗<span class="value">${this.total_elect.toFixed(1)}</span>度`
         } else if (fuel !== undefined && elect === undefined) {
            return `全年总能耗<span class="value">${this.total_fuel.toFixed(1)}</span>升`
         } else if (fuel !== undefined && elect !== undefined) {
            return `全年总能耗<span class="value">${this.total_elect.toFixed(1)}</span>度+<span class="value">${this.total_fuel.toFixed(1)}</span>升`
         }
      },
      saveMoney () {
         if (this.pageData.eConsumption === undefined) {
            return '--'
         } else {
            return this.pageData.eConsumption / 2.5 * 6.74 - this.pageData.eConsumption * 0.68
         }
      },
      showMoney () {
         if (this.type === 'DM') {
            return typeof this.saveMoney === 'number'
         }
      },
      pokeMeat () {
         return this.saveMoney === '--' ? '--' : this.saveMoney / 30
      },
      earth () {
         return {
            'transform': `rotate(${this.rotate}deg)`
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
   mounted () {
	   setInterval(() => {
	      this.rotate -= 0.3
         if (this.rotate < 0) this.rotate += 1440
      }, 16)
   },
   methods: {
	   reset () {
	      this.total_mile = 0
	      this.total_evmile = 0
	      this.total_fuel = 0
	      this.total_elect = 0
	      this.rank = 0
	      this.save_money = 0
	      this.save_meat = 0
      },
      enter () {
         // this.totalMiles = 1000
         TweenLite.to(
            this.$data,
            this.numsInterval,
            {
               total_mile: this.pageData.mileage,
               total_evmile: this.pageData.evMileage,
               total_fuel: this.pageData.fConsumption,
               total_elect: this.pageData.eConsumption,
               rank: this.pageData.fPlacing,
               save_money: this.saveMoney
            }
         )
         this.$store.commit('setCanChangePage', true)
      }
   }
}
</script>

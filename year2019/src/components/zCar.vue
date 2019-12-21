<style scoped>
.z-car { width: 400px; height: 160px; transform-origin: 0 50%; transform: scale(0.55); position: absolute; left: 260px; bottom: 40px; z-index: 100; transition: all 1.1s linear;}
.z-car-p1 { transition-duration: 2s}
.z-car-p2 { transform: scale(1); bottom: 86px;}
.z-car-loading { transform: scale(0.3); bottom: 0; transition-duration: 0.1s;}
.z-car>img.car { width: 100%; height: 100%;}
.z-car>img.wheel { width: 68px; height: 68px; position: absolute; bottom: 10px;}
.z-car>img.wheel1 { left: 54px;}
.z-car>img.wheel2 { left: 281px;}
.z-car .pecent { color: rgb(0, 196, 220); font-size: 90px; position: absolute; left: 60px; bottom: 170px;}

.z-car-1 { transform: scale(1); width: 224px; height: 91px;}
.z-car-1>img.wheel { width: 36px; height: 36px; bottom: -10px;}
.z-car-1>img.wheel1 { left: 15px}
.z-car-1>img.wheel2 { left: 160px}

.z-car-2 { transform: scale(1); width: 178px; height: 88px;}
.z-car-2>img.wheel { width: 36px; height: 36px; bottom: -14px;}
.z-car-2>img.wheel1 { left: 8px}
.z-car-2>img.wheel2 { left: 132px}

.z-car-3 { transform: scale(1); width: 178px; height: 88px;}
.z-car-3>img.wheel { width: 36px; height: 36px; bottom: -14px;}
.z-car-3>img.wheel1 { left: 8px}
.z-car-3>img.wheel2 { left: 132px}

.z-car-4 { transform: scale(1); width: 157px; height: 103px;}
.z-car-4>img.wheel { width: 36px; height: 36px; bottom: -12px;}
.z-car-4>img.wheel1 { left: 10px}
.z-car-4>img.wheel2 { left: 112px}

.z-car-5 { transform: scale(1); width: 157px; height: 103px;}
.z-car-5>img.wheel { width: 36px; height: 36px; bottom: -12px;}
.z-car-5>img.wheel1 { left: 10px}
.z-car-5>img.wheel2 { left: 112px}


.z-car-pos-1 { left: 360px; bottom: 110px; z-index: 90;}
.z-car-pos-2 { left: 590px; bottom: 120px; z-index: 90;}
.z-car-pos-3 { left: 660px; bottom: 90px; z-index: 90;}
.z-car-pos-4 { left: 490px; bottom: 90px; z-index: 90;}
.z-car-pos-5 { left: 70px; bottom: 90px; z-index: 90;}
.z-car-pos-6 { left: 170px; bottom: 120px; z-index: 80;}
.z-car-pos-7 { left: 30px; bottom: 30px; z-index: 100;}
.z-car-pos-8 { left: 240px; bottom: 30px; z-index: 100;}
.z-car-pos-9 { left: 540px; bottom: 30px; z-index: 100;}
</style>

<template>
<div v-if="currentPage !== 'share'">
   <div class="z-car" :class="roadsExtraClass" :style="styles" v-if="type === '0'">
      <span class="pecent" v-if="currentPage === 'loading'">{{loadingPecent}}%</span>
      <img src="@/assets/img/car.png" class="car"/>
      <img src="@/assets/img/wheel.png" class="wheel wheel1" :style="wheelMove"/>
      <img src="@/assets/img/wheel.png" class="wheel wheel2" :style="wheelMove"/>
   </div>
   <div class="z-car" :class="['z-car-'+type, 'z-car-pos-'+pos]" v-else-if="type === '1'">
      <img src="@/assets/img/cars/car1.png" class="car"/>
      <img src="@/assets/img/cars/wheel1.png" class="wheel wheel1" :style="wheelMove"/>
      <img src="@/assets/img/cars/wheel1.png" class="wheel wheel2" :style="wheelMove"/>
   </div>
   <div class="z-car" :class="['z-car-'+type, 'z-car-pos-'+pos]" v-else-if="type === '2'">
      <img src="@/assets/img/cars/car2.png" class="car"/>
      <img src="@/assets/img/cars/wheel1.png" class="wheel wheel1" :style="wheelMove"/>
      <img src="@/assets/img/cars/wheel1.png" class="wheel wheel2" :style="wheelMove"/>
   </div>
   <div class="z-car" :class="['z-car-'+type, 'z-car-pos-'+pos]" v-else-if="type === '3'">
      <img src="@/assets/img/cars/car3.png" class="car"/>
      <img src="@/assets/img/cars/wheel1.png" class="wheel wheel1" :style="wheelMove"/>
      <img src="@/assets/img/cars/wheel1.png" class="wheel wheel2" :style="wheelMove"/>
   </div>
   <div class="z-car" :class="['z-car-'+type, 'z-car-pos-'+pos]" v-else-if="type === '4'">
      <img src="@/assets/img/cars/car4.png" class="car"/>
      <img src="@/assets/img/cars/wheel2.png" class="wheel wheel1" :style="wheelMove"/>
      <img src="@/assets/img/cars/wheel2.png" class="wheel wheel2" :style="wheelMove"/>
   </div>
   <div class="z-car" :class="['z-car-'+type, 'z-car-pos-'+pos]" v-else-if="type === '5'">
      <img src="@/assets/img/cars/car5.png" class="car"/>
      <img src="@/assets/img/cars/wheel2.png" class="wheel wheel1" :style="wheelMove"/>
      <img src="@/assets/img/cars/wheel2.png" class="wheel wheel2" :style="wheelMove"/>
   </div>
</div>

</template>

<script type='es6'>
export default {
	name: 'app',
   props: {
      status: {
         type: String,
         default: 'move'
      },
      type: {
         type: String,
         default: '0'
      },
      pos: {
         type: String,
         default: '1'
      },
   },
	data() {
		return {
		   rotate: 0,
         g: 0.1,
         maxSpeed: 8,
         speed: 8,
         t: 0,
      }
	},
   computed: {
      loadingPecent () {
         return this.$store.state.loadingPecent
      },
      styles () {
         if (this.currentPage === 'loading') {
            return {
               left: `${this.loadingPecent / 100 * 80}%`
            }
         } else {
            return {}
         }
      },
      currentPage () {
         return this.$store.state.currentPage
      },
      roadsExtraClass () {
         return `z-car-${this.currentPage}`
      },
      wheelMove () {
         return {
            'transform': `rotateZ(${this.rotate}deg)`,
            '-webkit-transform': `rotateZ(${this.rotate}deg)`,
         }
      }
   },
   mounted () {
      this.t = setInterval(this.move, 16)
   },
	methods: {
      move () {
         if (this.status === 'move') {
            this.speed += this.g
            if (this.speed >= this.maxSpeed) this.speed = this.maxSpeed
         } else if (this.status === 'stop') {
            this.speed -= this.g
            if (this.speed <= 0) this.speed = 0
         }
         this.rotate += this.speed
         if (this.rotate >= 3600) {
            this.rotate -= 3600
         }
      }
   }
}
</script>

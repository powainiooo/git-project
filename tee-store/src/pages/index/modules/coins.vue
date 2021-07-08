<style>
.coin { width: 50px; height: 200px; position: absolute; left: 210px; bottom: 86%; overflow: hidden; }
.coin img { width: 100%; opacity: 0;  }
.coin-move { animation: coin 1.5s cubic-bezier(.3,.49,.25,1.07) .5s both; }
@keyframes coin {
  0% { transform: translateY(50px); opacity: 0; }
  20% { transform: translateY(0px); opacity: 1; }
  100% { transform: translateY(220px); opacity: 1; }
}
</style>

<template>
<div class="swiper-sec">
  <div class="icons">
    <div class="pig"
         :class="{'icon-move': moving}"
         hover-class="hscale"
         hover-stay-time="10"
         @click="toPage('/pages/personal/points/main')"
         @animationend="moveEnd">
      <img src="/static/images/index/pig.png"
           mode="heightFix"
           class="img" />
      <div class="coin">
        <img src="/static/images/icon1.png"
             mode="widthFix"
             :class="{'coin-move': coinMove}"
             @animationend="coinEnd" />
      </div>
    </div>
  </div>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  props: {
    nums: [Number, String]
  },
  data () {
    return {
      moving: false,
      coinMove: false
    }
  },
  methods: {
    toPage: mpvue.toPage,
    shake () {
      this.moving = true
    },
    moveEnd () {
      // this.moving = false
    },
    drop () {
      this.moving = false
      this.coinMove = true
    },
    coinEnd () {
      this.coinMove = false
      this.shake()
    }
  }
}
</script>

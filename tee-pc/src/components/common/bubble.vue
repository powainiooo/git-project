<style scoped>
.c-bubble { width: 100%; height: 100vh; position: fixed; top: 0; left: 0; z-index: 0; overflow: hidden; }
.c-bubble>img { position: absolute; }
.c-bubble .b1 { width: 3.9vw; top: 16.7vh; left: 88.5%; animation: bubble 2s ease infinite alternate; }
.c-bubble .b2 { width: 30.9vw; top: -40.4vh; left: -40px; animation: bubble2 8s ease infinite alternate; }
.c-bubble .b3 { width: 10.8vw; top: -3.5vh; left: 0; animation: bubble 5s ease infinite alternate; }
.c-bubble .b4 { width: 9.2vw; top: 81.76vh; left: 85.7%; animation: bubble 4s ease infinite alternate; }
.c-bubble .b5 { width: 20.5vw; top: 33.33vh; left: 22.19%; animation: bubble 7s ease infinite alternate; }
.c-bubble .b6 { width: 20.5vw; top: 70vh; left: 64.69%; animation: bubble2 7s ease infinite alternate; }
@keyframes bubble {
  0% { transform: translateY(100%); }
  100% { transform: translateY(0); }
}
@keyframes bubble2 {
  0% { transform: translateY(0); }
  100% { transform: translateY(20%); }
}
</style>

<template>
<div class="c-bubble">
  <img src="@/assets/img/bubbles/bubble1.png" class="b1" />
  <img src="@/assets/img/bubbles/bubble2.png" class="b2" />
  <img src="@/assets/img/bubbles/bubble3.png" class="b3" />
  <img src="@/assets/img/bubbles/bubble6.png" class="b6" />
  <img src="@/assets/img/bubbles/bubble4.png" class="b4" />
  <img src="@/assets/img/bubbles/bubble5.png" class="b5" />
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  data () {
    return {}
  },
  methods: {}
}
</script>

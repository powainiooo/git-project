<style scoped>
.c-bubble { width: 100%; height: 100vh; position: fixed; top: 0; left: 0; z-index: 0; overflow: hidden; }
.c-bubble>img { position: fixed; z-index: 2; }
.c-bubble .b1 { width: 164px; top: 32px; left: 608px; animation: bubble 5s ease infinite alternate; }
.c-bubble .b2 { width: 48px; top: 73vh; left: 588px; animation: bubble 2s ease infinite alternate; }
.c-bubble .b3 { width: 184px; top: 22vh; left: 75px; animation: bubble 7s ease infinite alternate; }
.c-bubble .b4 { width: 368px; top: 60vh; left: -84px; animation: bubble2 9s ease infinite alternate; }
.c-bubble .b5 { width: 164px; top: 80vh; left: 34px; animation: bubble 4s ease infinite alternate; }
.c-bubble .b6 { width: 370px; top: 0; left: 650px; animation: bubble2 11s ease infinite alternate; }
@keyframes bubble {
  0% { transform: translateY(0); }
  100% { transform: translateY(100%); }
}
@keyframes bubble2 {
  0% { transform: translateY(0); }
  100% { transform: translateY(60%); }
}
</style>

<template>
<div class="c-bubble">
  <img src="/static/images/bubble/bubble6.png" mode="widthFix" class="b6" />
  <img src="/static/images/bubble/bubble1.png" mode="widthFix" class="b1" />
  <img src="/static/images/bubble/bubble2.png" mode="widthFix" class="b2" />
  <img src="/static/images/bubble/bubble3.png" mode="widthFix" class="b3" />
  <img src="/static/images/bubble/bubble4.png" mode="widthFix" class="b4" />
  <img src="/static/images/bubble/bubble5.png" mode="widthFix" class="b5" />
</div>
</template>

<script type='es6'>
export default {
	name: 'app',
	data() {
		return {}
	},
	methods: {}
}
</script>

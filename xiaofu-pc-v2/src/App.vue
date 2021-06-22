<style>
.bt-img { width: 25.6%; position: absolute; bottom: 0; right: 0; z-index: 10; }
.content { position: fixed; top: 50%; right: 43%; transform: translateY(-50%); }
.content p { font-size: 0; margin-bottom: 8px; text-align: right; position: relative; }
.content p .active { position: absolute; top: 0; right: 0; opacity: 0; transition: all 1s ease-out; }
.content p.current .active { opacity: 1; }

.left-area { position: fixed; left: 30px; bottom: 12px; z-index: 10; }
.left-area div { width: 200px; text-align: center; font-size: 14px; color: #ffffff; line-height: 14px; margin-bottom: 15px; }
.left-area a { width: 200px; height: 40px; display: flex; justify-content: center; align-items: center; font-size: 0; background: linear-gradient(159deg, #0027AF 0%, #2154DA 53%, #003AC3 100%); box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.15); margin-bottom: 46px; border-radius: 10px; transition: all .2s ease-in-out; }
.left-area a:hover { background: linear-gradient(349deg, #A5C0F7 0%, #A5C0F7 100%) }
.left-area a:active { transform: scale(.95); }
.left-area p { font-size: 12px; color: #ffffff; }

.arrow { width: 15%; position: absolute; bottom: 30%; right: 25% }
</style>

<template>
  <div id="app">
    <bg-slide />
    <!-- 左下角图片 -->
    <img src="@/assets/img/img1.png" class="bt-img" />
    <img src="@/assets/img/img2.png" class="bt-img" />

    <!-- 中间文案 -->
    <div class="content">
      <p :class="{'current': current === 0}">
        <img src="@/assets/img/c1.png" width="231" />
        <img src="@/assets/img/c1-a.png" width="231" class="active" />
      </p>
      <p :class="{'current': current === 1}">
        <img src="@/assets/img/c2.png" width="485" />
        <img src="@/assets/img/c2-a.png" width="485" class="active" />
      </p>
      <p :class="{'current': current === 2}">
        <img src="@/assets/img/c3.png" width="273" />
        <img src="@/assets/img/c3-a.png" width="273" class="active" />
      </p>
    </div>

    <!-- 箭头 -->
    <img src="@/assets/img/arrow.png" class="arrow" />

    <!-- 左下角 -->
    <div class="left-area">
      <div>想在小夫有票發布活動？</div>
      <a href="https://editor.leesticket.com"><img src="@/assets/img/logo.png" width="110" /></a>
      <p>Copyright ©right; 2018HO.AllRights reserved.粤ICP備16121686号-1</p>
    </div>
  </div>
</template>

<script>
import bgSlide from '@/components/bgSilde'
export default {
  name: 'App',
  components: {
    bgSlide
  },
  data () {
    return {
      current: 0
    }
  },
  mounted () {
    setInterval(() => {
      if (this.current === 2) {
        this.current = 0
      } else {
        this.current += 1
      }
    }, 2000)
  }
}
</script>

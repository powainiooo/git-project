<style scoped>
.c-banner { width: 100%; height: 334px; border-radius: 70px 70px 0 0; overflow: hidden; }
.c-banner img { width: 100%; height: 334px; border-radius: 70px 70px 0 0; }
</style>

<template>
<swiper class="c-banner"
        :indicator-dots="list.length > 1"
        indicator-color="#EADED0"
        indicator-active-color="#41372D">
  <swiper-item v-for="item in list" :key="index">
    <img :src="imgSrc + item" mode="aspectFill" />
  </swiper-item>
</swiper>
</template>

<script type='es6'>
export default {
  name: 'app',
  props: {
    list: Array
  },
  data () {
    return {
      imgSrc: mpvue.imgSrc
    }
  },
  methods: {}
}
</script>

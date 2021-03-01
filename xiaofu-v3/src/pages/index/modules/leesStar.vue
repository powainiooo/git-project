<style scoped>
.c-lees-star {
  width: 100%;
  height: 267px;
  background: linear-gradient(152deg, #003AC3 0%, #2154DA 48%, #0027AF 100%);
  box-shadow: 0px 10px 15px 0px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.c-lees-star img {
  width: 141px;
  height: 197px;
}
</style>

<template>
<a href="/pages/leesStar/main"
   class="c-lees-star"
   hover-class="hscale"
   hover-stay-time="10">
  <img src="/static/images/common/lees-star.png" />
</a>
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

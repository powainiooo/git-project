<style scoped>
.c-tk-info { display: flex; align-items: center; }
.c-tk-date {
  width: 56px;
  height: 56px;
  background: linear-gradient(330deg, #5B85E6 0%, #6D9AF4 100%);
  border-radius: 7px;
  position: relative;
  font-size: 20px;
  font-family: HelveL;
  color: #ffffff;
  line-height: 28px;
  text-align: center;
  margin-right: 20px;
}
.c-tk-date-large {
  width: 66px;
  height: 66px;
  font-size: 24px;
  line-height: 33px;
}
.c-tk-date:after { content: ''; height: 2px; background-color: #ffffff; transform: scaleY(.5); position: absolute; left: 11px; right: 11px; top: 50%; }
.c-tk-date div { font-family: HelveB; }
.c-tk-title p { font-size: 26px; font-family: HelveB; line-height: 30px; }
.c-tk-title div { font-size: 20px; font-family: HelveL; color: #9E9E9F; line-height: 25px; }
</style>

<template>
<div class="c-tk-info">
  <div class="c-tk-date" :class="['c-tk-date-' + size]">
    <p>12</p>
    <div>8</div>
  </div>
  <div class="c-tk-title" v-if="showTitle">
    <p>Nectar by Joji</p>
    <div>MAOLivehouse</div>
  </div>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  props: {
    size: {
      type: String,
      default: 'normal'
    },
    showTitle: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

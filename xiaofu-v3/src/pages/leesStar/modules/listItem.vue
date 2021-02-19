<style scoped>
.c-list-item {
  width: 700px;
  height: 175px;
  background: #FFFFFF;
  box-shadow: 0px 10px 15px 0px rgba(0, 0, 0, 0.15);
  border-radius: 18px;
  margin-bottom: 20px;
}
</style>

<template>
<div class="c-list-item">
  <div class="left">
    <span>{{rank}}</span>
    <h3>
      <p class="en">BLUE ICON house</p>
      <p>顶级室内活动制造方</p>
    </h3>
  </div>
  <div class="right">
    <ul class="stars">
      <li v-for="i in 4" :key="i">
        <img src="/static/images/common/rank-star.png" />
      </li>
    </ul>
    <p>4.6</p>
  </div>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  props: {
    rank: String
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

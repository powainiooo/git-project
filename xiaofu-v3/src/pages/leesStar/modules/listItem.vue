<style scoped>
.c-list-item {
  width: 700px;
  height: 175px;
  background: #FFFFFF;
  box-shadow: 0px 10px 15px 0px rgba(0, 0, 0, 0.15);
  border-radius: 18px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.c-list-item .left {
  display: flex;
  align-items: baseline;
  margin-left: 20px;
}
.c-list-item .left span {
  font-size: 100px;
  font-family: HelveT;
  margin-right: 10px;
}
.c-list-item .left h3 {
  font-size: 20px;
}
.c-list-item .left h3 p.en {
  font-size: 32px;
  font-family: HelveB;
}
.c-list-item .right {
  margin-right: 28px;
}
.c-list-item .right .stars {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}
.c-list-item .right .stars li {
  width: 44px;
  height: 41px;
  margin: 0 3px;
}
.c-list-item .right .stars li img {
  width: 100%;
  height: 100%;
}
.c-list-item .right p {
  font-size: 48px;
  font-family: HelveT;
  text-align: center;
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

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
  position: relative;
}
.c-list-item .bg {
  width: 225px;
  position: absolute;
  top: 0;
  left: 0;
}
.c-list-item-first {
  height: 200px;
  background: linear-gradient(159deg, #0027AF 0%, #2154DA 53%, #003AC3 100%);
  color: #ffffff;
}
.c-list-item .left {
  display: flex;
  align-items: center;
  margin-left: 20px;
  position: relative;
  z-index: 5;
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
<div class="c-list-item"
     :class="{'c-list-item-first': record.sort === 1}"
     hover-class="hscale"
     hover-stay-time="10"
     @click="toDetail">
  <img src="/static/images/leesStar/bg-star.png" mode="widthFix" class="bg" v-if="record.sort === 1">
  <img src="/static/images/leesStar/bg-star2.png" mode="widthFix" class="bg" v-else>
  <div class="left">
    <span>{{record.sort}}</span>
    <h3>
      <p class="en">{{record.name}}</p>
      <p>{{record.organizer_name}}</p>
    </h3>
  </div>
  <div class="right" v-if="record.star">
    <ul class="stars">
      <li v-for="i in starNum" :key="i">
        <img src="/static/images/common/rank-star2.png" v-if="rank === 0" />
        <img src="/static/images/common/rank-star.png" v-else />
      </li>
    </ul>
    <p>{{record.star}}</p>
  </div>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  props: {
    record: Object,
    rank: Number
  },
  data () {
    return {}
  },
  computed: {
    starNum () {
      return parseInt(this.record.star)
    }
  },
  methods: {
    toDetail () {
      mpvue.navigateTo({
        url: `/pages/activity/main?id=${this.record.id}`
      })
    }
  }
}
</script>

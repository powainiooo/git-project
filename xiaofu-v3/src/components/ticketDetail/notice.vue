<style scoped>
.notice-list li {
  display: flex;
  align-items: center;
  margin-right: 25px;
  margin-bottom: 20px;
}
.notice-list li .rank {
  width: 80px;
  margin-right: 20px;
  display: flex;
  justify-content: flex-end;
}
.notice-list li .rank img {
  width: auto;
  height: 54px;
}
.notice-list li .content {
  width: 625px;
  box-sizing: border-box;
  background: #FFFFFF;
  border-radius: 18px;
  padding: 32px 20px;
  font-size: 24px;
  color: #9E9E9F;
  line-height: 36px;
}
.notice-bBorder {
  height: 1px;
  margin: 76px 25px 0 25px;
}
</style>

<template>
<div>
  <div class="c-ticket-title"><span>Notice</span>须知</div>
  <ul class="notice-list">
    <li v-for="(item, i) in list" :key="i">
      <div class="rank"><img :src="'/static/images/number/' + (i + 1) + '.png'" mode="heightFix" /></div>
      <div class="content">{{item}}</div>
    </li>
  </ul>
  <div class="notice-bBorder bBorder"></div>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  props: {
    list: Array
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

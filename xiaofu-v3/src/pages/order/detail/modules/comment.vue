<style scoped>
.c-comment .stars {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 34px;
}
.c-comment .stars li {
  width: 44px;
  height: 41px;
  margin: 0 12px;
}
.c-comment .stars li img {
  width: 100%;
  height: 100%;
}
.c-comment .input-frame {
  width: 630px;
  background: #FFFFFF;
  border-radius: 20px;
  margin: 0 auto 70px auto;
  padding: 15px 20px;
  box-sizing: border-box;
}
.c-comment .input-frame textarea {
  font-size: 24px;
  width: 100%;
  height: 100px;
}
.c-comment .input-frame .btns {
  display: flex;
  justify-content: flex-end;
}
.c-comment .input-frame .btns button {
  width: 100px;
}
</style>

<template>
<div class="c-comment">
  <ul class="stars">
    <li v-for="i in 5" :key="i" @click="setRank(i)">
      <img src="/static/images/common/star-select.png" v-if="(i + 1) <= rank"/>
      <img src="/static/images/common/star-gray.png" v-else />
    </li>
  </ul>
  <div class="input-frame">
    <textarea placeholder="为这场活动评分，并留下您的宝贵建议" />
    <div class="btns">
      <button class="btn">提交</button>
    </div>
  </div>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  data () {
    return {
      rank: 0
    }
  },
  methods: {
    setRank (rank) {
      this.rank = rank
    }
  }
}
</script>

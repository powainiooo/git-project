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
    <textarea placeholder="为这场活动评分，并留下您的宝贵建议" v-model="comment" />
    <div class="btns">
      <button class="btn" @click="submit">提交</button>
    </div>
  </div>
</div>
</template>

<script type='es6'>
import { postAction } from '@/utils/api'

export default {
  name: 'app',
  props: {
    orderId: Number
  },
  data () {
    return {
      rank: 0,
      comment: ''
    }
  },
  methods: {
    setRank (rank) {
      this.rank = rank
    },
    submit () {
      postAction('/api/comment/add', {
        order_id: this.orderId,
        star: this.rank,
        content: this.comment
      }).then(res => {
        if (res.code === 1) {
          mpvue.showToast({
            title: '添加成功'
          })
          this.rank = 0
          this.comment = ''
        }
      })
    }
  }
}
</script>

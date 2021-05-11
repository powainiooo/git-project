<style scoped>
.txt { padding: 40px; font-size: 30px; }

.upload { display: flex; margin: 0 40px; }
.upload .item { width: 168px; height: 168px; margin: 0 10px 30px 10px; border: 2px solid #DADADA; display: flex; justify-content: center; align-items: center; }
.upload .item .icon { width: 58px; }
.upload .item .pic { width: 100%; height: 100%; }

.btn { border-radius: 10px; }
</style>

<template>
  <div class="container2 pt20">
    <div class="b-fff mb20">
      <textarea class="txt" placeholder="请提出您的宝贵建议或遇到的问题" v-model="content"></textarea>
    </div>
<!--    <div class="b-fff pt35">-->
<!--      <div class="between ml50 mr35 mb60">-->
<!--        <p class="f30">图片上传</p>-->
<!--        <p class="f28">0/4</p>-->
<!--      </div>-->
<!--      <div class="upload">-->
<!--        <div class="item">-->
<!--          <img src="/static/images/camera.png" mode="widthFix" class="icon" />-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
    <div class="mt100 ml75 mr75">
      <button class="btn" @click="handleSubmit">提交反馈</button>
    </div>
  </div>
</template>

<script>
import { postAction } from '@/utils/api'

export default {

  data () {
    return {
      id: '',
      content: ''
    }
  },
  methods: {
    handleSubmit () {
      postAction('jyfk', {
        id: this.id,
        content: this.content
      }).then(res => {
        if (res.ret === 0) {
          mpvue.showToast({
            title: '提交成功'
          })
          this.content = ''
        }
      })
    }
  },
  onLoad (options) {
    this.id = options.id
  }
}
</script>

<style scoped>
.pic-container { width: 100%; height: 100vh;background: #436CB3; padding-bottom: 100px; }
.pic-container .hint { font-size: 46px; color: #FFFFFF; text-align: center; margin-bottom: 70px; }
.pic-container .btn { background-color: #FFFFFF; color: #436CB3; }

.pic-list { width: 100%; display: flex; flex-wrap: wrap; margin-top: 40px; }
.pic-list li { width: 50%; text-align: center; margin-bottom: 40px; position: relative; }
.pic-list li:nth-child(2n-1):after { content: ''; width: 2px; position: absolute; top: 8px; bottom: 8px; right: 0; background-color: #436CB3; }
.pic-list li p { font-size: 38px; color: #333333; line-height: 38px; margin-bottom: 38px; }
.pic-list li div { font-size: 28px; color: #436CB3; line-height: 38px; }
</style>

<template>
<div>
  <div class="pic-container" v-if="!showResult">
    <div class="center" style="height: 100%">
      <div>
        <div class="hint">请正对物体，确保光线充足</div>
        <button class="btn" @click="choose">立即拍照</button>
      </div>
    </div>
  </div>
  <div class="container" v-if="showResult">
    <img :src="imgSrc + url" mode="widthFix" class="w100" />
    <ul class="pic-list">
      <li v-for="item in list" :key="index">
        <p>{{item.name}}</p>
        <div>{{item.score}}%</div>
      </li>
    </ul>
    <div class="ml120 mr120">
      <button class="btn" @click="choose">重新拍照</button>
    </div>
  </div>

  <operates :id="id" />
</div>
</template>

<script>
import operates from '@/components/operates'
import config from '@/config'
import store from '@/store'
import {postAction} from '../../utils/api'
const {baseUrl, tokenKey} = config

export default {
  components: {
    operates
  },
  data () {
    return {
      imgSrc: mpvue.imgSrc,
      id: '',
      type: '',
      map: {
        plant: 'sb_zw',
        animal: 'sb_animal',
        car: 'sb_car',
        redwine: 'sb_redwine'
      },
      url: '',
      list: [],
      showResult: false
    }
  },
  methods: {
    choose () {
      mpvue.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: res => {
          mpvue.showLoading({
            title: '识别中'
          })
          this.upload(res.tempFilePaths[0])
        }
      })
    },
    upload (filePath) {
      mpvue.uploadFile({
        url: baseUrl + 'uploadImage',
        filePath,
        name: 'file',
        formData: {
          [tokenKey]: store.state[tokenKey]
        },
        success: res => {
          const data = JSON.parse(res.data)
          if (data.ret === 0) {
            this.getResult(data.data.path)
          }
        }
      })
    },
    getResult (url) {
      postAction(this.map[this.type], {
        image: url
      }).then(res => {
        if (res.ret === 0) {
          mpvue.hideLoading()
          const list = []
          for (const i of res.data) {
            list.push({
              name: i.name,
              score: parseInt(i.score * 100)
            })
          }
          this.url = url
          this.list = list
          console.log('this.list', this.list)
          this.showResult = true
        }
      })
    }
  },
  onLoad (options) {
    this.id = options.id || '61'
    this.type = options.type || 'car'
  }
}
</script>

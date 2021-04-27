<style scoped>
.pic-container { width: 100%; height: 100vh;background: #436CB3; padding-bottom: 100px; }
.pic-container .hint { font-size: 46px; color: #FFFFFF; text-align: center; margin-bottom: 70px; }
.pic-container .btn { background-color: #FFFFFF; color: #436CB3; }
</style>

<template>
  <div class="pic-container">
    <div class="center" style="height: 100%">
      <div>
        <div class="hint">请正对物体，确保光线充足</div>
        <button class="btn" @click="choose">立即拍照</button>
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
const {baseUrl} = config

export default {
  components: {
    operates
  },
  data () {
    return {
      id: '',
      type: '',
      map: {
        plant: 'sb_zw'
      }
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
        success: res => {
          const data = JSON.parse(res.data)
          if (data.ret === 0) {
            this.getResult(data.data.path)
          }
        }
      })
    },
    getResult (url) {
      console.log('getResult', url, this.map[this.type])
      postAction(this.map[this.type], {
        image: url
      }).then(res => {
        if (res.ret === 0) {
          mpvue.hideLoading()
          store.commit('SET_PIC', res.data)
          mpvue.navigateTo({
            url: `/pages/pictrueDetail/main?id=${this.id}&type=${this.type}`
          })
        }
      })
    }
  },
  onLoad (options) {
    this.id = options.id || '61'
    this.type = options.type || 'plant'
  }
}
</script>

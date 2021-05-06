<style lang="stylus" type="text/stylus">
@import "../assets/css/global.styl"
.c-upload
  display flex
  align-items center
  .ivu-upload-select
    display block
  &-box
    center()
    overflow hidden
    size(90px, 90px)
    background-color #EEEEEF
    border-radius 10px
    position relative
    .picture
      width 100%
      display block
    button
      padding 0 6px
      border-radius 3px
      bgG()
      font-size 8px
      color #ffffff
      height 22px
      line-height 22px
      abTL(50%, 50%)
      transform translate(-50%, -50%)
  &-done
    border 2px solid #6D9AF4
  &-error
    border 2px solid #E85412
    button
      background #E85412
  &-progress
    size(60px, 6px)
    border-radius 3px
    overflow hidden
    background-color #ffffff
  &-bar
    size(50%, 100%)
    bgG()
  &-content
    margin-left 10px
    p
      font-size 10px
      color #C8C9CA
      line-height 1.3
    div
      font-size 14px
      color #9E9E9F
      line-height 1.3
  &-cropper
    size(100vw, 100vh)
    background: rgba(0, 0, 0, 0.8);
    position fixed
    top 0
    left 0
    z-index 2000
    center()
    &-close
      position absolute
      top 10px
      right 10px
    &-title
      margin 40px 36px 0 36px
      font-size 18px
      color #000000
      between()
    &-subTitle
      margin 0 36px 20px 36px
      font-size 12px
      color #C8C9CA
    &-area
      size(366px, 386px)
      margin 0 auto
      border 3px solid #6D9AF4
      margin-bottom 20px
      .vue-cropper
        background url("../assets/img/bg.png") rgb(200, 201, 202)
        background-size 360px
    &-container
      size(600px, 600px)
      background-color #ffffff
      border-radius 10px
      position relative

</style>

<template>
<div class="c-upload">
  <Upload :action="url"
          :data="extraData"
          :before-upload="uploadBefore"
          :on-preview="preview"
          :on-progress="progress"
          :on-success="uploadDone"
          :show-upload-list="false">
    <div class="c-upload-box"
         :class="{
            'c-upload-done': (value !== '' && !isLoading),
            'c-upload-error': error
          }"
         :style="{width: width + 'px'}"
         @click="openCropper">
      <img src="@/assets/img/ico-add.png" class="add" width="20" v-if="value === '' && !isLoading" />
      <div class="c-upload-progress" v-if="isLoading">
        <div class="c-upload-bar" :style="{width: barWidth}"></div>
      </div>
      <img :src="cdnurl + value" class="picture" v-if="value !== '' && !isLoading" />
      <button v-if="value !== '' && !isLoading">重新上传</button>
    </div>
  </Upload>
  <div class="c-upload-content">
    <div><slot name="title"></slot></div>
    <p><slot name="hint"></slot></p>
  </div>

  <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
    <div class="c-upload-cropper" v-if="showCropper">
      <div class="c-upload-cropper-container">
        <a href="javascirpt:;" class="c-upload-cropper-close" @click="showCropper = false"><img src="@/assets/img/ico-close2.png" width="20" /></a>
        <div class="c-upload-cropper-title">
          <span>{{title}}</span>
          <Upload action="" :before-upload="uploadBefore2">
            <Button size="small">选择图片</Button>
          </Upload>
        </div>
        <div class="c-upload-cropper-subTitle">
          <span>海报尺寸为{{fixedNumber[0]}}px*{{fixedNumber[1]}}px</span>
        </div>
        <div class="c-upload-cropper-area">
          <vueCropper
            ref="cropper"
            :img="cropperUrl"
            :outputSize="1"
            autoCrop
            fixed
            full
            :info="false"
            :fixedNumber="fixedNumber"
            style="width: 360px; height: 380px;"
          ></vueCropper>
        </div>
        <div class="tc"><Button size="small" @click="doCropper" :loading="isLoading">保存</Button></div>
      </div>
    </div>
  </transition>
</div>
</template>

<script type='es6'>
import { VueCropper } from 'vue-cropper'
import { postAction } from '../utils'
export default {
  name: 'app',
  components: {
    VueCropper
  },
  props: {
    width: {
      type: [Number, String],
      default: 90
    },
    value: {
      type: String,
      default: ''
    },
    error: {
      type: Boolean,
      default: false
    },
    cropper: {
      type: Boolean,
      default: false
    },
    fixedNumber: {
      type: Array,
      default: () => [1, 1]
    },
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    barWidth () {
      if (this.isLoading) {
        return (this.loaded / this.total) * 100 + '%'
      } else {
        return 0
      }
    },
    cdnurl () {
      return this.$store.state.config.uploaddata.cdnurl
    },
    url () {
      return `${window.baseUrl === '/' ? '' : window.baseUrl}/addons/upyun/index/upload.html`
    }
  },
  data () {
    return {
      extraData: {
        upyuntoken: ''
      },
      loaded: 0,
      total: 0,
      isLoading: false,
      cropperUrl: this.value,
      showCropper: false
    }
  },
  mounted () {
  },
  methods: {
    uploadBefore (file) {
      this.extraData.upyuntoken = this.$store.state.config.uploaddata.multipart.upyuntoken
      if (this.cropper) {
        return false
      }
      // return false
    },
    preview (e) {
      console.log('preview', e)
    },
    progress (e) {
      console.log('progress', e)
      this.isLoading = true
      this.loaded = e.loaded
      this.total = e.total
    },
    uploadDone (e) {
      this.isLoading = false
      this.$emit('input', e.data.url)
    },
    openCropper (e) {
      if (this.cropper) {
        e.stopPropagation()
        this.showCropper = true
      }
    },
    uploadBefore2 (file) {
      const fr = new FileReader()
      fr.onload = (result) => {
        this.cropperUrl = result.currentTarget.result
      }
      fr.readAsDataURL(file)
      return false
    },
    doCropper () {
      this.$refs.cropper.getCropData((data) => {
        this.isLoading = true
        postAction('/editor/common/upload', {
          file: data
        }).then(res => {
          this.isLoading = false
          this.showCropper = false
          if (res.code === 1) {
            this.$emit('input', res.data.url)
          }
        })
      })
    }
  }
}
</script>

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
    .picture
      width 100%
      display block
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
</style>

<template>
<div class="c-upload">
  <Upload action="/addons/upyun/index/upload.html"
          :data="extraData"
          :before-upload="uploadBefore"
          :on-preview="preview"
          :on-progress="progress"
          :on-success="uploadDone"
          :show-upload-list="false">
    <div class="c-upload-box" :style="{width: width + 'px'}" @click="fileChange">
      <img src="@/assets/img/ico-add.png" class="add" width="20" v-if="src === '' && !isLoading" />
      <div class="c-upload-progress" v-if="isLoading">
        <div class="c-upload-bar" :style="{width: barWidth}"></div>
      </div>
      <img :src="src" class="picture" v-if="src !== '' && !isLoading" />
    </div>
  </Upload>
  <div class="c-upload-content">
    <div><slot name="title"></slot></div>
    <p><slot name="hint"></slot></p>
  </div>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  props: {
    width: {
      type: [Number, String],
      default: 90
    },
    value: {
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
    }
  },
  data () {
    return {
      extraData: {
        upyuntoken: ''
      },
      loaded: 0,
      total: 0,
      src: '',
      isLoading: false
    }
  },
  mounted () {
    this.extraData.upyuntoken = this.$store.state.config.uploaddata.multipart.upyuntoken
  },
  methods: {
    uploadBefore (e) {
      console.log('uploadBefore', e)
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
      console.log('uploadDone', e)
      this.src = e.data.fullurl
      this.$emit('input', e.data.fullurl)
    },
    fileChange (e) {
      console.log('fileChange', e)
      // this.$emit('input', '123')
    }
  }
}
</script>

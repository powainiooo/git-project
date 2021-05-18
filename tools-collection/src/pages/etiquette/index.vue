<style scoped>
.video { width: 100%; height: 430px; }
.et-title { margin: 70px 0 60px 0; text-align: center; font-size: 40px; color: #436CB3; padding-bottom: 30px; position: relative; }
.et-title:after { content: ''; width: 56px; height: 4px; background-color: #436CB3; position: absolute; left: 50%; bottom: 0; transform: translateX(-50%); }
</style>

<template>
  <div class="container">
    <div class="hr20"></div>
    <template v-if="record.id">
      <video :src="imgSrc + record.mp4_path" controls :poster="imgSrc + record.imgpath" class="video" v-if="record.mp4_path !== ''"></video>
      <!--<img :src="imgSrc + record.imgpath" mode="widthFix" class="w100" v-else /> -->

      <c-audio :src="record.mp3_path" :title="record.name" v-if="record.mp3_path !== ''" />

      <div class="et-title">{{record.name}}</div>
      <div class="ml30 mr30 mb30">
<!--        <rich-text :nodes="record.desc" class="f30" @click="check"></rich-text>-->
        <wxParse :content="record.desc"></wxParse>
      </div>
    </template>
    <operates :id="id" />
  </div>
</template>

<script>
import operates from '@/components/operates'
import cAudio from '@/components/audio'
import {postAction} from '../../utils/api'
import wxParse from 'mpvue-wxparse'

export default {
  components: {
    operates,
    cAudio,
    wxParse
  },
  data () {
    return {
      id: '',
      imgSrc: mpvue.imgSrc,
      record: {}
    }
  },
  methods: {
    getData () {
      postAction('rite_info', {
        id: this.id
      }).then(res => {
        if (res.ret === 0) {
          this.record = res.data
        }
      })
    },
    check (e) {
      console.log(e)
    }
  },
  onShareAppMessage () {
    const pages = getCurrentPages()
    const view = pages[pages.length - 1]
    return {
      title: '社交礼仪',
      path: `/${view.route}?id=${this.id}`
    }
  },
  onLoad (options) {
    this.id = options.id
    this.getData()
  }
}
</script>

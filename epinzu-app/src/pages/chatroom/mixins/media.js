import Taro from '@tarojs/taro'
import { uploadAudio, upload, uploadVideo } from "@/utils/api"

export const audioMixin = {
  data () {
    return {
      playId: '',
      audioData: {},
      audioCtx: null,
      recordT: 0,
      isRecording: false,
      isCancel: false,
      touchY: 0,
      recordCtx: null,
      recordBtn: '按住 说话',
      showVideo: false,
      videoCtx: null,
      videoSrc: '',
      videoPostSrc: '',
      showVideoBtn: true,
      hasRecordAuth: true
    }
  },
  mounted () {
    this.getSetting()
  },
  methods: {
    // 获取授权
    getSetting () {
      Taro.getSetting({
        success: res => {
          console.log('getSetting', res)
          this.hasRecordAuth = res.authSetting.audioRecord
        }
      })
    },
    // 音频初始化
    audioInit () {
      this.audioCtx = Taro.createInnerAudioContext()
      this.audioCtx.onPlay(() => {
        console.log('audioPlay')
        this.playId = this.audioData.id
      })
      this.audioCtx.onPause(() => {
        console.log('onPause')
        this.playId = ''
      })
      this.audioCtx.onStop(() => {
        console.log('onStop')
        this.playId = ''
      })
      this.audioCtx.onError((e) => {
        console.log('onError', e)
        this.playId = ''
      })
    },
    // 录音初始化
    recordInit () {
      this.recordCtx = Taro.getRecorderManager()
      console.log('this.recordCtx', this.recordCtx)
      this.recordCtx.onStart((e) => {
        console.log('recorder start')
        this.isRecording = true
        this.isCancel = false
        this.recordBtn = '松开 结束'
        // this.$refs.audioHint.start()
        // this.recordT = setTimeout(() => {
        //   this.recordCtx.stop()
        //   this.stopRecord()
        // }, 6000)
      })
      this.recordCtx.onPause((e) => {
        console.log('recorder pause', e)
        this.stopRecord()
      })
      this.recordCtx.onStop((res) => {
        console.log('recorder stop', res)
        const { tempFilePath, duration } = res
        this.isRecording = false
        this.recordBtn = '按住 说话'
        if (res.duration < 1) {
          Taro.showToast({
            title: '时间过短'
          })
        }
        if (tempFilePath !== '') {
          this.uploadAudio(tempFilePath, Math.ceil(duration))
        }
        // this.$refs.audioHint.stop()
        // clearTimeout(this.recordT)
      })
    },
    // 视频初始化
    videoInit () {
      this.videoCtx = Taro.createVideoContext('video')
    },
    // 媒体播放
    onplay (data) {
      console.log('onplay', data)
      this.audioData = data
      if (data.type === 'audio') {
        this.audioCtx.src = data.url
        this.audioCtx.play()
      } else if (data.type === 'video') {
        this.videoSrc = data.url
        this.videoPostSrc = data.post
        this.videoCtx.play()
        this.showVideo = true
      }
    },
    // 开始录音
    startRecord (e) {
      console.log('this.hasRecordAuth', this.hasRecordAuth)
      if (this.hasRecordAuth) {
        this.recordCtx.start({
          format: 'mp3'
        })
        this.touchY = e.touches[0].pageY
      } else {
        this.getSetting()
      }

    },
    // 停止录音
    stopRecord () {
      console.log('stopRecord')
      this.recordCtx.stop()
    },
    // 监听滑动
    tmove (e) {
      if (this.isRecording && !this.isCancel) {
        // console.log(e)
        if (e.touches[0].pageY < this.touchY - 40) {
          this.isCancel = true
        }
      }
    },
    // 上传音频
    uploadAudio (path, duration) {
      uploadAudio(path, duration).then(result => {
        const res = JSON.parse(result)
        console.log('uploadAudio', res)
        if (res.code === 0) {
          this.sendAudioMsg(`${duration}|${res.data.url}`)
        }
      })
    },
    // 播放视频
    playVideo () {
      this.videoCtx.play()
    },
    // 关闭视频
    hideVideo () {
      this.videoCtx.pause()
      this.showVideo = false
    },
    // 选择图片
    selectImg () {
      Taro.chooseImage({
        count: 1
      }).then(res1 => {
        console.log('chooseImage', res1)
        upload(res1.tempFilePaths[0]).then(res2 => {
          const res3 = JSON.parse(res2)
          if (res3.code === 0) {
            this.sendImgMsg(res3.data.url)
            this.currentTool = ''
          } else {
            Taro.showToast({
              title: res3.msg
            })
          }
        })
      })
    },
    // 选择视频
    selectVideo () {
      Taro.chooseVideo({
        sourceType: ['album'],
        compressed: true
      }).then(res1 => {
        console.log('chooseVideo', res1)
        uploadVideo(res1.tempFilePath).then(res2 => {
          console.log('uploadVideo', res2)
          const res3 = JSON.parse(res2)
          if (res3.code === 0) {
            this.sendVideoMsg(`${res3.data.cover}|${res3.data.url}`)
            this.currentTool = ''
          } else {
            Taro.showToast({
              title: res3.msg
            })
          }
        })
      })
    },
  }
}

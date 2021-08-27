import Taro from '@tarojs/taro'

export const audioMixin = {
  data () {
    return {
      playId: '',
      audioData: {},
      audioCtx: null,
      recordT: 0,
      isRecording: false,
      isCancel: false,
      touchY: 0
    }
  },
  methods: {
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
    // 媒体播放
    onplay (data) {
      this.audioData = data
      if (data.type === 'audio') {
        this.audioCtx.src = data.url
        this.audioCtx.play()
      }
    },
    // 开始录音
    startRecord (e) {
      this.touchY = e.touches[0].pageY
      this.isRecording = true
      this.isCancel = false
      this.$refs.audioHint.start()
      this.recordT = setTimeout(() => {
        this.stopRecord()
      }, 6000)
    },
    // 停止录音
    stopRecord () {
      this.isRecording = false
      this.$refs.audioHint.stop()
      clearTimeout(this.recordT)
    },
    // 监听滑动
    tmove (e) {
      if (this.isRecording && !this.isCancel) {
        // console.log(e)
        if (e.touches[0].pageY < this.touchY - 40) {
          this.isCancel = true
        }
      }
    }
  }
}

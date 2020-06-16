<style>
.c-audio { width: 100%; height: 70px; background-color: rgba(0, 0, 0, 0.8); position: absolute; left: 0; bottom: 0;}
.c-audio-operas { height: 100%; display: flex; align-items: center; margin: 0 40px; justify-content: space-between;}
.c-audio-btns { width: 184px; display: flex; align-items: center; justify-content: space-between;}
.c-audio-progress { width: calc(100% - 360px); padding: 0 40px; position: relative;}
.c-audio-progress-line { width: 100%; height: 2px; background-color: #9F9F9F; position: relative;}
.c-audio-progress-bar { width: 50%; height: 2px; background-color: #ffffff;}
.c-audio-progress-dot { width: 10px; height: 10px; border-radius: 50%; background-color: #ffffff; margin: -4px 0 0 -5px; position: absolute; top: 0; left: 50%; cursor: pointer; display: flex; justify-content: center; align-items: center;}
.c-audio-progress-dot img { width: 100%; animation: loading 1s linear infinite}
@keyframes loading {
    0% { transform: rotateZ(0deg)}
    100% { transform: rotateZ(360deg)}
}
.c-audio-time { font-size: 12px; color: #ffffff; position: absolute; top: -6px;}
.c-audio-btn { width: 96px; height: 32px; display: flex; justify-content: center; align-items: center; font-size: 12px; color: #ffffff; border: 1px solid #ffffff; border-radius: 5px;}
</style>

<template>
<div class="c-audio">
    <div class="c-audio-operas">
        <div class="c-audio-btns">
            <a href="javascript:;" @click="prev"><img src="./images/icon_left.png"></a>
            <a href="javascript:;" v-if="!playing" @click="playToggle('play')"><img src="./images/icon_play.png"></a>
            <a href="javascript:;" v-if="playing" @click="playToggle('pause')"><img src="./images/icon_time out.png"></a>
            <a href="javascript:;" @click="next"><img src="./images/icon_right.png"></a>
        </div>
        <div class="c-audio-progress">
            <div class="c-audio-time" style="left: 0;">{{timeCurrentStr}}</div>
            <div class="c-audio-progress-line" ref="progress">
                <div class="c-audio-progress-bar" :style="{width: progress+'%'}"></div>
                <div class="c-audio-progress-dot" :style="{left: progress+'%'}" @mousedown="doMove">
                    <img src="./images/icon-loading.png" v-if="isLoading">
                </div>
            </div>
            <div class="c-audio-time" style="right: 0;">{{timeTotalStr}}</div>
        </div>
        <a href="javascript:;" class="c-audio-btn" @click="out">退出语音</a>
    </div>
    <audio :src="src"
           ref="audio"
           @canplay="load"
           @play="play"
           @pause="pause"
           @ended="pause"></audio>
</div>
</template>

<script type='es6'>
function format(sec) {
    let min = Math.floor(sec / 60)
    min = min < 10 ? `0${min}` : min
    let second = sec % 60
    second = second < 10 ? `0${second}` : second
    return `${min}:${second}`
}
export default {
    name: 'app',
    props: ['src'],
    data () {
        return {
            duration: 0,
            progress: 0,
            playing: false,
            currentSecond: 0,
            t: 0,
            isLoading: true
        }
    },
    computed: {
        timeTotalStr () {
            return format(this.duration)
        },
        timeCurrentStr () {
            return format(this.currentSecond)
        }
    },
    watch: {
        src (src) {
            console.log('src', src)
            this.reset()
        }
    },
    methods: {
        load (e) {
            console.log('onload')
            this.duration = Math.ceil(e.target.duration)
            this.isLoading = false
        },
        playToggle (status) {
            if (status === 'pause') {
                this.$refs.audio.pause()
            } else if (status === 'play') {
                this.$refs.audio.play()
            }
        },
        play () {
            this.playing = true
            this.t = setInterval(() => {
                this.currentSecond += 1
                this.progress = (this.currentSecond / this.duration) * 100
            }, 1000)
        },
        pause () {
            this.playing = false
            clearInterval(this.t)
        },
        doMove (e) {
            const w = this.$refs.progress.offsetWidth
            const sx = e.screenX
            const sp = w * this.progress / 100
            const lastStatus = this.playing
            if (this.playing) {
                this.playToggle('pause')
            }
            document.onmousemove = (e) => {
                e.preventDefault()
                const mx = e.screenX
                let mp = sp + mx - sx
                this.progress = (mp / w) * 100
                if (this.progress < 0) this.progress = 0
                if (this.progress > 100) this.progress = 100
                this.currentSecond = Math.floor(this.duration * this.progress / 100)
            }
            document.onmouseup = (e) => {
                document.onmousemove = null
                document.onmouseup = null
                this.$refs.audio.currentTime = this.currentSecond
                if (lastStatus) {
                    this.playToggle('play')
                }
            }
        },
        reset () {
            this.currentSecond = 0
            this.progress = 0
            this.isLoading = true
            clearInterval(this.t)
            this.playToggle('pause')
        },
        out () {
            this.playToggle('pause')
            this.$emit('onout')
        },
        prev () {
            this.$emit('onprev')
        },
        next () {
            this.$emit('onnext')
        }
    }
}
</script>

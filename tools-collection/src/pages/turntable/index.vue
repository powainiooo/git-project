<style scoped>
.line1 { width: 500px; margin: 50px auto; }
.wheel { width: 700px; height: 700px; position: relative; margin: 0 auto; transition: all 3s cubic-bezier(.42,.9,.67,.89); }
.wheel .bg { width: 100%; height: 100%; }
.wheel ul { width: 36px; height: 36%; position: absolute; top: 14%; left: 50%; transform: translateX(-50%); }
.wheel ul li { width: 100%; height: 100%; position: absolute; top: 0; left: 0; transform-origin: 50% 100%; font-size: 32px; color: #3D62A0; display: flex; justify-content: center; }
.wheel ul li:nth-child(2n) { color: #FFFFFF; }

.wheel-point { width: 154px; position: absolute; top: 50%; left: 50%; transform: translate(-47%, -50%); }
.wheel-btn { width: 120px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }

.edit-modal { width: 100%; height: 100%; position: fixed; top: 0; left: 0; background-color: rgba(0, 0, 0, .7); z-index: 1000; display: flex; align-items: center; justify-content: center; }
.edit-box { width: 500px; height: 320px; background-color: #436CB3; box-shadow: 0px 3px 7px 0px rgba(0, 0, 0, 0.35);border-radius: 4px; overflow: hidden; }
.edit-box h3 { font-size: 30px; color: #F3F3F3; text-align: center; margin: 30px 0 50px 0; }
.edit-box input { width: 326px; height: 63px; background: #F3F3F3; border-radius: 32px; font-size: 26px; color: #436CB3; text-align: center; margin: 0 auto; }
.edit-box button { width: 125px; height: 42px; line-height: 40px; background: #F3F3F3; border-radius: 21px; font-size: 26px; color: #436CB3; }
</style>

<template>
  <div class="container3">
    <div class="hr20"></div>
    <div class="line1">
      <button class="btn">{{name}}</button>
    </div>

    <div class="pr">
      <div class="wheel"
           :style="{
            'transform': 'rotateZ(' + angle + 'deg)',
            'transition-duration': (isRolling ? time : 0) + 's'
           }">
        <img src="/static/images/wheel.png" class="bg" />
        <ul>
          <li v-for="item in list"
              :key="id"
              :style="{
                transform: 'rotateZ(' + (index * 60) + 'deg)'
              }"
              @click="openEdit(item)">{{item.prize}}</li>
        </ul>
      </div>
      <img src="/static/images/btn2.png" mode="widthFix" class="wheel-point" />
      <img src="/static/images/btn1.png" mode="widthFix" class="wheel-btn" @click="play" />
    </div>

    <div class="hint1 tc mt50">自定义内容请双击修改</div>

    <div class="edit-modal" v-if="showEdit">
      <div class="edit-box">
        <h3>修改内容</h3>
        <div class="tc mb60"><input v-model="editPrize" :maxLength="4" /></div>
        <div class="tc"><button @click="confirm">确认</button></div>
      </div>
    </div>

    <operates :id="id" />
  </div>
</template>

<script>
import operates from '@/components/operates'
import {postAction} from '../../utils/api'

export default {
  components: {
    operates
  },
  data () {
    return {
      id: '',
      list: [],
      name: '',
      time: 3,
      angle: 0,
      startAngle: 60,
      isRolling: false,
      rolls: 6 * 360,
      showEdit: false,
      editId: '',
      editPrize: ''
    }
  },
  methods: {
    getList () {
      postAction('pre_turntable').then(res => {
        if (res.ret === 0) {
          this.list = res.data
          this.name = res.data[1].prize
          mpvue.setStorageSync('turntable', res.data)
        }
      })
    },
    play () {
      if (this.isRolling) return
      this.isRolling = true
      postAction('turntable').then(res => {
        if (res.ret === 0) {
          this.angle = this.rolls + (this.list.length - res.data) * 60 + this.startAngle
          this.nameRoll(res.data)
          setTimeout(() => {
            this.isRolling = false
            this.$nextTick(() => {
              this.angle -= this.rolls
            })
          }, this.time * 1000)
        } else {
          this.isRolling = false
        }
      })
    },
    nameRoll (index) {
      const len = this.list.length
      const count = 6 * len + index
      let s = 0
      const t = setInterval(() => {
        if (s === count) {
          clearInterval(t)
        } else {
          s += 1
        }
        this.name = this.list[s % len].prize
      }, this.time * 1000 / count)
    },
    openEdit (record) {
      this.editId = record.id
      this.editPrize = record.prize
      this.showEdit = true
    },
    confirm () {
      this.list.forEach(i => {
        if (i.id === this.editId) {
          i.prize = this.editPrize
        }
      })
      this.showEdit = false
      mpvue.setStorageSync('turntable', this.list)
    }
  },
  onLoad (options) {
    this.id = options.id
    const list = mpvue.getStorageSync('turntable')
    if (!Array.isArray(list)) {
      this.getList()
    } else {
      this.list = list
      this.name = list[1].prize
    }
  }
}
</script>

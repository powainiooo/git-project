<style scoped>
.c-slide-box {
  width: 340px;
  height: 100%;
  overflow: hidden;
  position: relative;
  margin: 0 10px;
  float: left;
}
.c-slide-item {
  position: absolute;
}
.c-slide-item li {
  width: 340px;
  height: 267px;
  background-color: #ffffff;
  -webkit-mask-image: url('../../assets/img/mask2.png');
  font-size: 40px;
  margin-bottom: 20px;
}
</style>

<template>
<div class="c-slide-box">
  <ul ref="list" class="c-slide-item" :style="styles">
    <li v-for="(i, index) in itemList" :key="index">{{i.name}}</li>
  </ul>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  props: {
    list: Array,
    direct: {
      type: String,
      default: 'up'
    }
  },
  watch: {
    list (val) {
      const list = [...val]
      list.sort(() => Math.random() - 0.5)
      this.itemList = list
    }
  },
  data () {
    return {
      itemList: [],
      dis: 0,
      t: 0
    }
  },
  computed: {
    styles () {
      if (this.direct === 'up') {
        return {
          top: -this.dis + 'px'
        }
      } else {
        return {
          bottom: -this.dis + 'px'
        }
      }
    }
  },
  mounted () {
    this.move()
  },
  destroyed () {
    clearInterval(this.t)
  },
  methods: {
    move () {
      this.t = setInterval(() => {
        this.dis += 0.5
        if (this.dis >= 287) {
          const list = this.$refs.list
          if (!list) return
          if (this.direct === 'up') {
            const child = list.childNodes[0]
            list.removeChild(child)
            list.appendChild(child)
          } else {
            const child = list.lastChild
            list.removeChild(child)
            list.insertBefore(child, list.childNodes[0])
          }
          this.dis = 0
        }
      }, 30)
    }
  }
}
</script>

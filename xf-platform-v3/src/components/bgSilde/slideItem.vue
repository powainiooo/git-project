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
  /*background-color: #ffffff;*/
  /*-webkit-mask-image: url('../../assets/img/mask2.png');*/
  /*font-size: 40px;*/
  margin-bottom: 20px;
  position: relative;
}
.c-slide-item li:after {
  content: '';
  width: 67px; height: 67px; position: absolute; bottom: 0; right: 0;
  background-image: url('data:image/png;base64,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');
  background-size: 100% 100%;
}
</style>

<template>
<div class="c-slide-box">
  <ul ref="list" class="c-slide-item" :style="styles">
    <li v-for="(i, index) in itemList" :key="index">
      <ticket :record="i" size="min" />
    </li>
  </ul>
</div>
</template>

<script type='es6'>
import ticket from '../ticket'
export default {
  name: 'app',
  components: { ticket },
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
      this.move()
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

<style lang="stylus">
@import "../../assets/css/mixin.styl"
.c-float-box
  size(100%, 100vh); fxTL(0, 0); z-index 200;
  display flex; align-items flex-end; justify-content center;
  &>.box
    flex 1; animation-duration .4s
  &-title
    size(100%, 80px); abTL(0, 0); background-color #ffffff; border-radius 50px 50px 0 0; between(); padding 0 30px; position relative; box-shadow 0 2px 13px 0 rgba(0, 0, 0, .08)
  &-body
    size(100%, 100%); overflow-y auto; position relative;
  &-body2
    height calc(100% - 80px)
</style>

<template>
<div class="c-float-box" v-if="showFrame">
  <transition enter-active-class="animated fadeInUp" leave-active-class="animated slideOutDown" @after-leave="afterLeave">
    <div class="box pr" :style="styles" v-if="showChild">
      <div class="c-float-box-title" v-if="hasTitle">
        <h3>{{title}}</h3>
        <slot name="btns"></slot>
      </div>
      <div class="c-float-box-body scrollBar" :class="{'c-float-box-body2': hasTitle}">
        <slot></slot>
      </div>
    </div>
  </transition>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    width: {
      type: [Number, String],
      default: 'auto'
    },
    height: {
      type: [Number, String], // 70 76
      default: 70
    },
    left: {
      type: [Number, String],
      default: 0
    },
    right: {
      type: [Number, String],
      default: 0
    },
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    styles () {
      return {
        width: this.width === 'auto' ? this.width : `${this.width}px`,
        height: `${this.height}vh`,
        'margin-left': this.left + 'px',
        'margin-right': this.right + 'px'
      }
    },
    hasTitle () {
      return this.$slots.btns || this.title !== ''
    }
  },
  watch: {
    value (val) {
      if (val) {
        this.showFrame = true
        this.$nextTick(() => {
          this.showChild = true
        })
      } else {
        this.showChild = false
      }
    }
  },
  data () {
    return {
      showFrame: false,
      showChild: false
    }
  },
  methods: {
    afterLeave () {
      console.log('afterLeave')
      this.showFrame = false
      this.$emit('input', false)
    }
  }
}
</script>

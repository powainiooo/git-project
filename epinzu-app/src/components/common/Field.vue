<style lang="stylus" type="text/stylus">
.c-field
  width 100%; height 52px; background-color #FFFFFF; position relative; display flex; align-items center; padding-left 12px; padding-right 12px;
  &:after
    content ''; position absolute; left 12px; right 0; bottom 0; background-color #E5E5E5; height 1PX; transform scaleY(.5);
  &-name
    width 82px; font-size 14px;
  &-body
    flex 1; display flex;
    input
      font-size 14px; flex 1;
  &-button
    padding-left 8px;
</style>

<template>
<view class="c-field">
  <view class="c-field-name" :style="{color: labelColor}" v-if="label !== ''">{{label}}</view>
  <view class="c-field-body">
    <input :type="type"
           :placeholder="placeholder"
           :value="value"
           :disabled="readonly"
           :style="inputStyle"
           placeholder-style="color: #999999;"
           @Input="inputChange" />
    <view class="c-field-button" v-if="$slots.rightIcon">
      <slot name="rightIcon"></slot>
    </view>
    <view class="c-field-button" v-if="$slots.button">
      <slot name="button"></slot>
    </view>
  </view>
</view>
</template>

<script type='es6'>
export default {
	name: 'app',
  props: {
	  value: {
	    type: [String, Number],
      default: ''
    },
	  label: {
	    type: String,
      default: ''
    },
	  labelColor: {
	    type: String,
      default: '#333333'
    },
	  type: {
	    type: String,
      default: 'text'
    },
    placeholder: {
	    type: String,
      default: ''
    },
    readonly: {
	    type: Boolean,
      default: false
    },
    textAlign: {
      type: String,
      default: 'left'
    }
  },
  computed: {
    inputStyle () {
      return {
        'text-align': this.textAlign
      }
    }
  },
	data() {
		return {}
	},
	methods: {
    inputChange (e) {
      this.$emit('input', e.detail.value)
    }
  }
}
</script>

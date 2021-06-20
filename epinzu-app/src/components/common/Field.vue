<style lang="stylus" type="text/stylus">
.c-field
  width 100%; height 52px; background-color #FFFFFF; position relative; display flex; align-items center; padding-left 12px;
  &:after
    content ''; position absolute; left 12px; right 0; bottom 0; background-color #E5E5E5; height 1PX; transform scaleY(.5);
  &-name
    width 82px; font-size 14px;
  &-body
    flex 1;
    input
      font-size 14px;
</style>

<template>
<view class="c-field">
  <view class="c-field-name" v-if="label !== ''">{{label}}</view>
  <view class="c-field-body">
    <input :type="type" :placeholder="placeholder" @Input="inputChange" />
    <view class="c-field-button">
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
	    type: String,
      default: ''
    },
	  label: {
	    type: String,
      default: ''
    },
	  type: {
	    type: String,
      default: 'text'
    },
    placeholder: {
	    type: String,
      default: ''
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

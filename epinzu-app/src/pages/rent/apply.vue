<template>
  <view class="Rent container">
    <Form title="凭证说明"
          placeholder="请你详细填写申请理由"
          hint="提示：请上传真实凭证图片，最多3张"
          class="mt2" />
    <!-- 底部按钮 -->
    <view class="footer-container">
      <view class="wp100 pl12 pr12">
        <button class="c-btn">确认提交</button>
      </view>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import Form from '@/c/common/Form'

export default {
  name: 'Index',
  components: {
    Form
  },
  data () {
    return {
      tabs: [
        { key: 'post', label: '快递' },
        { key: 'return', label: '自还' }
      ],
      tabKey: 'post'
    }
  },
  methods: {
    tabChange (e) {
      this.tabKey = e
    }
  },
}
</script>

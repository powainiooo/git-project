<template>
  <view class="Question">
    <view class="ml12">
      <cell v-for="(item, index) in quesList"
            :key="item.id"
            :title="(index + 1) + '.' + item.title"
            isLink
            @tap="toDetail(item.url)" />
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import './index.styl'
import Cell from '@/c/common/Cell'

export default {
  name: 'Question',
  components: {
    Cell
  },
  computed: {
    quesList () {
      return this.$store.state.quesList
    }
  },
  data () {
    return {
    }
  },
  methods: {
    toDetail (url) {
      Taro.navigateTo({
        url: `/pages/webview/index?src=${url}&title=常见问题`
      })
    }
  },
}
</script>

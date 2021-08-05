<template>
  <view class="Question">
    <view class="ml12">
      <cell v-for="(item, index) in dataSource"
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
import { pageMixin } from '@/mixins/pages'

export default {
  name: 'Question',
  mixins: [pageMixin],
  components: {
    Cell
  },
  computed: {
    quesList () {
      return this.source === 'goods' ?
        this.$store.state.quesList
        :
        this.dataSource
    }
  },
  data () {
    return {
      disableMixinCreated: false,
      source: '',
      url: {
        list: '/userapi/questions'
      }
    }
  },
  methods: {
    toDetail (url) {
      Taro.navigateTo({
        url: `/pages/webview/index?src=${url}&title=常见问题`
      })
    }
  },
  onLoad (options) {
    // this.source = options.source || 'goods'
    // this.disableMixinCreated = this.source === 'goods'
  }
}
</script>

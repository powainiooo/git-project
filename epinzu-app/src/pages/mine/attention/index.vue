<template>
  <view class="Attention">
    <!-- 空提示 -->
    <view class="bg-fff ovh h200 center mb32" v-if="isAttentionNone">
      <view class="empty">
        <image src="@/img/star3.png" mode="widthFix" class="img" />
        <view class="txt">您还没有关注任何店铺</view>
      </view>
    </view>
    <!-- 列表 -->
    <view class="list mb32" v-if="!isAttentionNone">
      <item v-for="item in dataSource" :key="item.id" :record="item" />
    </view>
    <!-- 您可能还喜欢 -->
    <guess-like :list="dataSource" v-if="isAttentionNone" />
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import item from './modules/item'
import '../index.styl'
import { pageMixin } from '@/mixins/pages'
import GuessLike from '@/c/common/GuessLike'

export default {
  name: 'Index',
  mixins: [pageMixin],
  components: {
    item,
    GuessLike
  },
  data () {
    return {
      url: {
        list: '',
        attention: '/userapi/user/attentions/list',
        like: '/userapi/goods/collection/recommend'
      },
      isAttentionNone: false
    }
  },
  onShow () {
    if (!this.loading) {
      this.url.list = this.url.attention
      this.isAttentionNone = false
      this.resetLoad()
    }
  },
  methods: {
    afterGetList () {
      if (!this.isAttentionNone && this.dataSource.length === 0) {
        this.url.list = this.url.like
        this.isAttentionNone = true
        this.getListData()
      }
    }
  },
  onLoad () {
    this.url.list = this.url.attention
  }
}
</script>

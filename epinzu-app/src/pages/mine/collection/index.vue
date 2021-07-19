<template>
  <view class="Collection">
    <!-- 空提示 -->
    <view class="bg-fff ovh h200 center mb32" v-if="isAttentionNone">
      <view class="empty">
        <image src="@/img/collection.png" mode="widthFix" class="img" />
        <view class="txt">您还没有任何收藏</view>
      </view>
    </view>
    <!-- 列表 -->
    <view class="list mb32" v-if="!isAttentionNone">
      <item v-for="item in dataSource" :key="item.id" :record="item"  />
    </view>
    <guess-like :list="dataSource" v-if="isAttentionNone" />
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import item from './modules/item'
import GuessLike from '@/c/common/GuessLike'
import '../index.styl'
import { pageMixin } from '@/mixins/pages'

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
        list: '/userapi/user/collections/list',
        like: '/userapi/goods/collection/recommend'
      },
      isAttentionNone: false
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
}
</script>

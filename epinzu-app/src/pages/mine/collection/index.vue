<template>
  <view class="Collection">
    <!-- 空提示 -->
    <view class="bg-fff ovh h200 center mb32" v-if="dataSource.length === 0">
      <view class="empty">
        <image src="@/img/collection.png" mode="widthFix" class="img" />
        <view class="txt">您还没有任何收藏</view>
      </view>
    </view>
    <!-- 列表 -->
    <view class="list mb32">
      <item v-for="item in dataSource"
            :key="item.id"
            :record="item"
            :delId="delId"
            @del="setDelId"
            @refresh="resetLoad"  />
    </view>
    <guess-like :list="dataSource2" v-if="isAttentionNone" />
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import item from './modules/item'
import GuessLike from '@/c/common/GuessLike'
import '../index.styl'
import { pageMixin } from '@/mixins/pages'
import { getAction } from "@/utils/api"

export default {
  name: 'Index',
  mixins: [pageMixin],
  components: {
    item,
    GuessLike
  },
  data () {
    return {
      dataSource2: [],
      url: {
        list: '',
        collection: '/userapi/user/collections/list',
        like: '/userapi/goods/collection/recommend'
      },
      isAttentionNone: false,
      delId: 0
    }
  },
  onShow () {
    if (!this.loading) {
      this.url.list = this.url.collection
      this.isAttentionNone = false
      this.resetLoad()
    }
  },
  methods: {
    getListData () {
      Taro.showLoading({
        title: '加载中'
      })
      const params = this.getParams()
      this.loading = true
      getAction(this.url.list, params).then(res => {
        if (res.code === 0) {
          if (this.isAttentionNone) {
            this.dataSource2 = this.dataSource2.concat(res.data.list)
            this.ipage.loadOver = res.data.list.length < res.data.pageSize
          } else {
            this.dataSource = this.dataSource.concat(res.data.list)
            this.ipage.loadOver = res.data.list.length < res.data.pageSize
            this.isAttentionNone = this.ipage.loadOver
            if (this.isAttentionNone) {
              this.url.list = this.url.like
              this.ipage.current = 1
              this.ipage.loadOver = false
              this.getListData()
            }
          }
        }
        this.loading = false
        Taro.hideLoading()
        console.log('end')
      })
    },
    setDelId (id) {
      this.delId = id
    }
  },
  onLoad () {
    this.url.list = this.url.collection
  }
}
</script>

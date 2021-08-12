<style scoped>

</style>

<template>
<scroll-view class="Message-page" :scroll-y="true" @ScrollToLower="reachBottom">
  <!-- 空提示 -->
  <view class="empty mt60" v-if="false">
    <image src="@/img/horn.png" mode="widthFix" class="img" />
    <view class="txt">还没有收到任何通知</view>
  </view>

  <!-- 列表 -->
  <view class="Message-list">
    <item v-for="item in dataSource" :key="item.id" :record="item"/>
  </view>
</scroll-view>
</template>

<script type='es6'>
import item from './item'
import { pageMixin } from "@/mixins/pages"
import Taro from "@tarojs/taro"
import { getAction } from "@/utils/api"

export default {
	name: 'app',
  components: {
    item
  },
  mixins: [pageMixin],
	data() {
		return {
      disableMixinCreated: true
    }
	},
	methods: {
    reachBottom (e) {
      console.log('reachBottom', e)
    },
    getListData () {
      Taro.showLoading({
        title: '加载中'
      })
      this.loading = true
      getAction('/userapi/sysmsg/index').then(res => {
        if (res.code === 0) {
          if (this.dataSource.length === 0 || this.dataSource[0].id !== res.data.list[0].id) {
            this.dataSource = this.dataSource.concat(res.data.list)
            this.ipage.loadOver = res.data.list.length < res.data.pageSize
          }
        }
        this.loading = false
        Taro.hideLoading()
      })
    },
  }
}
</script>

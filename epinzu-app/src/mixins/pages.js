import Taro from '@tarojs/taro'
import { getAction } from '@/utils/api'

export const pageMixin = {
  data () {
    return {
      queryParams: {},
      ipage: {
        current: 1,
        loadOver: false
      },
      loading: false,
      dataSource: []
    }
  },
  created () {
    if(!this.disableMixinCreated){
      console.log(' -- mixin created -- ')
      this.getListData()
    }
  },
  methods: {
    getParams () {
      const params = Object.assign({}, this.queryParams)
      params.page = this.ipage.current
      return params
    },
    getListData () {
      Taro.showLoading({
        title: '加载中'
      })
      const params = this.getParams()
      this.loading = true
      getAction(this.url.list, params).then(res => {
        if (res.code === 0) {
          this.dataSource = this.dataSource.concat(res.data.list)
          this.ipage.loadOver = res.data.list.length < res.data.pageSize
        }
        this.loading = false
        Taro.hideLoading()
      })
    }
  },
  onReachBottom () { // 下拉加载列表
    console.log('onReachBottom')
    if (!this.ipage.loadOver) {
      this.ipage.current += 1
      this.getListData()
    }
  }
}

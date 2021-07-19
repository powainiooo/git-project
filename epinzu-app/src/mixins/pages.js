import Taro from '@tarojs/taro'
import { getAction } from '@/utils/api'

export const pageMixin = {
  computed: {
    lnglat () {
      return this.$store.state.lnglat
    },
    isLogin () {
      return this.$store.state.isLogin
    }
  },
  watch: {
    lnglat: {
      handler (val) {
        if (this.queryParams.lng !== undefined) {
          this.queryParams.lat = val.lat
          this.queryParams.lng = val.lng
        }
      },
      immediate: true
    }
  },
  data () {
    return {
      imgSrc: Taro.imgSrc,
      queryParams: {},
      ipage: {
        current: 1,
        loadOver: false
      },
      loading: false,
      dataSource: []
    }
  },
  mounted () {
    if(!this.disableMixinCreated){
      console.log(' -- mixin mounted -- ')
      this.$nextTick(() => { // 为了兼容onLoad时设置的参数
        this.getListData()
      })
    }
  },
  methods: {
    getParams () {
      const params = Object.assign({}, this.queryParams)
      params.page = this.ipage.current
      return params
    },
    getListData () {
      console.log('getListData')
      Taro.showLoading({
        title: '加载中'
      })
      const params = this.getParams()
      this.loading = true
      console.log('this.url.list', this.url.list)
      getAction(this.url.list, params).then(res => {
        if (res.code === 0) {
          this.dataSource = this.dataSource.concat(res.data.list)
          this.ipage.loadOver = res.data.list.length < res.data.pageSize

          if (typeof this.afterGetList === 'function') {
            this.afterGetList()
          }
        }
        this.loading = false
        Taro.hideLoading()
        console.log('end')
      })
    },
    resetLoad () {
      this.ipage.current = 1
      this.ipage.loadOver = false
      this.dataSource = []
      this.getListData()
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

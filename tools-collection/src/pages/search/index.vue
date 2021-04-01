<style scoped>
.title { font-size: 32px; color: #2C2C2C; }

.list { display: flex; margin: 0 -27px; flex-wrap: wrap; }
.list .tool-item { width: 110px; margin: 0 30px 40px 30px; }
.btn-close { width: 20px; position: absolute; top: -8px; right: 40px; }
</style>

<template>
  <div class="container">
    <div class="hr20"></div>
    <div class="mt20 mb80">
      <c-search />
    </div>

    <div class="between mb60 ml50 mr60">
      <div class="title acenter">
        <img src="/static/images/clock.png" mode="widthFix" class="w32 mr15" />
        <span>搜索历史</span>
      </div>
      <img src="/static/images/trash.png" mode="widthFix" class="w24" />
    </div>

    <div class="tool-list">
      <div class="pr">
        <a href="#" class="tool-item">
          <img src="/static/images/img/icon1.png" mode="aspectFill" />
          <div>汇率转换</div>
        </a>
        <img src="/static/images/x.png" mode="widthFix" class="btn-close" />
      </div>
      <div class="pr">
        <a href="#" class="tool-item">
          <img src="/static/images/img/icon1.png" mode="aspectFill" />
          <div>汇率转换</div>
        </a>
        <img src="/static/images/x.png" mode="widthFix" class="btn-close" />
      </div>
      <div class="pr">
        <a href="#" class="tool-item">
          <img src="/static/images/img/icon1.png" mode="aspectFill" />
          <div>汇率转换</div>
        </a>
        <img src="/static/images/x.png" mode="widthFix" class="btn-close" />
      </div>
      <div class="pr">
        <a href="#" class="tool-item">
          <img src="/static/images/img/icon1.png" mode="aspectFill" />
          <div>汇率转换</div>
        </a>
        <img src="/static/images/x.png" mode="widthFix" class="btn-close" />
      </div>
    </div>

    <div class="title acenter mt90 mb60 ml50">
      <img src="/static/images/remen.png" mode="widthFix" class="w28 mr20" />
      <span>热门搜索</span>
    </div>

    <div class="tool-list">
      <a href="#" class="tool-item">
        <img src="/static/images/img/icon1.png" mode="aspectFill" />
        <div>汇率转换</div>
      </a>
      <a href="#" class="tool-item">
        <img src="/static/images/img/icon1.png" mode="aspectFill" />
        <div>汇率转换</div>
      </a>
      <a href="#" class="tool-item">
        <img src="/static/images/img/icon1.png" mode="aspectFill" />
        <div>汇率转换</div>
      </a>
      <a href="#" class="tool-item">
        <img src="/static/images/img/icon1.png" mode="aspectFill" />
        <div>汇率转换</div>
      </a>
    </div>

    <c-footer :current="2" />
  </div>
</template>

<script>
import cFooter from '@/components/footer1'
import cSearch from '@/components/search'

export default {
  components: {
    cFooter,
    cSearch
  },

  data () {
    return {}
  },

  created () {}
}
</script>

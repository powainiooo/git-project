<style lang="stylus" type="text/stylus" scoped>
@import "../../assets/css/global.styl"
.c-infos
  padding 128px 20px 80px 20px
.c-infos-titles
  between()
  border-bottom 1px solid #EEEEEF
  padding-bottom 20px
  .l
    height 26px
    font-size 18px
    line-height 26px
    position relative
    padding-left 38px
    color #000000
    img
      width auto
      height 26px
      abTL(0, 10px)
  .ivu-btn
    width 90px
    margin-right 20px
.c-infos-line1
  margin 20px 25px 60px 25px
  display flex
  justify-content space-between
  flex-wrap wrap
.c-infos-ticket
  .thead
    between()
    margin 12px 36px 30px 30px
    li
      color #C8C9CA
  .tr
    between()
    margin 0 20px 30px 20px
    .names
      size(200px, 40px)
      background-color #EEEEEF
      border-radius 10px
      padding 0 5px 0 10px
      between()
      div
        size(65px, 30px)
        background-color #ffffff
        border-radius 6px
        padding 0 5px
        color #9E9E9F
        span
          color #C8C9CA
      h3
        color #6D9BF5
        font-size 16px
    .nums
      color #6D9BF5
      font-family HelveB
      font-size 36px
.c-infos-qrcode
  width 430px
  margin 50px auto 0 auto
  between()
  .item
    width 150px
    text-align center
    button
      width 90px
    .imgs
      size(130px, 130px)
      border-radius 8px
      center()
      background #D8D8D8 linear-gradient(150deg, #FFFFFF 0%, #F2F2F2 100%)
      margin-bottom 30px
    .wxcode
      size(150px, 150px)
      border-radius 50%
      margin-bottom 20px
</style>

<template>
<div class="c-infos">
  <div class="c-infos-titles">
    <div class="l">
      <img :src="getIndexSrc(1)" />
      <span>活动基本信息</span>
    </div>
  </div>
  <div class="c-infos-line1">
    <tag-line>
      <span slot="title">开票时间</span>
      <div class="between" style="color: #C8C9CA">
        <span>2020/10/20</span>
        <span>16:30</span>
      </div>
    </tag-line>
    <tag-line>
      <span slot="title">停票时间</span>
      <div class="between" style="color: #C8C9CA">
        <span>2020/10/20</span>
        <span>16:30</span>
      </div>
    </tag-line>
    <tag-line class="mt10">
      <span slot="title">音乐类型</span>
      <div class="between" style="color: #C8C9CA">Trap</div>
    </tag-line>
  </div>

  <div class="c-infos-titles">
    <div class="l">
      <img :src="getIndexSrc(2)" />
      <span>票务基本信息</span>
    </div>
    <Button size="small">订单详情</Button>
  </div>

  <div class="c-infos-ticket">
    <ul class="thead">
      <li>票种</li>
      <li>数量（张）</li>
      <li>已售（张）</li>
      <li>销售状态</li>
    </ul>
    <div class="tr">
      <div class="names">
        <h3>早鸟票</h3>
        <div class="between">
          <span>300</span>张
        </div>
      </div>
      <div class="nums">100</div>
      <t-switch true-value="1" false-value="0">
        <span slot="open">已售罄</span>
        <span slot="close">销售中</span>
      </t-switch>
    </div>
    <div class="tr">
      <div class="names">
        <h3>早鸟票</h3>
        <div class="between">
          <span>300</span>张
        </div>
      </div>
      <div class="nums">68</div>
      <t-switch true-value="1" false-value="0">
        <span slot="open">已售罄</span>
        <span slot="close">销售中</span>
      </t-switch>
    </div>
    <div class="tr">
      <div class="names">
        <h3>早鸟票</h3>
        <div class="between">
          <span>300</span>张
        </div>
      </div>
      <div class="nums">0</div>
      <t-switch true-value="1" false-value="0">
        <span slot="open">已售罄</span>
        <span slot="close">销售中</span>
      </t-switch>
    </div>
  </div>

  <div class="c-infos-titles">
    <div class="l">
      <img :src="getIndexSrc(3)" />
      <span>链接码 及 验票码</span>
    </div>
    <Button size="small">验票流程</Button>
  </div>

  <div class="c-infos-qrcode">
    <div class="item">
      <div class="imgs wxcode">
        <img src="@/assets/img/qrcode.png" width="128" />
      </div>
      <Button size="small">下载链接码</Button>
    </div>
    <div class="item">
      <div class="imgs">
        <img src="@/assets/img/qrcode.png" width="128" />
      </div>
      <Button size="small">下载链接码</Button>
    </div>
  </div>
</div>
</template>

<script type='es6'>
import tagLine from '@/components/tagLine'
import TSwitch from '@/components/TSwitch'
export default {
  name: 'app',
  components: {
    tagLine,
    TSwitch
  },
  data () {
    return {}
  },
  methods: {
    getIndexSrc (index) {
      return require('@/assets/img/nums/' + index + '.png')
    }
  }
}
</script>

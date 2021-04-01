<style scoped>
.bg { width: 100%; display: block; }
.top { width: 100%; height: 330px; position: absolute; top: 0; left: 0; display: flex; flex-direction: column; justify-content: center; align-items: center; }
.top .avatar { width: 108px; height: 108px; border-radius: 50%; margin-bottom: 25px; }
.top .name { font-size: 32px; color: #FFFFFF;  }

.list { background-color: #FFFFFF; padding-left: 34px; padding-right: 48px; padding-top: 40px; }
.list a { height: 100px; display: flex; align-items: center; justify-content: space-between; position: relative; }
.list a:after { content: ''; height: 2px; position: absolute; left: 8px; right: 0; bottom: 0; background-color: #E9E9E9; transform: scaleY(.5); }
.list a div { font-size: 26px; display: flex; align-items: center; }
.list a div img { width: 46px; height: 46px; margin-right: 28px; }
.list a .arrow { width: 12px; }
</style>

<template>
  <div class="mh100 b-f8">
    <img src="/static/images/bg.png" mode="widthFix" class="bg" />
    <div class="top">
      <img src="/static/images/avatar.png" class="avatar" />
      <view class="name">用户名</view>
    </div>
    <div class="list">
      <a href="#">
        <div>
          <img src="/static/images/mine/icon1.png" mode="aspectFill" />
          <span>我的收藏</span>
        </div>
        <img src="/static/images/arrow1.png" class="arrow" mode="widthFix" />
      </a>
      <a href="#">
        <div>
          <img src="/static/images/mine/icon2.png" mode="aspectFill" />
          <span>我的足迹</span>
        </div>
        <img src="/static/images/arrow1.png" class="arrow" mode="widthFix" />
      </a>
      <a href="#">
        <div>
          <img src="/static/images/mine/icon3.png" mode="aspectFill" />
          <span>打赏记录</span>
        </div>
        <img src="/static/images/arrow1.png" class="arrow" mode="widthFix" />
      </a>
      <a href="#">
        <div>
          <img src="/static/images/mine/icon4.png" mode="aspectFill" />
          <span>友情链接</span>
        </div>
        <img src="/static/images/arrow1.png" class="arrow" mode="widthFix" />
      </a>
      <a href="#">
        <div>
          <img src="/static/images/mine/icon5.png" mode="aspectFill" />
          <span>意见反馈</span>
        </div>
        <img src="/static/images/arrow1.png" class="arrow" mode="widthFix" />
      </a>
    </div>


    <c-footer :current="3" />
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

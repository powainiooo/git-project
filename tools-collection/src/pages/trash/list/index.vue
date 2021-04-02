<style scoped>
.trash-list { background-color: #FFFFFF; }
.trash-list .item { display: flex; align-items: center; height: 100px; font-size: 32px; }
.trash-list .item img { width: 38px; margin: 0 42px; }
.trash-list .detail { padding: 20px 40px 20px 120px; }
.trash-list .detail span { padding: 20px 16px; border: 2px dashed #436CB3; border-radius: 4px; font-size: 26px; line-height: 26px; display: inline-block; }
.trash-list .detail p { font-size: 22px; margin-top: 22px; }
</style>

<template>
  <div class="container3">
    <div class="hr20"></div>
    <ul class="trash-list borderT">
      <li>
        <div class="item borderB">
          <img src="/static/images/trash/icon.png" mode="widthFix" />
          <span>键盘</span>
        </div>
        <div class="detail borderB">
          <span>键盘 属于 可回收物</span>
          <p>“针对于无线安装电池的键盘，需要将电池取出，单独丢在有害垃圾中。”</p>
        </div>
      </li>
      <li>
        <div class="item borderB">
          <img src="/static/images/trash/icon.png" mode="widthFix" />
          <span>键盘</span>
        </div>
      </li>
      <li>
        <div class="item borderB">
          <img src="/static/images/trash/icon.png" mode="widthFix" />
          <span>键盘</span>
        </div>
      </li>
    </ul>
    <operates />
  </div>
</template>

<script>
import operates from '@/components/operates'

export default {
  components: {
    operates
  },
  data () {
    return {}
  },

  created () {
  }
}
</script>

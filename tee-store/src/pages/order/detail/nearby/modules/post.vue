<style scoped>
.post-container .top-line { padding: 40px 34px 50px 34px; box-shadow: 0px 3px 20px 0px rgba(0, 0, 0, 0.08); }
.post-container .top-line .btn { margin: 50px 0 0 50px; }
.post-container .list { margin: 50px 40px; }
.post-container .list:before { top: 14px; }
.post-container .list li { margin-left: 18px; margin-bottom: 50px; position: relative; }
.post-container .list li:before { content: ''; width: 10px; height: 10px; border-radius: 50%; background-color: #B9BABB; position: absolute; top: 14px; left: -20px; }
.post-container .list li:first-child:before { background-color: #F0916C; }
.post-container .list li div { font-size: 24px; color: #B9BABB; }
.post-container .list li:first-child div { color: #41372D; }
.post-container .list li p { font-size: 20px; line-height: 26px; color: #9E9E9F; }
</style>

<template>
<div class="c-drawer" v-if="visible">
  <div class="c-drawer-cover" :class="{'c-drawer-cover-show': showItem}" @animationend="animationend"></div>
  <div class="c-drawer-box ovh post-container" :class="{'c-drawer-show': showItem}">
    <div class="btn-circle c-drawer-close" @click="hide"><img src="/static/images/x2.png" /></div>

    <div class="bg-fff top-line">
      <div class="mb50" style="margin-right: 160rpx;">
        <p class="form-title ml15 c-9e">快递公司</p>
        <div class="form-line">
          <div class="form-item">
            <input value="圆通快递" disabled />
          </div>
        </div>
      </div>
      <div class="flex">
        <div style="flex: 1;">
          <p class="form-title ml15 c-9e">联系电话</p>
          <div class="form-line">
            <div class="form-item">
              <input value="19893998969" class="large" disabled />
            </div>
          </div>
        </div>
        <button class="btn btn-style1">复制单号</button>
      </div>
    </div>

    <ul class="list borderL">
      <li>
        <div>客户签收</div>
        <p>2021/04/01 13:10:30</p>
      </li>
      <li>
        <div>客户签收</div>
        <p>2021/04/01 13:10:30</p>
      </li>
      <li>
        <div>客户签收</div>
        <p>2021/04/01 13:10:30</p>
      </li>
      <li>
        <div>客户签收</div>
        <p>2021/04/01 13:10:30</p>
      </li>
      <li>
        <div>客户签收</div>
        <p>2021/04/01 13:10:30</p>
      </li>
      <li>
        <div>客户签收</div>
        <p>2021/04/01 13:10:30</p>
      </li>
      <li>
        <div>客户签收</div>
        <p>2021/04/01 13:10:30</p>
      </li>
    </ul>
  </div>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  data() {
    return {
      visible: false,
      showItem: false
    }
  },
  methods: {
    show () {
      this.visible = true
      this.$nextTick(() => {
        this.showItem = true
      })
    },
    hide () {
      this.showItem = false
    },
    animationend () {
      this.visible = false
    }
  }
}
</script>

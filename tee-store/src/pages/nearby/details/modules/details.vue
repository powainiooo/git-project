<style scoped>
.c-details .cates { margin: 0 40px 35px 40px; }
.c-details .cates h3 { font-size: 24px; margin: 0 0 25px 12px; }
.c-details .cates ul { display: flex; flex-wrap: wrap; }
.c-details .cates ul li { min-width: 110px; margin: 0 15px 15px 0; text-align: center; }
.c-details .footer-btns { left: -25px; right: -25px; }
</style>

<template>
<div class="c-drawer" v-if="visible">
  <div class="c-drawer-cover" :class="{'c-drawer-cover-show': showItem}" @animationend="anEnd"></div>
  <div class="c-drawer-box c-details" :class="{'c-drawer-show': showItem}">
    <div class="btn-circle c-drawer-close" @click="hide"><img src="/static/images/x2.png" /></div>
    <div class="c-drawer-scroll">
      <div class="nearby-goods-detail">
        <img src="/static/images/img.jpg" mode="aspectFill" class="bg" />
        <div class="between">
          <div class="title">时空穿越小熊飞碟款 双层玻璃杯盘组</div>
          <div class="prices">
            <p>100元</p>
            <div class="acenter">
              <img src="/static/images/jfh.png" mode="widthFix" />
              <div><span>90</span>元</div>
            </div>
          </div>
        </div>
        <div class="flex mt30 ml35">
          <div class="tags">满400包邮</div>
          <div class="tags">预计3天发货</div>
        </div>
      </div>
      <div class="borderB mb40 mt20 ml35 mr35 hr"></div>

      <div class="cates">
        <h3>温度</h3>
        <ul>
          <li class="btn btn-style1">冰</li>
          <li class="btn btn-style2">温</li>
          <li class="btn btn-style2">烫</li>
        </ul>
      </div>
      <div class="cates">
        <h3>温度</h3>
        <ul>
          <li class="btn btn-style1">冰</li>
          <li class="btn btn-style2">温</li>
          <li class="btn btn-style2">烫</li>
        </ul>
      </div>
    </div>

    <div class="footer-btns">
      <div class="l center">
        <div class="nums"><span>50</span>杯</div>
      </div>
      <div class="r">
        <button>确定</button>
      </div>
    </div>
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
      setTimeout(() => {
        this.visible = false
      }, 500)
    }
  }
}
</script>

<style>
.c-header { width: 100%; height: 180px; position: fixed; top: 0; left: 0; z-index: 1000;}
.c-header .navs { width: 100%; height: 100%; box-sizing: border-box; display: flex; justify-content: space-between; align-items: center; padding: 0 45px 0 66px; position: relative; z-index: 100; background-color: var(--mainColor); }
.c-header .navs .logo { width: 75px; }
.c-header .navs button { width: 68px; height: 68px; border: none; background-color: transparent; display: flex; justify-content: center; align-items: center; margin: 0; padding: 0;}
.c-header .navs button .menu { width: 68px;}
.c-header .navs button .close { width: 57px;}
.c-header .navs button .search { width: 60px;}
.c-header .navs button .cart { width: 63px;}
.c-header .navs .btns { width: 188px; display: flex; justify-content: flex-end; }
.c-header .navs .btns .br { width: 1px; height: 80px; background-color: #ffffff; transform: scaleX(.5); margin: 0 24px; }

.c-header .titles { width: 100%; height: 120px; background-color: #ffffff; display: flex; align-items: center; padding-left: 66px; font-size: 36px; color: var(--textColor); }
.c-header .titles span { margin-left: 14px; font-size: 40px;}

.c-header .menus-frame { width: 100%; height: 100vh; position: fixed; top: 0; left: 0; padding: 180px 45px 0 45px; box-sizing: border-box; background: url(data:image/png;base64,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) no-repeat; background-size: 225px; background-position: left bottom; background-color: var(--mainColor); transition: top .5s cubic-bezier(.23,.78,.33,.97); }
.c-header .menus-frame .line1 { margin: 35px 0; display: flex; align-items: center; position: relative; }
.c-header .menus-frame .avatar { width: 135px; height: 135px; margin-right: 44px; }
.c-header .menus-frame .line1 p { font-size: 36px; color: #ffffff; }
.c-header .menus-frame .line1 button { width: 60%; height: 100%; position: absolute; top: 0; left: 0; opacity: 0;}

.c-header .menus-frame .line2 { width: 100%; height: 200px; background-color: #ffffff; border-radius: 10px; box-shadow: var(--boxShadow); display: flex; position: relative; margin-bottom: 20px;}
.c-header .menus-frame .line2:after { content: ''; width: 2px; height: 146px; position: absolute; left: 50%; top: 27px; background-color: #D1CECE; transform: scaleX(.5); }
.c-header .menus-frame .line2 a { flex: 1; display: flex; align-items: center; flex-direction: column; justify-content: center; font-size: 30px; color: var(--textColor); text-align: center; text-shadow: var(--textShadow); }
.c-header .menus-frame .line2 a div { font-family: Helve;}

.c-header .menus-frame .navs-list a { height: 174px; display: flex; align-items: center; padding-left: 24px; color: #ffffff; font-size: 36px; text-shadow: var(--textShadow); position: relative;}
.c-header .menus-frame .navs-list a:after { content: ''; width: 100%; height: 2px; background-color: #CBBA9B; transform-origin: 50% 100%; transform: scaleY(.5); position: absolute; left: 0; bottom: 0;}
.c-header .menus-frame .navs-list a:before { content: ''; width: 100%; height: 2px; background-color: #ffffff; transform-origin: 50% 0; transform: scaleY(.5); position: absolute; left: 0; top: 0;}
.c-header .menus-frame .navs-list a:first-child:before { height: 0; }
.c-header .menus-frame .navs-list a:last-child:after { height: 0; }
.c-header .menus-frame .navs-list a span { margin-left: 14px; font-size: 40px; font-family: Helve;}

.c-header .search-frame { width: 100%; height: 120px; background-color: #ffffff; display: flex; justify-content: space-between; align-items: center; padding: 0 45px 0 66px; position: absolute; top: 180px; left: 0; box-sizing: border-box; transition: top .5s cubic-bezier(.23,.78,.33,.97); }
.c-header .search-frame input { width: 400px; height: 100%; font-size: 36px; color: var(--textColor); border: none; }
.c-header .search-frame .btns { width: 188px; display: flex; justify-content: space-between; align-items: center; position: relative; }
.c-header .search-frame .btns:after { content: ''; width: 1px; height: 80px; background-color: #D1CECE; transform: scaleX(.5); position: absolute; top: 50%; left: 50%; margin-top: -40px; }
.c-header .search-frame .btns img:first-child { width: 66px; height: 50px; }
.c-header .search-frame .btns img:nth-child(2) { width: 52px; height: 52px; }
</style>

<template>
<div class="c-header">
   <div class="navs">
      <img src="/static/images/header/logo@2x.png" mode="widthFix" class="logo" />
      <button plain v-if="menu" @click="showMenu = !showMenu">
         <img src="/static/images/header/close.png" mode="widthFix" class="close" v-if="showMenu" />
         <img src="/static/images/header/menu.png" mode="widthFix" class="menu" v-else />
      </button>
      <div class="btns">
         <button style="align-items: flex-end" v-if="searchBtn && !showSearchFrame" @click="showSearchFrame = true">
            <img src="/static/images/header/search.png" mode="widthFix" class="search" />
         </button>
         <div class="br" v-if="searchBtn && !showSearchFrame"></div>
         <button v-if="cartBtn">
            <img src="/static/images/header/cart.png" mode="widthFix" class="cart" />
         </button>
      </div>
   </div>

   <div class="titles" v-if="title !== ''" :style="{'background-color': titleColor}">{{titleArr[0]}}<span>| {{titleArr[1]}}</span></div>

   <div class="search-frame" :style="{top: showSearchFrame ? '180rpx' : '0'}">
      <input v-model="keyword" placeholder="输入搜索内容" />
      <div class="btns">
         <img src="/static/images/header/search2.png" @click="handleSearch" />
         <img src="/static/images/header/close2.png" @click="showSearchFrame = false" />
      </div>
   </div>

   <div class="menus-frame" :style="{top: showMenu ? 0 : '-100vh'}">
      <div class="line1">
         <img src="/static/images/header/avatar.png" class="avatar" />
         <p>请点击登录</p>
         <button>获取用户信息</button>
      </div>
      <div class="line2">
         <a href="#" hover-class="none">
            <p>已订购猫盒</p>
            <div>Booked cat box</div>
         </a>
         <a href="#" hover-class="none">
            <p>已订购产品</p>
            <div>Booked products</div>
         </a>
      </div>
      <div class="navs-list">
         <a href="#" hover-class="none">我的自定义猫盒<span>| My cat box</span></a>
         <a href="#" hover-class="none">联系客服<span>| Question contact</span></a>
      </div>
   </div>
</div>
</template>

<script type='es6'>
export default {
   name: 'app',
   props: {
      menu: {
         type: Boolean,
         default: false
      },
      searchBtn: {
         type: Boolean,
         default: false
      },
      cartBtn: {
         type: Boolean,
         default: false
      },
      title: {
         type: String,
         default: ''
      },
      titleColor: {
         type: String,
         default: '#ffffff'
      }
   },
   data () {
      return {
         showMenu: false,
         showSearchFrame: false,
         keyword: ''
      }
   },
   computed: {
      titleArr () {
         return this.title.split('|')
      }
   },
   methods: {
      handleSearch () {
         this.$emit('search', this.keyword)
      }
   }
}
</script>

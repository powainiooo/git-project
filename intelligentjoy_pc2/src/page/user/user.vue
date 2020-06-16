<template lang="html">
  <div class="user centerBox">
    <ul class="nav">
      <li>
        <router-link :to="{ name: 'myCourse', params: {} }" :class="active=='myCourse'?'userActive':''" @click="active='myCourse'" >
          <span>
            {{$t("tabBar.2")}}
          </span>
          <img src="./images/arrow@2x.png" alt="" v-if="active=='myCourse'" >
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'myOrder', params: {} }" :class="active=='myOrder'?'userActive':''" @click="active='myOrder'">
          <span>
            {{$t("tabBar.3")}}
          </span>
          <img src="./images/arrow@2x.png" alt="" v-if="active=='myOrder'">

        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'coupons', params: {} }" :class="active=='coupons'?'userActive':''" @click="active='coupons'">
          <span>
            {{$t("tabBar.4")}}
          </span>
          <img src="./images/arrow@2x.png" alt="" v-if="active=='coupons'">

        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'userCenter', params: {} }" :class="active=='userCenter'?'userActive':''" @click="active='userCenter'">
          <span>
            {{$t("tabBar.1")}}
          </span>
          <img src="./images/arrow@2x.png" alt="" v-if="active=='userCenter'">

        </router-link>
      </li>
    </ul>
    <router-view class="rightBox"></router-view>
  </div>
</template>

<script>
export default {
  name:'user',
  data(){
    return{
      active:'myCourse'
    }
  },
  mounted(){
    this.active = this.$route.name
  },
  watch:{
    $route(val){
      // console.log(val)
      this.active = val.name
    }
  }
}
</script>

<style lang="less">
.user {
  display: flex;
  justify-content: space-between;
  display: flex;
  padding-top: 45px;
  .nav {
      // width: 200px;
      background-color: #fff;
      height: 240px;
    li {
      display: flex;
      background-color: #fff;
      a {
        width: 200px;
        height: 60px;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-left: 30px;
        padding-right: 16px;
        span {
          font-size: 16px;
          color: #333333;
        }
        img {
          width: 17px;
        }
        &:hover {
          background-color: RGB(99, 172, 255);
          span {
            color: #FEFEFE;
          }
        }
      }

      .userActive {
        background-color: RGB(99, 172, 255);
        span {
          color: #FEFEFE;
        }
      }
    }
    li+li {
      border-top: 1px solid #F2F2F2;
    }
  }
  .rightBox {
    width: 980px;
    background-color: #fff;
  }
}
</style>

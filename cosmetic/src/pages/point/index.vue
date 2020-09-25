<style>
page { background-color: rgb(248, 248, 248)}
.banner { position: relative;}
.banner img { width: 100%; height: 405px;}
.banner div { width: 100%; text-align: center; position: absolute; top: 100px; left: 0;}
.banner div h3 { font-size: 72px; line-height: 1; color: #ffffff;}
.banner div p { font-size: 28px; line-height: 1; color: #ffffff; margin-top: 28px;}

.tabs { height: 88px; display: flex; justify-content: space-around; background-color: #ffffff; margin-bottom: 10px;}
.tabs li { height: 100%; display: flex; align-items: center; position: relative; font-size: 28px; color: #666666;}
.tabs li.active { color: #333333; font-weight: bold;}
.tabs li.active:after { content: ''; height: 4px; position: absolute; left: 8px; right: 8px; bottom: 0; background-color: #333333;}

.list-item { width: 100%; height: 138px; background-color: #ffffff; display: flex; justify-content: space-between; align-items: center; margin-bottom: 3px;}
.list-item .left { display: flex; align-items: center;}
.list-item img { width: 78px; height: 78px; margin: 0 32px 0 20px;}
.list-item h3 { font-size: 30px; color: #000000; line-height: 1; margin-bottom: 20px;}
.list-item p { font-size: 24px; color: #999999; line-height: 1; }
.list-item .vals { font-size: 36px; color: #000000; margin-right: 38px;}
</style>

<template>
<div>
   <div class="banner">
      <img src="/static/images/point/banner.png" />
      <div>
         <h3>2256</h3>
         <p>您共有2256积分，可以抵扣225元</p>
      </div>
   </div>
   <ul class="tabs">
      <li v-for="item in tabsList" :class="{active: currentTab === item.key}" :key="item">{{item.name}}</li>
   </ul>
   <div class="list-item">
      <div class="left">
         <img src="/static/images/point/icon1.png" />
         <div>
            <h3>购物获得</h3>
            <p>2020-08-06  18:52:23</p>
         </div>
      </div>
      <div class="vals">+30</div>
   </div>
   <div class="list-item">
      <div class="left">
         <img src="/static/images/point/icon1.png" />
         <div>
            <h3>购物获得</h3>
            <p>2020-08-06  18:52:23</p>
         </div>
      </div>
      <div class="vals">+30</div>
   </div>
   <div class="list-item">
      <div class="left">
         <img src="/static/images/point/icon1.png" />
         <div>
            <h3>购物获得</h3>
            <p>2020-08-06  18:52:23</p>
         </div>
      </div>
      <div class="vals">+30</div>
   </div>
</div>
</template>

<script>

export default {
   data () {
      return {
         currentTab: '1',
         tabsList: [
            { name: '积分明细', key: '1' },
            { name: '总积分', key: '2' }
         ]
      }
   },

   methods: {
   },

   created () {
      // let app = getApp()
   }
}
</script>

<style>
.tabs { display: flex;}
.tabs li { width: 50%; height: 158px; background-color: #eeeeee; box-shadow: 1px 2px 6px 0 rgba(0, 0, 0, 0.05); display: flex; justify-content: center; align-items: center; font-size: 36px; color: #343434;}
.tabs li.active { background-color: #ffffff; position: relative;}
.tabs li.active:before { content: ''; width: 100%; height: 30px; background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAA6CAYAAADvLdzaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3RUE5RDkzQ0ZBNzAxMUVBOURENkRDREI5RDQwNEY3OCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo3RUE5RDkzREZBNzAxMUVBOURENkRDREI5RDQwNEY3OCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjdFQTlEOTNBRkE3MDExRUE5REQ2RENEQjlENDA0Rjc4IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjdFQTlEOTNCRkE3MDExRUE5REQ2RENEQjlENDA0Rjc4Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+3lDRRgAABNhJREFUeNrs3V9v21QcBuDjJHQgbYg/Ep+BO3aDBJ99Y8DNYOJiDEZBQgIk4IaxMbaq3VYRc45yrLrGiZPUSW36PNKvbWqvatzJfvP2JJ2FEO7G+TgAAABD9cUkvpk5DgAAMGizFNyPHAcAABi0o4ljAAAAwye4AwCA4A4AAAjuAABwhYJ74TAAAMCgFRp3AAAYAcEdAAAEdwAAQHAHAADBHQAAENwBAADBHQAABHcAAEBwBwAABHcAABhlcL/uMAAAwKBdT8H91HEAAIBBO53FN/fivKx9snBcAHo3z+fXN+K8G+e9OG+O/D49i/Mozp9xTvJ9nPpRA/SmrH38dbqIfBjnrXC23l1wB+hH/Xx6ms+zKbB/EOejODfDeJcrHsV5EOfLdDGJ80ecf+IcLLngALB9cE/FyNPUuH/lmADszdtxfo/zIofc98P4mvfUtP8Q57M4d+Lcj/OXHy3AbvmVJsB+vcjB9zgsmpS0dOadcL6pHrLUtH+TA/vtsGjdhXaAPZjlqVv2EpGW0ABspmi5/SrO33Ee1raPpXlvNu0P832Z5vvQXBpjqQzAepadL+f1G9PahUMwB9jPyTnNcQ7CR2EczXu1pv2TsGjav43zJG+b5BHcAfoN7ue2T8N/n5RaNL6AQA/Qn3TOTb/pTE/kTMtmnucQn861qXG/EefawL7n9ADj+xza7+TQXi2PudZy3RDcAS4W4Fvz97RlQ+lkC7AzzZB7nMP7UJv3tqb9ce1ByGTFtcO1BGC74N48p5bN4F50XGQA2C6kN28XYXXznlr31L5fdvOemvbDsGjZ25r2iYAOsD+zsOaaGgA21gy2kyX7pCcfpRb7QQ7ySXoS680c4i/D8/z9fB7nVlg8EfVJ7UFHvQ2qv85w/QHK3H8BgF6s3bgDsP2Jtgznl8eULWF+1Zr3y2je11nTXrZMaLmfAPRkKrADDCrkn4T2V5vZV3ivmvauV49pexASltwGQHAHGIVVa92r90No3ruadmvaAS45uAMwHPXmPf1xo6P8+V037/Wm/VYjtHc17Rp3AMEd4H9hncY91EJys3k/Cbtt3lc17Qdh+eu0AyC4A1yJAN+1T5nD+y6b966mfdUTazXtAII7wJUI7sWK9/to3jXtAII7ABsE+K59dtG8a9oBBHcANgzu+27eNe0AgjsAFwjwXfv00bxr2gEEdwAuGNy3bd5vhPWad007gOAOQI8BvmufbZp3TTuA4A5Az8F90+a9/hdWU/v+euPrpYB/GBYtu6YdQHAHoOcA37VP1bw/ywE+aTbvVdOeArumHUBwB2AHwX2T5j2F9+P8uWq9e7r9Y5xP49wOmnYAwR2AnQb4ZfsU4awpr9a8v8zb0+1f49zLwf1+nKd5m6YdYIRmDgHAKFVheprP5a9yMD/MwfyXvP3nON/VQvvBioAOwIBp3AGGq6t5L1s+To17at5/i/NTWLTuaXnMPJwtsan217QDjIjGHWDc6s17kQP64ziP8uerZTGvNcI6ACOjcQcYvk3WvM/z1IN9W9Pe1tYvuw2A4A7AFsG96/akMV49BkBwB+ASA3xTuea2cot/D4DgDsAFg3vh0AAI7gCML8ivS8MOILgDMILgDoDgDsCAA7ymHUBwB2AEwR2AMZ7sy1LxAgAAQ/evAAMASqCDq4on+TMAAAAASUVORK5CYII=) no-repeat; background-size: 100% 100%; position: absolute; top: -1px; left: 0;}
</style>

<template>
<div >
   <img :src="imgSrc + detailData.image" mode="widthFix" class="img_block"/>

   <ul class="tabs">
      <li :class="{active: tabKey === '1'}" @click="tabKey = '1'">新友入门</li>
      <li :class="{active: tabKey === '2'}" @click="tabKey = '2'">进阶指南</li>
   </ul>

   <div v-show="tabKey === '1'">
      <img :src="imgSrc + detailData.xy_1" mode="widthFix" class="img_block" style="margin-bottom: 30rpx;"/>
      <c-goods-swiper :list="detailData.xy_goods" height="750rpx" showBtns/>
      <img :src="imgSrc + detailData.xy_2" mode="widthFix" class="img_block" style="margin-bottom: 60rpx;"/>
   </div>

   <div v-show="tabKey === '2'">
      <img :src="imgSrc + detailData.zn_1" mode="widthFix" class="img_block" style="margin-bottom: 30rpx;"/>
      <c-goods-swiper :list="detailData.zn_goods" height="750rpx" showBtns/>
      <img :src="imgSrc + detailData.zn_2" mode="widthFix" class="img_block"/>
   </div>

</div>
</template>

<script>
import cGoodsSwiper from '@/components/goodsSwiper'
import { getAction } from '@/utils/api'

export default {
   components: { cGoodsSwiper },
   data () {
      return {
         imgSrc: mpvue.imgSrc,
         tabKey: '1',
         detailData: {
            xy_goods: [],
            zn_goods: []
         }
      }
   },

   methods: {
      getData () {
         getAction('ads_info').then(res => {
            // console.log(res)
            this.detailData = res.data
         })
      }
   },

   onLoad () {
      // let app = getApp()
      Object.assign(this.$data, this.$options.data())
      this.getData()
   }
}
</script>

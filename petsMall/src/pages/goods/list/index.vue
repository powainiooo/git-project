<style>
page { background-color: #F3F2F1; }
.container { padding-top: 420px;}
.tabs { width: 265px; position: absolute; top: 340px; background-color: #e7e6e4; border-radius: 20px 20px 0 0;}
.tabs-active { background-color: #ffffff; z-index: 10; }
.tabs img { width: 265px; height: 80px; display: block; }
.tabs-dog { left: 96px;}
.tabs-cat { right: 96px;}

.list-container { background-color: #ffffff; display: flex; flex-wrap: wrap; position: relative; padding: 52px 45px 0 45px; box-shadow: 0 0 25px rgba(0, 0, 0, .1); }
.list-container:after { content: ''; width: 1px; position: absolute; top: 52px; left: 50%; bottom: 0; background-color: #D1CECE; transform: scaleX(.5); }
.list-container .grid:nth-child(2n) { display: flex; justify-content: flex-end; }
.list-container .grid { flex: 1; position: relative; }
.list-container .grid:before { content: ''; width: 100%; height: 1px; position: absolute; top: 0; left: 0; background-color: #D1CECE; transform: scaleY(.5); }
.list-container .grid:first-child:before { height: 0; }
.list-container .grid:nth-child(2):before { height: 0; }
</style>

<template>
<div class="container">
   <c-header title="主粮|Staple food" searchBtn cartBtn />

   <template v-if="!showResult">
   <div class="tabs tabs-dog" :class="{'tabs-active': tabs === 'dog'}">
      <img src="/static/images/goods/dog-active.png" v-if="tabs === 'dog'" />
      <img src="/static/images/goods/dog.png" v-else />
   </div>
   <div class="tabs tabs-cat" :class="{'tabs-active': tabs === 'cat'}">
      <img src="/static/images/goods/cat-active.png" v-if="tabs === 'cat'" />
      <img src="/static/images/goods/cat.png" v-else />
   </div>
   <div class="list-container">
      <div class="grid"><list-item /></div>
      <div class="grid"><list-item /></div>
      <div class="grid"><list-item /></div>
      <div class="grid"><list-item /></div>
      <div class="grid"><list-item /></div>
   </div>
   </template>

</div>
</template>

<script>
import cHeader from '@/components/header'
import listItem from './modules/listItem'

export default {
   components: {
      cHeader,
      listItem
   },
   data () {
      return {
         tabs: 'dog',
         showResult: false
      }
   },

   created () {
   }
}
</script>

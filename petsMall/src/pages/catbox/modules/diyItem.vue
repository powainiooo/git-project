<style>
.c-diy-item { width: 100%; height: 385px; display: flex; align-items: center; }
.c-diy-item .img { width: 265px; height: 385px;  }
.c-diy-item .infos { height: 90%; }
.c-diy-item .infos div:first-child { height: 240px; display: flex; flex-direction: column; justify-content: center; }
.c-diy-item .infos h3 { font-size: 30px; color: var(--textColor2); text-shadow: var(--textShadow); }
.c-diy-item .infos h3.en { font-size: 34px; font-family: HelveThin; margin-top: 20px; }
.c-diy-item .infos ul { display: flex; margin-bottom: 32px; margin-top: 10px; }
.c-diy-item .infos ul li { text-shadow: none; border: 1px solid var(--mainColor); padding: 5px 8px; color: #A6A5A5; font-size: 20px; margin-right: 8px; line-height: 1; border-radius: 8px; }
.c-diy-item .infos p { width: 330px; height: 66px; font-size: 18px; line-height: 26px; color: var(--textColor); text-shadow: var(--textShadow); margin-bottom: 28px; text-overflow: ellipsis; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; }
.c-diy-item .infos div { font-size: 20px; color: var(--textColor); text-shadow: var(--textShadow); }
.c-diy-item .infos div span { font-size: 66px; font-family: HelveThin; }
.c-diy-item .add { width: 92px; height: 92px; position: absolute; left: 620px; bottom: 42px; }
.c-diy-item .arrow { width: 86px; height: 86px; position: absolute; right: 38px; bottom: 45px; }
.c-diy-item .radio { width: 70px; height: 70px; position: absolute; right: 65px; bottom: 54px; }
.c-diy-item .radio-select { width: 74px; height: 70px; position: absolute; right: 61px; bottom: 54px; }
.c-diy-item .title { width: 340px; height: 66px; position: absolute; top: 0; left: 0; }
.c-diy-item .title div {  width: 100%; height: 100%; display: flex; align-items: center;font-size: 30px; color: #ffffff; font-family: HelveThin; text-shadow: var(--textShadow); position: relative; z-index: 2; padding-left: 38px; }
.c-diy-item .title:after { content: ''; width: 100%; height: 100%; transform: skewX(-20deg); background-color: #D9C39F; position: absolute; top: 0; left: -40px; }
</style>

<template>
<div class="c-diy-item borderB"
     @click="$emit('click', itemData)"
     hover-class="hscale"
     hover-stay-time="10">
   <img :src="imgCover" class="img" />
   <div class="infos">
      <div>
         <h3 class="en">{{itemData.english_name}}</h3>
         <h3>{{itemData.china_name}}</h3>
         <ul>
            <li>{{attrName}}</li>
            <li v-if="specsName">{{specsName}}</li>
         </ul>
         <p v-if="source === 'diy'">主要成分：{{itemData.mainly}}</p>
      </div>
      <div><span>{{itemData.price}}</span>元</div>
   </div>
   <template v-if="!useSelect">
   <img src="/static/images/catbox/icon-add.png" class="add" v-if="!showArrow" />
   <img src="/static/images/catbox/icon-arrow.png" class="arrow" v-if="showArrow" />
   </template>
   <template v-else>
   <img src="/static/images/catbox/radio-select.png" class="radio-select" v-if="selectId === itemData.id" />
   <img src="/static/images/catbox/radio.png" class="radio" v-else />
   </template>
   <div class="title" v-if="title !== ''">
      <div>{{title}}</div>
   </div>
</div>
</template>

<script type='es6'>
export default {
   name: 'app',
   props: {
      itemData: Object,
      title: {
         type: String,
         default: ''
      },
      source: {
         type: String,
         default: 'diy'
      },
      showArrow: {
         type: Boolean,
         default: false
      },
      useSelect: {
         type: Boolean,
         default: false
      },
      selectId: {
         type: Number,
         default: 0
      }
   },
   computed: {
      imgCover () {
         return this.itemData.product_img || this.itemData.cover
      },
      attrName () {
         if (this.itemData.attrs_list) {
            return this.itemData.attrs_list[0].name
         } else {
            return this.itemData.attr_name
         }
      },
      specsName () {
         if (this.itemData.attrs_list) {
            return this.itemData.attrs_list[0].child[0].specs
         } else {
            return this.itemData.specs
         }
      }
   },
   data () {
      return {}
   },
   methods: {}
}
</script>

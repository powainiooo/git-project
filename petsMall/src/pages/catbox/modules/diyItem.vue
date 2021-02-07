<style scoped>
.c-diy-item { width: 100%; height: 385px; display: flex; align-items: center; }
.c-diy-item .img { width: 265px; height: 385px;  }
.c-diy-item div h3 { font-size: 30px; color: var(--textColor2); text-shadow: var(--textShadow); }
.c-diy-item div h3.en { font-size: 34px; font-family: HelveThin; }
.c-diy-item div ul { display: flex; margin-bottom: 32px; margin-top: 10px; }
.c-diy-item div ul li { border: 1px solid var(--mainColor); padding: 5px 8px; color: #A6A5A5; font-size: 20px; margin-right: 8px; line-height: 1; }
.c-diy-item div p { height: 56px; font-size: 18px; line-height: 26px; color: var(--textColor); text-shadow: var(--textShadow); margin-bottom: 28px; }
.c-diy-item div div { font-size: 20px; color: var(--textColor); text-shadow: var(--textShadow); }
.c-diy-item div div span { font-size: 66px; font-family: HelveThin; }
.c-diy-item .radio { width: 71px; height: 71px; position: absolute; left: 610px; bottom: 52px; }
.c-diy-item .arrow { width: 86px; height: 86px; position: absolute; right: 38px; bottom: 45px; }
.c-diy-item .title { width: 340px; height: 66px; position: absolute; top: 0; left: 0; }
.c-diy-item .title div {  width: 100%; height: 100%; display: flex; align-items: center;font-size: 30px; color: #ffffff; font-family: HelveThin; text-shadow: var(--textShadow); position: relative; z-index: 2; padding-left: 38px; }
.c-diy-item .title:after { content: ''; width: 100%; height: 100%; transform: skewX(-20deg); background-color: #D9C39F; position: absolute; top: 0; left: -40px; }
</style>

<template>
<div class="c-diy-item borderB" @click="$emit('click', itemData)">
   <img src="/static/images/img4.png" class="img" />
   <div>
      <h3 class="en">ACANA® Cat food</h3>
      <h3>爱肯拿® 成猫粮</h3>
      <ul>
         <li>鱼肉味</li>
         <li>400g</li>
      </ul>
      <p v-if="source === 'diy'">主要成分：鸡肉、鸡内脏（鸡肝、鸡心）、</p>
      <div><span>78</span>元</div>
   </div>
   <img src="/static/images/catbox/radio.png" class="radio" v-if="source === 'diy'" />
   <div class="title" v-if="title !== ''">
      <div>{{title}}</div>
   </div>
   <img src="/static/images/catbox/icon-arrow.png" class="arrow" v-if="source === 'mine'" />
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
      }
   },
   data () {
      return {}
   },
   methods: {}
}
</script>

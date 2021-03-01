<style>
.c-diy-step { width: 100%; height: 150px; box-shadow: 0 10px 20px 10px rgba(0, 0, 0, 0.05); overflow: hidden; position: fixed; top: 300px; left: 0; z-index: 500 }
.c-diy-step ul { display: flex; width: 110%; height: 100%; margin-left: -5%; }
.c-diy-step li { width: 22%; position: relative; display: flex; justify-content: center; align-items: center; box-sizing: border-box; }
.c-diy-step li div { position: relative; z-index: 10; box-sizing: border-box; }
.c-diy-step li div p { font-size: 30px; color: var(--textColor2); text-shadow: var(--textShadow); text-align: center; }
.c-diy-step li div p.en { color: #362B1D; margin-bottom: 10px; font-family: HelveThin; }
.c-diy-step li:before { content: ''; width: 100%; height: 100%; background-color: #EEEBEA; position: absolute; top: 0; left: 0; transform: skewX(-18deg); }
.c-diy-step li:after { content: ''; width: 2px; height: 110%; background-color: #E6E3E1; position: absolute; top: -5%; right: 0; transform: rotateZ(18deg); transform-origin: 50% 50%; }
.c-diy-step li.pass:before { background-color: var(--mainColor); }
.c-diy-step li.pass p { color: #ffffff }
.c-diy-step li.pass p.en { color: #ffffff }
.c-diy-step li.current:before { background-color: #ffffff; }
.c-diy-step li:first-child, .c-diy-step li:last-child { width: 28%; }
.c-diy-step li:first-child div { padding-left: 40px; }
.c-diy-step li:last-child div { padding-right: 30px; }
</style>

<template>
<div class="c-diy-step">
   <ul>
      <li
         v-for="(item, index) in list"
         :class="{
         'pass': index < step,
         'current': index === step
      }"
         :key="index">
         <div @click="changeStep(index)">
            <p class="en">{{item.titleEn}}</p>
            <p>{{item.title}}</p>
         </div>
      </li>
   </ul>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
   props: {
     step: Number
   },
  data () {
    return {
       list: [
          { title: '主粮', titleEn: 'Staple food' },
          { title: '罐头', titleEn: 'Canned' },
          { title: '零食', titleEn: 'Snacks' },
          { title: '玩具', titleEn: 'Toy' }
       ]
    }
  },
  methods: {
     changeStep (index) {
        if (index < this.step) {
           this.$emit('change', index)
        }
     }
  }
}
</script>

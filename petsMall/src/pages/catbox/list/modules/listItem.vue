<style>
.c-list-item {
   width: 660px;
   height: 320px;
   background: #DDC9A8;
   box-shadow: 0 20px 50px -20px rgba(0, 0, 0, 0.2);
   border-radius: 15px;
}
.c-list-item img { width: 660px; height: 200px; display: block; }
.c-list-item .name { height: 120px; display: flex; flex-direction: column; justify-content: center; padding-left: 40px; }
.c-list-item .name p { font-size: 30px; color: #ffffff; text-shadow: var(--textShadow); }
.c-list-item .name p.en { font-size: 34px; font-family: HelveThin; }
</style>

<template>
<div class="c-list-item">
   <img src="/static/images/catbox/img.png" class="img" />
   <div class="name">
      <p class="en">Ziwipeak® Cat box</p>
      <p>滋益巅峰® 猫盒套餐</p>
   </div>
</div>
</template>

<script type='es6'>
export default {
  name: 'app',
  data () {
    return {}
  },
  methods: {}
}
</script>

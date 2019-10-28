<style scoped>
.menu-nav { margin-top: 170px}
.menu-nav li{ height: 50px; padding-left: 70px; display: flex; align-items: center; border-bottom: 1px solid #e3e3e3; font-size: 18px; color: #000000; font-weight: bold; cursor: pointer; font-family: 'Helve'; margin-bottom: 30px}
</style>

<template>
    <ul class="menu-nav">
        <li @click="$emit('toggle','baseinfo')">隶属于丨member of Ho</li>
        <li @click="$emit('toggle','baseinfo')">售后声明丨after sales</li>
        <li @click="$emit('toggle','baseinfo')">联系方式丨contact information</li>
    </ul>
</template>

<script type="es6">
export default {
   name: 'App',
   data () {
      return {

      }
   }
}

</script>

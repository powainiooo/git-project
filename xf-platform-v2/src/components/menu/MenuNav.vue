<style>
    .menu-nav li{ padding:4px 35px; border-bottom: 1px solid #dcdcdc; font-size: 16px; color: #000000; font-weight: bold; cursor: pointer; }
    .menu-nav li span{ font-size: 46px; font-family: 'Helve'; margin-right: 10px;}
</style>

<template>
    <ul class="menu-nav">
        <li @click="$emit('toggle','baseinfo')"><span>1</span>基本资料</li>
        <li @click="$emit('toggle','bankinfo')"><span>2</span>银行卡管理</li>
        <li @click="$emit('toggle','recordlist')"><span>3</span>流水管理</li>
        <li @click="$emit('toggle','laws')"><span>4</span>条例</li>
        <li @click="$emit('toggle','contact')"><span>5</span>联系</li>
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

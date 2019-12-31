<style>
   @import "../../assets/css/reset.css";
   @import "../../assets/css/fonts.css";
   @import "../../assets/css/animate.min.css";
   @import "../../assets/css/common.css";
   body { background-color: #000000; color: #fff}
   .list-frame { margin: 90px 0 0 12%;}
   .personal-frame .btn-change { position: absolute; top: 0; left: 750px;}
</style>

<template>
   <div class="list-container">
      <top-nav></top-nav>
      <z-menu></z-menu>
      <div class="list-frame">
         <div class="info-section">
            <h3>Personal center</h3>
            <ul class="z-tab">
               <li class="active">Basic information</li>
               <li>Wish list</li>
            </ul>
         </div>

         <div class="personal-frame mt50 pr" style="display: none">
            <div class="mb15"><input type="text" class="z-input" placeholder="Name" style="width: 330px"/></div>
            <div class="mb15"><input type="text" class="z-input" placeholder="Mobile Phone" style="width: 330px"/></div>
            <div class="mb15">
               <Select class="z-select" style="width:200px; margin-right: 20px;">
                  <Option value="1">Arizona</Option>
               </Select>
               <Select class="z-select" style="width:200px; margin-right: 20px;">
                  <Option value="1">Chandler</Option>
               </Select>
            </div>
            <div class="mb15"><input type="text" class="z-input" placeholder="Address" style="width: 330px"/></div>
            <a href="#" class="btn1 mt90">Edit</a>
            <a href="#" class="btn1 btn-change">Change password</a>
         </div>

         <div class="mt70">
            <cart-item type="wish" class="mb20"></cart-item>
            <cart-item type="wish"></cart-item>
         </div>
      </div>
   </div>
</template>

<script type="es6">
   import topNav from '@/components/topNav.vue'
   import zMenu from '@/components/menu.vue'
   import cartItem from '@/components/cartItem.vue'
   export default {
      name: 'App',
      components: { topNav, zMenu, cartItem },
      data () {
         return {}
      }
   }
</script>

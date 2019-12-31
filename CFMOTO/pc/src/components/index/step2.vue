<style scoped>
.step2 { width: 1100px;}
.step2 .col { float: left; margin-right: 70px;}
.step2 .col .line { display: flex; align-items: center; margin-bottom: 20px;}
.step2 .col .line p { width: 170px; text-align: right; margin-right: 20px; font-size: 16px; font-family: TTHBold; color: #ffffff;}
</style>

<template>
<div class="step2 clearfix">
   <div class="col">
      <div class="line">
         <p>Province</p>
         <Select class="z-select" style="width:200px;">
            <Option value="1">1</Option>
         </Select>
      </div>
      <div class="line">
         <p>City</p>
         <Select class="z-select" style="width:200px;">
            <Option value="1">1</Option>
         </Select>
      </div>
      <div class="line">
         <p>District</p>
         <Select class="z-select" style="width:200px;">
            <Option value="1">1</Option>
         </Select>
      </div>
   </div>
   <div class="col">
      <div class="line">
         <p>Gender</p>
         <Select class="z-select" style="width:200px;">
            <Option value="1">1</Option>
         </Select>
      </div>
      <div class="line">
         <p>Name</p>
         <input type="text" class="z-input" style="width: 300px;">
      </div>
      <div class="line">
         <p>Moblie Phone</p>
         <input type="text" class="z-input" style="width: 300px;">
      </div>
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

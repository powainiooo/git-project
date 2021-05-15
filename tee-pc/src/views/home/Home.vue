<style scoped>
.home-page { display: flex; padding-top: 120px; height: 100vh; }
.home-page .box { flex: 1; height: 100%; margin-right: 30px; overflow: hidden; }
.home-page .box .scrollBar { height: 100%; overflow-y: auto; }
</style>
<template>
  <div class="home-page">
    <c-menu />
    <div class="box">
      <div class="scrollBar">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import cMenu from '@/components/home/menu'
export default {
  name: 'Home',
  components: {
    cMenu
  }
}
</script>

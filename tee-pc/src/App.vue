<template>
  <div id="app">
    <bubble />
    <logo />
    <div class="pr"><router-view/></div>
  </div>
</template>

<script type='es6'>
import bubble from '@/components/common/bubble'
import logo from '@/components/common/logo'
export default {
  name: 'app',
  components: {
    bubble,
    logo
  }
}
</script>

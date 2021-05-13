<template>
  <div id="app">
    <bubble />
    <div class="pr"><router-view/></div>
  </div>
</template>

<script type='es6'>
import bubble from '@/components/common/bubble'
export default {
  name: 'app',
  components: {
    bubble
  }
}
</script>

<style>
.c-ticket-detail {
  width: 100%;
  height: calc(100vh - 100px);
  position: fixed;
  top: 100px;
  left: 0;
  z-index: 800;
  background-color: #EEEEEF;
  overflow-y: auto;
}
.c-ticket-detail .c-ticket-title {
  margin: 48px 0 28px 38px;
  font-size: 24px;
  line-height: 36px;
}
.c-ticket-detail .c-ticket-title span {
  font-size: 26px;
  font-family: HelveB;
  margin-right: 16px;
}
</style>

<template>
<div class="c-ticket-detail">
  <infos ref="infos" />
  <artist ref="artist" />
  <notice ref="notice" />
  <particulars ref="particulars" />
  <organizers ref="organizers" />
  <recommend ref="recommend" />
</div>
</template>

<script type='es6'>
import infos from './infos'
import artist from './artist'
import notice from './notice'
import particulars from './particulars'
import organizers from './organizers'
import recommend from './recommend'
export default {
  name: 'app',
  components: {
    infos,
    artist,
    notice,
    particulars,
    organizers,
    recommend
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

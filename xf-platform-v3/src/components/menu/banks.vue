<style scoped>
.c-infos-top { padding: 130px 60px 60px 60px; border-bottom: 1px solid #EEEEEF; }
.c-infos-bottom { margin: 60px; }
.c-infos-bottom button { width: 90px; }
</style>

<template>
<div>
  <div class="c-infos-top">
    <tag-line class="mb10" title="个人开户名" :lWidth="80">{{globalData.name}}</tag-line>
    <tag-line class="mb10" title="预留手机" :lWidth="80">{{globalData.mobile}}</tag-line>
    <tag-line class="mb10" title="身份证" :lWidth="80">{{globalData.id_card_no}}</tag-line>
    <tag-line class="mb10" title="个人银行卡号" :lWidth="80">{{globalData.card_no}}</tag-line>
    <tag-line class="mb10" title="开户支行" :lWidth="80">{{globalData.opening_banke}}</tag-line>
  </div>
  <div class="c-infos-bottom">
    <Button size="small" @click="$emit('toggle', 'bankEdit')">更改账号</Button>
    <div class="c-c8 f12 mt45">更改银行账号需通过绑定手机的验证码进行验证，如若发生<br/>
      手机保管不当被恶意修改银行卡信息，小夫有票 拒不负责。</div>
  </div>
</div>
</template>

<script type='es6'>
import tagLine from '@/components/tagLine'
export default {
  name: 'app',
  components: {
    tagLine
  },
  computed: {
    globalData () {
      return this.$store.state.globalData.bank_card
    }
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

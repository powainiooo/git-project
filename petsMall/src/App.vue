<style>
@font-face {
   font-family: 'Helve';
   src: url('/static/fonts/HelveticaNeue_Medium.ttf') format('woff2');
}
@font-face {
   font-family: 'HelveThin';
   src: url('/static/fonts/HelveticaNeueThin.ttf') format('woff2');
}
page {
   --mainColor: #DDC9A8;
   --textColor: #3F3221;
   --textColor2: #3E311F;
   --boxShadow: 0 20px 50px -20px rgba(0, 0, 0, 0.2);
   --textShadow: 0 0 5px rgba(0, 0, 0, 0.25);
   --textShadow2: 0 0 5px rgba(0, 0, 0, 0.33);
   --headerHeight: 180;
   --titleHeight: 120
}
.container { padding-top: 180px;}

.btn-round { width: 100%; height: 70px; line-height: 70px; border-radius: 35px; background-color: var(--mainColor); text-shadow: var(--textShadow); border: none; font-size: 20px; color: #ffffff;}
.btn-round:after { border: none;}
</style>

<script>
// import { promisify } from '@/utils'
// const login = promisify(mpvue.login)
// const getSetting = promisify(mpvue.getSetting)
export default {
   created () {
      console.log('app created')
   }
}
</script>

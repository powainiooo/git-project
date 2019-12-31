<style>
   @import "../../assets/css/reset.css";
   @import "../../assets/css/fonts.css";
   @import "../../assets/css/animate.min.css";
   @import "../../assets/css/common.css";
   body { background-color: #000000; color: #fff}
   .contact-container>.info-section { margin: 90px 0 0 13%}
   .join-frame { margin: 110px 0 0 13%; display: none;}
   .join-frame table { width: 560px; float: left; margin-top: 40px;}
   .join-frame table th { height: 26px; font-size: 14px; color: #ffffff; font-family: TTHR; text-align: left;}
   .join-frame table td { height: 65px; font-size: 20px; color: #ffffff; font-family: TTHBold; border-top: 1px solid #ffffff; vertical-align: middle;}

   .contact-frame { overflow: hidden; margin: 90px 0 0 13%}
   .contact-frame .map { width: 620px; height: 380px; float: left; margin-right: 50px;}
   .contact-frame .intro { float: left;}
   .contact-frame .intro h3 { font-size: 20px; color: #ffd400; font-family: TTHBold; margin-bottom: 20px;}
   .contact-frame .intro h4 { font-size: 16px; color: #ffffff; font-family: TTHBold; margin-bottom: 20px;}
</style>

<template>
   <div class="contact-container">
      <top-nav></top-nav>
      <z-menu></z-menu>
      <div class="info-section">
         <h3>Join us & Contact us</h3>
         <ul class="z-tab">
            <li class="active">Join us</li>
            <li>Contact us</li>
         </ul>
      </div>

      <div class="join-frame clearfix">
         <div class="fl mr150">
            <div class="info-section mb70">
               <p>To handle all that speed we fitted Gogoro S1 with a bigger brake disk and a double-acting 4-piston front caliper to deliver unmatched stopping force for an even shorter braking distance.<br/>
                  This is racing gear for the city.</p>
            </div>
            <div style="display: flex; align-items: center;">
               <h4 class="mr45">Mail</h4>
               <a href="javscirpt:;" class="btn2">hr@cfmoto.com </a>
            </div>
         </div>
         <table>
            <thead>
            <tr>
               <th>Position required</th>
               <th>City</th>
            </tr>
            </thead>
            <tbody>
            <tr>
               <td>Project manager</td>
               <td>Beijing</td>
            </tr>
            <tr>
               <td>Project assistant</td>
               <td>Beijing</td>
            </tr>
            <tr>
               <td>Engineer</td>
               <td>Beijing</td>
            </tr>
            </tbody>
         </table>
      </div>

      <div class="contact-frame">
         <div class="map"><img src="@/assets/images/map.jpg"/> </div>
         <div class="intro">
            <h3>ZEEHO Center</h3>
            <h4>116 wuzhou road, yuhang economic development zone,<br/>Hangzhou city, Zhejiang province, China</h4>
            <h4 class="mt40">0571-86155555</h4>
            <h4 class="mt40">fax   0571-86155555</h4>
         </div>
      </div>
   </div>
</template>

<script type="es6">
import topNav from '@/components/topNav.vue'
import zMenu from '@/components/menu.vue'
export default {
   name: 'App',
   components: { topNav, zMenu },
   data () {
      return {}
   }
}
</script>

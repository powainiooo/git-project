<script>
export default {
  created () {
  }
}
</script>

<style>
@import "../static/css/reset.css";
/*
  common
*/
.container { padding-bottom: 100px; }
.container2 { min-height: 100vh; background-color: #F8F8F8; }
.container3 { min-height: 100vh; background-color: #F8F8F8; padding-bottom: 100px; }
.mh100 { min-height: 100vh; }

.c-39 { color: #393A3C; }
.c-99 { color: #999999; }
.c-link { color: #446CB2; }

.b-f8 { background-color: #F8F8F8; }
.b-fff { background-color: #FFFFFF; }

.hr10 { height: 10px; background-color: #F2F2F2; }
.hr20 { height: 20px; background-color: #F8F8F8; }

button { padding: 0; }
button:after { border: none;}

.borderT { position: relative; }
.borderT:before { content: ''; width: 100%; height: 2px; background-color: #E5E5E5; transform: scaleY(.5); position: absolute; top: 0; left: 0; }
.borderB { position: relative; }
.borderB:after { content: ''; width: 100%; height: 2px; background-color: #E5E5E5; transform: scaleY(.5); position: absolute; bottom: 0; left: 0; }

.btn { width: 100%; height: 86px; border-radius: 4px; background-color: #436CB3; font-size: 36px; color: #FFFFFF; font-weight: bold; }
.btn-min { height: 65px; line-height: 65px; font-size: 30px; font-weight: normal; }
.btn-light { background-color: #83ABEF; }

.cover { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(0, 0, 0, .7); z-index: 500; }

.float-box { width: 100%; background-color: #FFFFFF; border-radius: 50px 50px 0 0; position: fixed; left: 0; bottom: 0; padding: 70px 30px; z-index: 1100; }
.float-box h3 { color: #3D7FC7; font-size: 34px; margin-bottom: 60px; }
.float-box li { margin-bottom: 20px; font-size: 22px; line-height: 40px; display: flex; }
.float-box li div { width: 180px; }
.float-box li p { width: 540px; }
.float-box .btn { width: 340px; }

.box-bg { border-radius: 10px; background-color: #F7F7F7; }

.tool-list { margin-left: 15px; margin-right: 15px; display: flex; flex-wrap: wrap; }
.tool-list .tool-item { margin: 0 30px 70px 30px;}
.tool-item { width: 120px; height: 130px; display: flex; justify-content: space-between; align-items: center; flex-direction: column; }
.tool-item img { width: 64px; height: 58px; }
.tool-item div { text-align: center; }

.form { background-color: #FFFFFF; position: relative; }
.form:before { content: ''; width: 100%; height: 2px; background-color: #E5E5E5; transform: scaleY(.5); position: absolute; top: 0; left: 0; }
.form .formLine { width: 100%; height: 100px; display: flex; align-items: center; position: relative; }
.form .formLine:after { content: ''; width: 100%; height: 2px; background-color: #E5E5E5; transform: scaleY(.5); position: absolute; bottom: 0; left: 0; }
.form .formLine .formLabel { width: 260px; padding-left: 42px; font-size: 32px; }
.form .formLine .formContent { width: 490px; height: 100%; display: flex; align-items: center; }
.form .formLine .formContent input { height: 100%; border: none; font-size: 32px; }

.tabs1 { width: 690px; height: 78px; position: relative; display: flex; margin-left: auto; margin-right: auto; }
.tabs1:after { content: ''; width: 200%; height: 200%; border: 2px solid #E5E5E5; transform: scale(.5); transform-origin: 0 0; position: absolute; top: 0; left: 0; }
.tabs1 li { height: 100%; flex: 1; font-size: 30px; display: flex; justify-content: center; align-items: center; position: relative; }
.tabs1 li:after { content: ''; width: 2px; height: 100%; background-color: #E5E5E5; position: absolute; top: 0; right: 0; transform: scaleX(.5) }
.tabs1 li:last-child:after { width: 0; }
.tabs1 li.active:before { content: ''; width: 138px; height: 6px; background-color: #436CB3; position: absolute; bottom: 0; left: 50%; margin-left: -74px; }

.tabs2 { width: 690px; display: flex; padding-left: 18px; margin-left: auto; margin-right: auto; }
.tabs2 li { width: 100px; padding-bottom: 20px; font-size: 30px; text-align: center; }
.tabs2 li.active { border-bottom: 6px solid #436CB3; }

.tabs3 { display: flex; justify-content: space-around; }
.tabs3 li { font-size: 26px; color: #999999; padding-bottom: 14px; position: relative; }
.tabs3 li.active { font-size: 30px; color: #333333; }
.tabs3 li.active:after { content: ''; width: 38px; height: 4px; background-color: #3366CC; position: absolute; bottom: 0; left: 50%; margin-left: -19px; }

.c-tag { font-size: 18px; color: #FFFFFF; border-radius: 4px; height: 34px; line-height: 30px; margin-bottom: 15px; display: inline-block; padding: 0 10px; }

.blue-box { border: 12px solid #436CB3; border-bottom: none; }
.blue-box h3 { font-size: 36px; color: #FFFFFF; background-color: #436CB3; text-align: center; padding: 20px 0; }
.blue-box div { margin: 40px 36px; }
.blue-box div p { font-size: 18px; color: #666666; line-height: 35px; }

.to-next { height: 90px; padding: 0 32px; display: flex; align-items: center; justify-content: flex-end; font-size: 22px; background-color: #FFFFFF }
</style>

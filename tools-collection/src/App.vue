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

.b-f8 { background-color: #F8F8F8; }
.b-fff { background-color: #FFFFFF; }

.hr20 { height: 20px; background-color: #F8F8F8; }

button { padding: 0; }
button:after { border: none;}

.borderT { position: relative; }
.borderT:before { content: ''; width: 100%; height: 2px; background-color: #E5E5E5; transform: scaleY(.5); position: absolute; top: 0; left: 0; }
.borderB { position: relative; }
.borderB:before { content: ''; width: 100%; height: 2px; background-color: #E5E5E5; transform: scaleY(.5); position: absolute; bottom: 0; left: 0; }

.btn { width: 100%; height: 86px; border-radius: 4px; background-color: #436CB3; font-size: 36px; color: #FFFFFF; font-weight: bold; }
.btn-min { height: 65px; font-size: 30px; }
.btn-light { background-color: #83ABEF; }

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
</style>

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
.mh100 { min-height: 100vh; }

.c-39 { color: #393A3C; }

.b-f8 { background-color: #F8F8F8; }
.b-fff { background-color: #FFFFFF; }

.hr20 { height: 20px; background-color: #F8F8F8; }

button { padding: 0; }
button:after { border: none;}

.btn { width: 100%; height: 86px; border-radius: 4px; background-color: #436CB3; font-size: 36px; color: #FFFFFF; font-weight: bold; }

.tool-list { margin-left: 15px; margin-right: 15px; display: flex; flex-wrap: wrap; }
.tool-list .tool-item { margin: 0 30px 70px 30px;}
.tool-item { width: 120px; height: 130px; display: flex; justify-content: space-between; align-items: center; flex-direction: column; }
.tool-item img { width: 64px; height: 58px; }
.tool-item div { text-align: center; }
</style>

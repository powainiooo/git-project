<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; font-family: Arial, "Helvetica Neue", "Microsoft YaHei", Helvetica, sans-serif}
body { width: 100%; height: 100vh; overflow: hidden; background: url("assets/img/bg.jpg") repeat;}

.data-content { font-size: 30px; color: #0475B5; line-height: 54px; position: absolute; letter-spacing: 2px;}
.data-content span { color: rgb(248, 79, 28)}
.data-content div div { display: inline-block}
.data-content .value { font-size: 36px;}

.tag-content { font-size: 48px; line-height: 60px; color: #0475B5; position: absolute; letter-spacing: 2px;}
.tag-content span { color: #F84F1C}

@keyframes fadeIn {
   0% { opacity: 0;}
   100% { opacity: 1;}
}
@keyframes fadeOut {
   0% { opacity: 1;}
   100% { opacity: 0;}
}
@keyframes roll {
   0% { transform: rotateZ(0deg);}
   100% { transform: rotateZ(-360deg);}
}
@keyframes slideUpIn {
   0% { transform: translateY(60px); opacity: 0;}
   100% { transform: translateY(0); opacity: 1;}
}
@keyframes scaleIn {
   0% { transform: scale(0); opacity: 0;}
   100% { transform: scale(1); opacity: 1;}
}
</style>

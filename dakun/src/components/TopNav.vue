<style>
    .top-nav{  position: fixed; top: 60px; left: 60px; right: 60px; z-index: 500;}
    .top-nav .logo{ float: left; margin-right: 100px;}
    .top-nav .nav{ float: left;}
    .top-nav .nav li{ float: left; margin-right: 50px;}
    .top-nav .nav li:last-child{ margin-right: 0;}
    .top-nav .nav li a{ color: #fff; font-size: 18px;}
    .top-nav .btn-mall{ width: 300px; border: 2px solid #fff; font-size: 24px; float: right; padding: 10px 0; text-align: center; color: #fff; margin-top: -15px;}
    .top-nav .nav2{ float: right; margin-right: 100px; margin-top: 5px;}
    .top-nav .nav2 li{ margin-right: 40px;}
    .top-nav .nav2 a{ font-size: 14px;}
</style>


<template>
    <div class="top-nav">
        <a href="#" class="logo"><img src="@/assets/images/logo-top.png"></a>
        <nav class="nav">
            <ul>
                <li><a href="#">官方首页</a> </li>
                <li><a href="#">活动咨询</a> </li>
                <li><a href="#">会员中心</a> </li>
                <li><a href="#">商务合作</a> </li>
            </ul>
        </nav>
        <a href="#" class="btn-mall">官方商城</a>
        <nav class="nav nav2">
            <ul>
                <li><a href="#">About</a> </li>
                <li><a href="#">Contact</a> </li>
            </ul>
        </nav>
    </div>
</template>

<script type="es6">
    export default{
        name: 'App',
        data(){
            return{

            }
        }
    }

</script>


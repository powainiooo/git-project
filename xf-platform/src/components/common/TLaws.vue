<style>
    .laws-frame{ width: 100vw; height: 100vh; background-color: rgba(0,0,0,0.9); z-index: 500; position: fixed; top: 0; left: 0;}
    .laws-frame .logo{ width: 100%; text-align: center; margin-top: 110px; font-size: 32px; color: #ffffff;}
    .laws-frame .content{ width: 1300px; margin: 40px auto; display: flex; justify-content: space-between;}
    .laws-frame .content .laws-list li{ width: 480px; font-size: 14px; color: #ffffff; margin-bottom: 50px; line-height: 1.5; position: relative;}
    .laws-frame .content .laws-list li span{ font-size: 50px; position: absolute; top: -25px; left: -50px;}
</style>

<template>
    <div class="laws-frame">
        <div class="logo"><i class="icon-logo"></i></div>
        <div class="content">
            <div class="laws-list">
                <ul>
                    <li><span>1</span>所填写的信息均具有法律效应，请遵守中华人民共和国法律。</li>
                    <li><span>2</span>小夫有票 首要保护的是购票者，任何损害购票者权益并经过核查的，小夫有票 有权终止活动方的功能并冻结账户。</li>
                    <li><span>3</span>小夫有票 仅作为您发布票务活动的平台，资料文件</li>
                    <li><span>4</span>小夫有票 仅作为您发布票务活动的平台，资料文件</li>
                    <li><span>5</span>小夫有票 仅作为您发布票务活动的平台，资料文件</li>
                    <li><span>6</span>小夫有票 仅作为您发布票务活动的平台，资料文件</li>
                </ul>
            </div>
            <div class="document">
                <ul class="btns">
                    <li>服务协议</li>
                    <li>隐私权专项条款</li>
                </ul>
            </div>
        </div>
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


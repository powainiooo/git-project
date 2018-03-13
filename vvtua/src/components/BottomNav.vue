<style>
    .bottom-nav{ width: 100%; height: 100px; background-color: #171918; position: fixed; bottom: 0; left: 0;  z-index: 1000;}
    .bottom-nav-show{ box-shadow: 0 -10px 20px rgba(0,0,0,0.2); -webkit-box-shadow: 0 -10px 20px rgba(0,0,0,0.2); -moz-box-shadow: 0 -10px 20px rgba(0,0,0,0.2);}
    .bottom-nav .nav{ float: left; margin: 25px 0 0 70px; display: none;}
    .bottom-nav-show .nav{ display: block;}
    .bottom-nav .nav li{ float: left; margin-right: 45px; list-style: none;}
    .bottom-nav .nav li a{ display: block;}
    .bottom-nav .nav li p{ font-family: 'trajanPro'; color: rgba(255,255,255,0.5); font-size: 16px; margin-bottom: 5px;}
    .bottom-nav .nav li div{color: rgba(255,255,255,0.5); font-size: 16px;}
    .bottom-nav .copyright{ float: right; margin: 45px 35px 0 0;}

    .selected{ width: 85px; height: 5px; background-color: #bd9d46; position: absolute; bottom: 0; left: 0;}
</style>

<template>
    <div class="bottom-nav" :class="showNav ? 'bottom-nav-show':''">
        <ul class="nav">
            <li>
                <router-link to="/about">
                    <p>About</p>
                    <div>关于</div>
                </router-link>
            </li>
            <li>
                <router-link to="/contacts">
                    <p>Contacts</p>
                    <div>联系</div>
                </router-link>
            </li>
            <li>
                <router-link to="/works">
                    <p>Works</p>
                    <div>案子</div>
                </router-link>
            </li>
        </ul>
        <div class="copyright"><img src="../assets/images/copyright.png"></div>

        <div class="selected" :style="{left:posLeft+'px'}" v-if="posLeft !== 0"></div>
    </div>
</template>

<script type="es6">
    export default{
        name: 'App',
        props:{
            showNav:{
                type:Boolean,
                default:true
            },
            posLeft:{
                type:String,
                default:0
            }
        },
        data(){
            return{

            }
        }
    }

</script>


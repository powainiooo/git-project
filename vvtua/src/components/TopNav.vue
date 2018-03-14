<style>
    .top-nav{ width: 100%; position: fixed; top: 0; left: 0; z-index: 1000;}
    .top-nav .logo{ float: left; margin: 50px 0 0 75px;}
    .top-nav .btn{ float: right; margin: 50px 60px 0 0;}
    .top-nav .nav{ float: right; margin-right: 100px; margin-top: 40px;}
    .top-nav .nav li{ float: left; margin-right: 30px;font-size: 16px; color: rgba(255,255,255,0.5); line-height: 2; cursor: pointer;}
    .top-nav .nav li span{font-family: 'trajanPro';}
    .top-nav .nav li.active,.top-nav .nav li:hover{ color: #bc9e44;}
</style>

<template>
    <div class="top-nav" :class="showNav ? 'bg1' : ''">
        <router-link to="/index" class="logo"><img src="@/assets/images/logofix1.png"></router-link>
        <router-link to="/index" class="btn"><img src="@/assets/images/btn-close.png"></router-link>
        <ul class="nav" v-if="showNav">
            <li :class="cateID == 0 ? 'active':''"
                @click="getList(item.id)"><span>ALL</span><br>全部</li>
            <li v-for="item in cateList"
                :class="cateID == item.id ? 'active':''"
                @click="getList(item.id)">
                <span>{{item.code}}</span><br>{{item.cname}}
            </li>
        </ul>
    </div>
</template>

<script type="es6">
    export default{
        name: 'App',
        props:['showNav'],
        data(){
            return{
                cateID:0
            }
        },
        methods:{
            getList(id){
                this.cateID = id;
                this.$emit('getID',id);
            }
        },
        computed:{
            cateList(){
                return this.$store.state.cateList
            }
        }
    }

</script>


<style>
    .top-nav{ min-width: 1440px; width: 100%; position: fixed; top: 0; left: 0; z-index: 1000; background-color: #fff;}
    .top-nav section{ width: 1440px; margin: 0 auto; border-bottom: 2px solid #ededed;}
    .top-nav section .logo{ margin: 20px 0 15px 0; float: left; cursor: pointer;}
    .top-nav section nav{ float: left; margin-left: 60px;}
    .top-nav section nav .first-level{ display: flex; margin-top: 23px;}
    .top-nav section nav .first-level>li{ margin-right: 30px; position: relative; padding-bottom: 18px;}
    .top-nav section nav .first-level>li.active:before{ content: ''; width: 64px; height: 3px; background-color: #171918; position: absolute; top: -23px; left: 50%; margin-left: -32px;}
    .top-nav section nav .first-level>li>a{ width: 65px; font-size: 14px; color: #010101;  text-align: center; display: block;}
    .top-nav section nav .first-level>li>a span{ transform: scale(0.7,0.7); display:block;}
    .top-nav section nav .first-level>li .second-level{ width: 90px; background-color: #000; position: absolute; top:56px; left: 50%; margin-left: -45px; display: none;}
    .top-nav section nav .first-level>li:hover .second-level{ display: block;}
    .top-nav section nav .first-level>li .second-level:before{ content: ''; width: 25px; height: 8px; background: url('../assets/images/arrow1.png') no-repeat; position: absolute; top: -7px; left: 32px;}
    .top-nav section nav .first-level>li .second-level li{ margin: 0 10px; border-bottom: 1px solid #fff;}
    .top-nav section nav .first-level>li .second-level li:last-child{ border-bottom: none;}
    .top-nav section nav .first-level>li .second-level li a{ font-size: 14px; padding: 10px 0; color: #fff; text-align: center; display: block;}
</style>

<template>
    <header class="top-nav">
        <section class="clearfix">
            <div class="logo" @click="gotoPage('/index',-4)"><img src="../assets/images/logo.png" width="115"> </div>
            <nav>
                <ul class="first-level hkLight">
                    <li :class="activeIndex == -2 ? 'active' : ''">
                        <a href="javascript:;"
                           @click="getList(-2,0,0)">
                            全部
                            <span>ALL</span>
                        </a>
                    </li>
                    <li v-for="(item,index) in cateList"
                        :class="activeIndex == index ? 'active' : ''">
                        <a href="javascript:;"
                           @click="getList(index,item.id,0)">
                            {{item.cname}}
                            <span>{{item.code}}</span>
                        </a>
                        <ul class="second-level"
                            v-if="item.child.length != 0">
                            <li v-for="listItem in item.child"><a href="javascript:;" @click="getList(index,item.id,listItem.id)">{{listItem.cname}}</a> </li>
                        </ul>
                    </li>
                    <li :class="activeIndex == -3 ? 'active' : ''">
                        <a href="javascript:;"
                           @click="gotoPage('/about',-3)">
                            關於
                            <span>ABOUT</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </section>
    </header>
</template>

<script type="es6">
    export default{
        name: 'App',
        data(){
            return{
                activeIndex2:-4//首页-1，全部-2，关于页-3
            }
        },
        mounted(){
            this.$store.dispatch('doGetCate');
        },
        methods:{
            getList(index,id,id2){
                this.$store.commit('setNavActiveIndex',index);
                this.$store.commit('setCateID',[id,id2]);
                if(this.$route.name != 'works'){
                    this.$router.push('/works');
                }else{
                    this.$emit('getID',[id,id2]);
                }
            },
            gotoPage(name,index){
                this.$store.commit('setNavActiveIndex',index);
                this.$router.push(name)
            }
        },
        computed:{
            cateList(){
                return this.$store.state.cateList
            },
            activeIndex(){
                return this.$store.state.navActiveIndex
            }
        }
    }

</script>


<style>
    .body-frame .bgCover{ width: 100vw; height: 100vh; background-color: rgba(0,0,0,0.5);  position: fixed; top: 0; left: 0; z-index: 1050}
    .nav-frame{ width: 100vw; height: 100vh; position: fixed; top: 0; left: 0; z-index: 1100; }
    .nav-frame .btn-close{ height: 52px; display: flex; padding: 0 5%; justify-content: flex-end; align-items: center;}
    .nav-frame .btn-close img{ width: 20px;}
    .nav-frame nav{ width: 70%; position: absolute; top: 0; right: 0; bottom: 0; background-color: #fff; padding:0 15px;overflow-y: scroll;}
    .nav-frame nav .first-level>li{  border-top: 1px solid #e5e5e5;}
    .nav-frame nav .first-level>li>a{ font-size: 16px; color: #000; display: block;padding: 15px 0 15px 40px;}
    .nav-frame nav .first-level>li .second-level{ margin-left: 40px; }
    .nav-frame nav .first-level>li .second-level li a{ padding: 15px 0 15px 40px; color: #000; display: block;}

    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.3s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
    .slide-enter-active, .slide-leave-active {
        transition: left 0.3s;
    }
    .slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
        left: 100%;
    }
</style>
<template>
    <section class="body-frame">
        <slot></slot>

        <transition name="fade">
            <div class="bgCover" v-if="showMenu" @touchmove.prevent="move($event)"></div>
        </transition>
        <transition name="slide">
        <div class="nav-frame" v-if="showMenu" @touchmove.prevent="move($event)">
            <nav @touchmove.stop="move($event)">
                <a href="javascript:;" class="btn-close" @click="doHideMenu"><img src="../assets/images/btn-close.png"> </a>
                <ul class="first-level hkLight">
                    <li>
                        <a href="javascript:;"
                           @click="getList(-2,0,0)">
                            全部
                        </a>
                    </li>
                    <li v-for="(item,index) in cateList">
                        <a href="javascript:;"
                           @click="getList(index,item.id,0)">
                            {{item.cname}}
                        </a>
                        <ul class="second-level"
                            v-if="item.child.length != 0">
                            <li v-for="listItem in item.child"><a href="javascript:;" @click="getList(index,item.id,listItem.id)">{{listItem.cname}}</a> </li>
                        </ul>
                    </li>
                    <li>
                        <a href="javascript:;"
                           @click="gotoPage('/about',-3)">
                            關於
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
        </transition>
    </section>
</template>

<script type='es6'>
    export default {
        name: 'app',
        data(){
            return{

            }
        },
        mounted(){
            this.$store.dispatch('doGetCate');
        },
        computed:{
            cateList(){
                try{
                    return this.$store.state.cateList
                }catch(err){
                    return [];
                }
            },
            showMenu(){
                return this.$store.state.showMenu
            }
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
                this.doHideMenu();
            },
            gotoPage(name,index){
                this.$store.commit('setNavActiveIndex',index);
                this.$router.push(name);
                this.doHideMenu();
            },
            doHideMenu(){
                this.$store.commit('setShowMenu',false)
            },
            move(e){
                //console.log(e);
            }
        }
    }

</script>


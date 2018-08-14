<style>
    .prolist-frame{ width: 100vw; height: 100vh; overflow-y: scroll;}
    .prolist-frame::-webkit-scrollbar{ width: 3px; background-color: rgba(0,0,0,0);}
    .prolist-frame::-webkit-scrollbar-thumb{ background-color: #ffffff;}
    .prolist-frame .company-name{ font-size: 157px; color: #fff; position: absolute; left:60px; top: 60px; font-family: 'Helve';}
    .prolist-frame .list-content{  width: 1560px; display: flex; margin: 400px auto 100px auto; flex-wrap: wrap;}
    .prolist-frame .list-content .list-item{ margin:0 30px 0px 30px;}
</style>

<template>
    <section class="prolist-frame">
        <div class="company-name">Sector</div>
        <example v-if="showExample"></example>
        <div class="list-content">
            <list-item v-for="item in listData" :itemdata="item"></list-item>
        </div>
    </section>
</template>

<script type='es6'>
    import Example from '@/components/list/Example.vue'
    import ListItem from '@/components/list/ListItem.vue'
    export default {
        name: 'app',
        components:{Example,ListItem},
        data(){
            return{
                showExample:false,
                listData:[
                    {status:1},
                    {status:2},
                    {status:3},
                    {status:4},
                    {status:5},
                    {status:6}
                ]
            }
        },
        methods:{

        }
    }

</script>


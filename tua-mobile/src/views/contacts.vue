<style>
    @import '../assets/css/layout.css';
</style>

<template>
    <div class="page-frame">
        <div class="title">CONTACTS</div>
        <ul class="contacts-list">
            <li>
                <p>The contact<br>联系人</p>
                <div>{{contactData.contact}}</div>
            </li>
            <li>
                <p>E-mail<br>电子邮箱</p>
                <div>{{contactData.email}}</div>
            </li>
            <li>
                <p>Phone<br>手机</p>
                <div>
                    <a href="javascript:;" class="tel">{{contactData.mobile}}</a>
                    <span class="time">{{contactData.time_slot}}</span>
                </div>
            </li>
        </ul>
        <footer-nav></footer-nav>
    </div>
</template>

<script type="es6">
    import FooterNav from '@/components/FooterNav'
    export default{
        name: 'contacts',
        components:{FooterNav},
        mounted(){
            this.init();
        },
        data(){
            return{
                contactData:{}
            }
        },
        methods:{
            init(){
                let self = this;
                self.$ajax.get('/admin/api/ajax_contacts').then((res)=>{
                    var data = res.data;
                    self.contactData = data;
                })
            }
        }
    }

</script>


var app = new Vue({
    el: '#app',
    data: {
        upfileUrl:conf.upload_file_url,
        ajaxIndex:0,
        showLoading:true,
        showMenu:true,
        showHint:true,
        slideIndex:1,
        mySwiper: Object,
        p4Index:0,
        rectList:['A','B','O','U','T','关','于','大','鲲','','D','A','K','U','N'],
        proList:[[],[],[]],
        noSwipe:false,
        p3:{
            list:[]
        },
        p4List:[],
        p5DetailData:{},
        p6DetailData:{},
        news:{
            isShow:false,
            title:'',
            content:'',
            height:0,
            list:[]
        },
        mousedownX:0,
        mouseupX:0,
        showWechatImg:false,
        showSinaImg:false,
        isShowShare:false
    },
    mounted(){
        let self = this;
        self.mySwiper = new Swiper('.swiper-container',{
            noSwiping:true,
            //initialSlide:1,
            noSwipingSelector:'#scroll-bar',
            noSwipingClass : 'stop-swiping',
            onSlideChangeStart: function(swiper){
                self.slideIndex = swiper.activeIndex+1;
            },
            onSlideChangeEnd:function(swiper){

                self.$refs.topNav.isMenu = true;
            }
        });

        this.showHint = window.innerWidth < window.innerHeight;



        self.ajaxInit();
    },
    methods:{
        ajaxInit(){
            this.getPage2Data();
            this.getPage3Data();
            this.getPage4Data();
            this.getPage5Data();
            this.getPage6Data();
        },
        getPage2Data(){
            let self = this;
            //axios.get('/index.php/main/ajax_screen2_list').then(function (res) {
            //    var data = res.data;
            //    self.proList = data.data.list;
            //
            //    self.proInit();
            //    self.hideLoading('page2');
            //}).catch(function (error) {
            //    console.log(error);
            //});
            var arr = [
                {
                    id:'10',
                    content:'pro11111',
                    title:'大鯤强势登陆纽约时装周  “中国微潮”国际舞台传递新风尚1',
                    sub_title:'DAKUN New York Fashion Week',
                    cover:'images/pro1.png'
                },
                {
                    id:'11',
                    content:'pro222',
                    title:'大鯤强势登陆纽约时装周  “中国微潮”国际舞台传递新风尚2',
                    sub_title:'DAKUN New York Fashion Week',
                    cover:'images/pro1.png'
                },
                {
                    id:'12',
                    content:'pro333',
                    title:'大鯤强势登陆纽约时装周  “中国微潮”国际舞台传递新风尚3',
                    sub_title:'DAKUN New York Fashion Week',
                    cover:'images/pro1.png'
                },
                {
                    id:'13',
                    content:'pro444',
                    title:'大鯤强势登陆纽约时装周  “中国微潮”国际舞台传递新风尚4',
                    sub_title:'DAKUN New York Fashion Week',
                    cover:'images/pro1.png'
                },
                {
                    id:'14',
                    content:'pro555',
                    title:'大鯤强势登陆纽约时装周  “中国微潮”国际舞台传递新风尚5',
                    sub_title:'DAKUN New York Fashion Week',
                    cover:'images/pro1.png'
                },
                {
                    id:'15',
                    content:'pro666',
                    title:'大鯤强势登陆纽约时装周  “中国微潮”国际舞台传递新风尚6',
                    sub_title:'DAKUN New York Fashion Week',
                    cover:'images/pro1.png'
                },
                {
                    id:'16',
                    content:'pro777',
                    title:'大鯤强势登陆纽约时装周  “中国微潮”国际舞台传递新风尚7',
                    sub_title:'DAKUN New York Fashion Week',
                    cover:'images/pro1.png'
                }
            ];
            for(var i=0;i<arr.length;i++){
                self.proList[i%3].push(arr[i])
            }
            self.hideLoading('page2');
        },
        getPage3Data(){
            let self = this;
            //axios.get('/index.php/main/ajax_screen3_list').then(function (res) {
            //    var data = res.data;
            //    self.p3.list = data.data.list;
            //    self.hideLoading('page3');
            //}).catch(function (error) {
            //    console.log(error);
            //});
            self.p3.list = [
                {
                    id:1,
                    img:'images/bg3-1.jpg',
                    url:''
                },
                {
                    id:1,
                    img:'images/bg3-1.jpg',
                    url:''
                },
                {
                    id:1,
                    img:'images/bg3-1.jpg',
                    url:''
                },
                {
                    id:1,
                    img:'images/bg3-1.jpg',
                    url:''
                },
                {
                    id:1,
                    img:'images/bg3-1.jpg',
                    url:''
                },
                {
                    id:1,
                    img:'images/bg3-1.jpg',
                    url:''
                }
            ];
            let itemH = parseInt((window.innerWidth*0.44)*438/840);
            self.hideLoading('page3');
        },
        getPage4Data(){
            let self = this;
            //axios.get('/index.php/main/ajax_screen4_list').then(function (res) {
            //    var data = res.data;
            //    self.p4List = data.data.list;
            //    self.hideLoading('page4');
            //}).catch(function (error) {
            //    console.log(error);
            //});
            self.p4List = [
                {
                    content:'111111',
                    id:1,
                    rank:1,
                    title:'会员权益'
                },
                {
                    content:'222222',
                    id:2,
                    rank:2,
                    title:'会员权益2'
                }
            ];
            self.hideLoading('page4');
        },
        getPage5Data(){
            let self = this;
            //axios.get('/index.php/main/ajax_screen5').then(function (res) {
            //    var data = res.data;
            //    self.p5DetailData = data.data;
            //    self.hideLoading('page5');
            //}).catch(function (error) {
            //    console.log(error);
            //});
            self.p5DetailData = {
                title:'关于大鯤',
                ctime:'2018-07-09 10:36:09',
                content:'关于大鯤关于大鯤关于大鯤'
            };
            self.hideLoading('page5');
        },
        getPage6Data(){
            let self = this;
            //axios.get('/index.php/main/ajax_screen6').then(function (res) {
            //    var data = res.data;
            //    self.p6DetailData = data.data;
            //    self.hideLoading('page6');
            //}).catch(function (error) {
            //    console.log(error);
            //});
            self.p6DetailData = {
                title:'品牌招商',
                ctime:'2018-07-09 10:36:09',
                content:'品牌招商品牌招商品牌招商'
            };
            self.hideLoading('page6');
        },
        hideLoading(name){
            console.log(name);
            this.ajaxIndex ++;
            if(this.ajaxIndex == 5){
                this.showLoading = false;
            }
        },
        loadFirstVideo(){
            var self = this;
            //self.hideLoading('video');
            self.$refs.bgVideo.volume = 0;
        },
        doShowAbout(){
            if(this.mousedownX == event.screenX){
                this.news.title = this.p5DetailData.title;
                this.news.content = this.p5DetailData.content;
                this.news.height = window.innerHeight - 62;
                this.news.isShow = true;
            }
        },
        p4mdown(e){
            this.mousedownX = e.screenX;
        },
        p4liClick(index){
            if(this.mousedownX == event.screenX){
                this.news.title = '';
                this.news.content = this.p4List[index].content;
                this.news.height = window.innerHeight - 62;
                this.news.isShow = true;
            }
        },
        p6Readmore(){
            this.news.title = '';
            this.news.content = this.p6DetailData.content;
            this.news.height = window.innerHeight - 62;
            this.news.isShow = true;
        },
        hideNews(){
            this.news.isShow = false;
        },
        p2mdown(e){
            this.mousedownX = e.screenX;
        },
        p2mup(obj){
            if(this.mousedownX == event.screenX){
                this.news.title = obj.title;
                this.news.content = obj.content;
                this.news.height = window.innerHeight - 62;
                this.news.isShow = true;
            }
        },
        p3mup(link){
            if(this.mousedownX == event.screenX){
                window.location = link;
            }
        },
        doAbout(){
            var html = `
    <div class="news-content">
            <p>“我们卖的不只是衣服，更是态度。”近些年来，这句话悄然流行于时尚界，可见聚拢同频率生活态度的消费者，对服装品牌的重要性。市场上的服装品牌，尽管有不少在设计上十分出色的，但对中国含蓄又内敛的青年来说，要么因过分强调个性显得招摇，要么太严肃而活泼感不足，导致服装穿着场景单一化。如何能设计出既取悦年轻一族，又能显得得体、舒适与实穿的服装，成了当下服装品牌丞需思考的问题。</p>
        <p class="imgs">
            <img src="${conf.base_url}images/recruit-img1.jpg"><br>
            <span>（大鲲2018秋冬新款）</span>
        </p>
        <p>有调研显示，中国青年对格调情趣的有着向往和追求，但又拒绝浮夸而不实的张扬设计，为此大鲲独家打造“更实穿”的着装方案。在图案上，以独特的华夏文化为表现元素，构成崭新的视觉体验。设计上，基于年轻一族对个性、舒适、多场景穿着等方面的需求，革新传统服装单一的穿着体验，全新定位“微潮”概念，推出原创时尚品牌——大鲲。</p>
        <p class="fwb">聆听中国青年内心声音 大鲲让设计融于潮流和生活</p>
        <p>概括来说，时装的第一要义始终是美。大鯤坚持原创的时尚态度，通过对华夏文化的传承和再生，让服饰有了新的诠释和演绎。提倡“实穿”的穿衣理念，大鯤在图案上设计了“萌鱼”、“欲望之眼”、“浮生”等多次元纹样，让时装游走在严谨与休闲之间，既可以出现在聚会场合，也能在办公场所穿着毫无违和感，令人赏心悦目。在剪裁上，我们对国际前沿版型进行取舍和改良，避免传统国货潮牌的逼仄，又没有为表现前卫设计而产生的浮夸之感，大鲲将通勤的小功能与轻奢的潮流风尚完美结合，同时搭配精湛的工艺打造完美细节，让潮流设计与日常生活完美融合。</p>
        <p class="imgs">
            <img src="${conf.base_url}images/recruit-img2.jpg"><br>
            <span>（大鲲2018秋冬新款）</span>
        </p>
        <p>潮牌不仅反映时尚潮流的走向，更是年轻人表达内心个性的一种方式。中国青年喜欢动漫、热爱音乐，善于独处也享受聚会，他们在享受个性化浪潮的同时，成为社会新贵。大鲲将他们锁定为目标客群，倾听他们的内心小世界，迎合他们的日常穿着需求，设计出潮流且得体，实用又舒适，随意且安心的微潮服饰。</p>
        <p class="imgs">
            <img src="${conf.base_url}images/recruit-img3.jpg"><br>
            <span>（大鲲服饰：聚焦中国青年）</span>
        </p>
        <p class="fwb">大鯤与年轻一族共同探索“世界由我” 发现美好生活</p>
        <p>大鯤把目光投向中国青年，在丰富服装细节的基础上，融入有趣的设计，鼓励他们遵循内心的声音，找寻更真实的自我。正是在这一初心的引领下，我们对华夏文化的平衡哲学进行解读，与当代青年一起探索更美好的生活姿态。庄子认为，人们可以摆脱精神纷扰，建立安宁、恬静的绝对精神自由。大鯤就传承了《逍遥游》“心之逍遥、精神独立”的核心理念，倡导中国青年以“世界由我”为主的精神自信，建立“由我掌控的绝对自由”的信念。</p>
        <p>为此大鯤致力于为中国青年提供“更实穿”的微潮服装，始终秉持工匠精神，将科技面料与潮流元素共同融入服装设计中，让时装同时散发职场范儿与个性潮范儿。而面对科技发展，大鯤拒绝随波逐流式的复刻和抄袭，我们对细节和工艺技术追求极致，只为每一件高品质成衣的诞生。</p>
        <p class="imgs">
            <img src="${conf.base_url}images/recruit-img4.jpg"><br>
            <span>（大鲲品牌长沙实体店：悦方广场）</span>
        </p>
        <p>未来，大鯤将继续和中国年轻一族共同释放自己内心的本性，为自由发声，创立有代表性的中国微潮品牌，让“世界由我”深入到每个中国年轻族群心中。</p>
        </div>`;
            this.news.title = '关于大鲲';
            this.news.content = html;
            this.news.height = window.innerHeight - 62;
            this.news.isShow = true;
        },
        doRecruit(){
            var html = `
    <div class="news-content">
            <p class="fwb">大店长</p>
            <p>工作内容:</p>
        <ul class="cd-list">
            <li>洞察周边环境，带领所属人员及时调整销售策略；</li>
        <li>组织布置店内的商品布局；保持店面的新颖和变化性； </li>
        <li>协调店内的人员，合理安排分工，培养有潜力的员工； </li>
        <li>在权限范围内协调与属地政府管理部门的关系； </li>
        <li>建立客户资源档案； </li>
        <li>定期向上级提交客户状况分析报告； </li>
        <li>工作地点长沙。 </li>
        </ul>
        <p class="fwb">文案</p>
            <p>工作内容:</p>
        <ul class="cd-list">
            <li>协助公司各类宣传策划方案的设计和撰写；</li>
        <li>负责宣传推广文案及宣传资料文案的撰写； </li>
        <li>负责公司对外媒体和广告表现文字的撰写； </li>
        <li>协助公司各类刊物的采编工作； </li>
        <li>定期更新行业资讯，撰写行业快讯； </li>
        <li>负责媒体软文和广告资料的收集与整理； </li>
        <li>高效完成上级领导交代的其他事项。 </li>
        </ul>
        <p class="fwb">销售客服</p>
            <p>工作内容:</p>
        <ul class="cd-list">
            <li>售前咨询：在线聊天导购，解答顾客对产品的疑问，促成订单成交。积极主动回复买家售前咨询，<br>　　　　介绍公司产品特点及相关促销活动，推荐关联商品；</li>
        <li>售后服务：日常快递查询；及退换货处理； </li>
        <li>积累老顾客资源，定期维护客户关系，促进互动与销售； </li>
        <li>根据部门业务推广的促销计划，做好店铺产品的引导性销售； </li>
        <li>开展客户回访、提供服务建议，把客户意见反馈公司； </li>
        <li>完成领导交代的相关工作。 </li>
        </ul>
        <p class="fwb">仓储主管</p>
            <p>工作内容:</p>
        <ul class="cd-list">
            <li>根据公司的生产销售能力，确定原材料及产品的标准库存量；</li>
        <li>及时与生产部和市场部沟通，保证生产用原材料的库存供给和市场部发送产品所需的库存供给； </li>
        <li>定期编制采购物品的入货台账、退货台账及库存台账，报送财务部和生产部； </li>
        <li>定期编制产品入库、出库及库存台账，送生产部和财务部； </li>
        <li>组织人员保证材料库及成品库的仓储环境，确保库存产品或材料的材质不变； </li>
        <li>制定并实施材料库及成品库的管理制度和管理方法； </li>
        <li>完成领导交代的相关工作。 </li>
        </ul>
        <p class="fwb">仓库管理员</p>
            <p>工作内容:</p>
        <ul class="cd-list">
            <li>管理进出库货物，如：质量检验与核对、商品码放等；</li>
        <li>核对货物的入库凭证，清点入库货物，与送货员办理交接手续； </li>
        <li>安排货物的存放地点，登记保管账和货位编号； </li>
        <li>按照销售情况调整、控制库存数量，及时配货； </li>
        <li>填制、报送各种商品单据，定期盘点商品，上报盘点报告； </li>
        <li>实施仓库的安全管理； </li>
        <li>完成领导交代的相关工作。 </li>
        </ul>
        <p class="fwb">数据分析员</p>
            <p>工作内容:</p>
        <ul class="cd-list">
            <li>负责建立经销商数据信息分享平台，分享相关数据，库存处理经验、成功促销案例等信息；</li>
        <li>负责分析经销商商品的进货、销售、批发、库存等日常数据； </li>
        <li>负责跟踪商品销售环节，分析商品销售的售罄率、周转率、存销比的数据； </li>
        <li>负责分析经销商重点黄金店铺商品的进、销、存等日常数据； </li>
        <li>负责收集新品的销售、售后反馈信息与建议； </li>
        <li>负责收集各经销商库存处理经验、成功促销案例、工作经验等信息与建议； </li>
        </ul>
        <p class="fwb">外贸业务员</p>
            <p>工作内容:</p>
        <ul class="cd-list">
            <li>主要负责外贸业务及跟单，开发国外市场，维护新老客户，推广新老产品；</li>
        <li>接收并及时处理客户信息，如报价、打样、下单等； </li>
        <li>了解客户需求，解答客户疑问，与客户做好沟通和协调； </li>
        <li>制作生产订单，跟踪生产速度，安排出货； </li>
        <li>主导新老项目的进度，与供应商做好跟进和协调，跟踪订单状态，推进新产品开发进度； </li>
        <li>参加国内外展会，开拓国外市场； </li>
        </ul>
        <p>联系人：唐小姐</p>
        <p>电话：0592-5172073</p>
        <p>邮箱：sy.tang@panguren.net</p>
        </div>`;
            this.news.title = '招聘信息';
            this.news.content = html;
            this.news.height = window.innerHeight - 62;
            this.news.isShow = true;
        },
        doDesigner(){
            var html = `
    <div class="news-content">
            <p class="fwb">大鲲设计师IP平台</p>
            <p>是一个D2B2C（Designer-to-Business-Customer）的独立设计师服装集合平台，独立设计师通过签约大鲲平台，在大鲲平台为C端用户提供独立设计师成品服装或品牌联名产品。</p>
        <p>大鲲品牌母公司负责为设计师提供前期服装设计辅助引导：基于大数据和精准客户运营，提供设计师所面对90后和00后青年客群的准确需求资料。协助设计师个人IP孵化，中期服装生产，后期品牌内容运营。</p>
        <p>大鲲提供前端销售运营等一站式服务，为设计师实现自身艺术价值创造桥梁，省去供应链、经销商等环节。</p>
        <p>这是一个正从“中国制造”到“中国创造”的发展的时代，设计师也将成为“创新与创造”的始作俑者，成为社会发展，释放生产力的强劲推动者、引领者。</p>
        </div>`;
            this.news.title = '设计师合作';
            this.news.content = html;
            this.news.height = window.innerHeight - 62;
            this.news.isShow = true;
        }
    }
});
//判断手机横竖屏状态：
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {
    if (window.orientation === 180 || window.orientation === 0) {
        //alert('竖屏状态！');
        app.showHint = true;
    }
    if (window.orientation === 90 || window.orientation === -90 ){
        //alert('横屏状态！');
        app.showHint = false;
    }
}, false);

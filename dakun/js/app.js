var app = new Vue({
    el: '#app',
    data: {
        slideIndex:1,
        mySwiper: Object,
        isShowPost:true,
        hintPos:{
            top:0,
            left:0
        },
        p4mt:-92,
        p4Index:0,
        rectList:[],
        delayList:[],
        showRectList:true,
        proList:[
            {
                id:'0',
                imgUrl:'images/pro1.png',
                title:'厦门会展中心发布会',
                subTitle:'厦门活动  | 10 DECEMBER'
            },
            {
                id:'1',
                imgUrl:'images/pro1.png',
                title:'秋季上新',
                subTitle:'Global trends in sync'
            },
            {
                id:'2',
                imgUrl:'images/pro1.png',
                title:'厦门春季优惠折扣',
                subTitle:'Global trends in sync'
            },
            {
                id:'4',
                imgUrl:'images/pro1.png',
                title:'大鲲入驻上海万达',
                subTitle:'上海活动 | 10 DECEMBER'
            },
            {
                id:'5',
                imgUrl:'images/pro1.png',
                title:'冬季上新',
                subTitle:'Global trends in sync'
            },
            {
                id:'6',
                imgUrl:'images/pro1.png',
                title:'秋季上新',
                subTitle:'Global trends in sync'
            },
            {
                id:'7',
                imgUrl:'images/pro1.png',
                title:'厦门春季优惠折扣',
                subTitle:'Global trends in sync'
            },
            {
                id:'8',
                imgUrl:'images/pro1.png',
                title:'大鲲入驻上海万达',
                subTitle:'上海活动 | 10 DECEMBER'
            },
            {
                id:'9',
                imgUrl:'images/pro1.png',
                title:'冬季上新',
                subTitle:'Global trends in sync'
            },
            {
                id:'10',
                imgUrl:'images/pro1.png',
                title:'冬季上新',
                subTitle:'Global trends in sync'
            }
        ],
        proFrameHeight:1080,
        proFrameTop:0,
        proScrollTop:0
    },
    mounted(){
        let self = this;
        self.initRectList();
        self.proInit();
        self.mySwiper = new Swiper('.swiper-container',{
            onSlideChangeStart: function(swiper){
                self.slideIndex = swiper.activeIndex+1;
            }
        });
        self.initHint();
    },
    methods:{
        loadFirstVideo(){
            this.isShowPost = false;
            this.$refs.video1.play();
        },
        initHint(){
            let arr = [];
            for(let i=0;i<44;i++){
                arr[i] = [];
                arr[i][0] = -226*(i%8);
                arr[i][1] = -68*Math.floor(i/8);
            }
            let index = 0;
            setInterval(()=>{
                index ++;
                if(index == 44){
                    index = 0;
                }
                this.hintPos.left = arr[index][0];
                this.hintPos.top = arr[index][1];
            },50)
        },
        p4liMover(e){
            e.target.className = '';
            e.target.parentNode.className = '';
        },
        p4liClick(e){
            console.log(e);
            e.target.parentNode.className = 'active';
            e.target.parentNode.parentNode.className = 'active';
        },
        initRectList(){
            for(let i=0;i<135;i++){
                this.delayList.push(Math.floor(i/2)*0.05);
                let value = "";
                switch (i){
                    case 50:
                        value = 'A';
                        break;
                    case 51:
                        value = 'B';
                        break;
                    case 52:
                        value = 'O';
                        break;
                    case 53:
                        value = 'U';
                        break;
                    case 54:
                        value = 'T';
                        break;
                    case 65:
                        value = '关';
                        break;
                    case 66:
                        value = '于';
                        break;
                    case 67:
                        value = '大';
                        break;
                    case 68:
                        value = '鲲';
                        break;
                    case 80:
                        value = 'D';
                        break;
                    case 81:
                        value = 'A';
                        break;
                    case 82:
                        value = 'K';
                        break;
                    case 83:
                        value = 'U';
                        break;
                    case 84:
                        value = 'N';
                        break;
                }
                this.rectList.push(value);
            }
            this.delayList.sort(function(){return Math.random()>.5 ? -1 : 1;});
        },
        doHideRects(){
            this.showRectList = false;
        },
        getProPos(index){//310 470 230
            let col = (index+1)%3;
            let row = Math.floor(index/3);
            let top = 0,left = 0;
            //2 3 列换位置
            if(col == 1){
                top = row*380 + 317;
                left = 0;
            }else if(col == 2){
                top = row*380 + 235;
                left = 800;
            }else if(col == 0){
                top = row*380 + 467;
                left = 400;
            }

            return {
                'top':top+'px',
                'left':left+'px'
            }
        },
        proInit(){
            let len = this.proList.length;
            let style = this.getProPos(len-1);
            this.proFrameHeight = parseInt(style.top)+480;
        },
        proFrameScroll(e){
            let per = e.deltaY,dis = window.innerHeight - this.proFrameHeight;
            if(dis>0) return;
            this.proFrameTop -= per;
            if(this.proFrameTop > 0){
                this.proFrameTop = 0;
            }else if(this.proFrameTop < dis){
                this.proFrameTop = dis;
            }

            this.proScrollTop = (this.proFrameTop/dis)*(window.innerHeight - 210);
        },
        proScrollBarMD(e){
            let sy = e.clientY,self = this,lastY = self.proScrollTop,dis = window.innerHeight - 210;
            document.onmousemove = function(event){
                event.stopPropagation();
                self.proScrollTop = lastY + event.clientY - sy;
                if(self.proScrollTop < 0){
                    self.proScrollTop = 0;
                }else if(self.proScrollTop > dis){
                    self.proScrollTop = dis;
                }
                self.proFrameTop = (self.proScrollTop/dis)*(window.innerHeight - self.proFrameHeight);
            }
            document.onmouseup = function(event){
                document.onmousemove = null;
                document.onmouseup = null;
            }
        }
    }
});

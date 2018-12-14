function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.hash.substr(8).match(reg);
    if (r != null) return r[2];
    return null;
}
if(window.getParams == undefined){
    (function (doc, win) {
        var docEl = doc.documentElement,
            isIOS = navigator.userAgent.match(/iphone|ipod|ipad/gi),
            dpr = isIOS ? Math.min(win.devicePixelRatio, 3) : 1,
            dpr = window.top === window.self ? dpr : 1; //被iframe引用时，禁止缩放
        var recalc = function () {
            var width = docEl.clientWidth;
            if (width / dpr > 750) {
                width = 750 * dpr;
            }
            docEl.style.fontSize = 100 * (width / 750) + 'px';
        };
        recalc();
    })(document, window);
    window.getParams = {};
    getParams.data = getQueryString('data') || 'F2APX2ln5BUDNNms0qjl3D65n+b5UcNEMa9XWGXjUO+uZFnsGsHMy1tmV1D6FSFRHE/Wj1Al9JR3UcGTpPH4AKpaLgGO9o9z1+yi3Mvm1u5UCMar9UQF6rx7HnoHBxiyPxBp9d+3c8pimiyf+yTmCZc8NvlYifbQ3wVxLDZGll6aZ/1dGv8n1awfRXxqXisc9GhiQA/N/nT/E5dzwSfbRmr976y2GilcWpYSmbUwTOoXZlW/JCAKWXRdcYBSiV5TjbU/8nII/OeyWXIENyCWoOgjyZvFIdwZzN5Wmnx5/twMjHxVZJvO8kYoPO7c1TYzobcxwBnwZKnf7z6vvJKtzf/pGNEdadaZmjHXtHCJOPbA=';
    getParams.userName = decodeURI(getQueryString('userName') || '%E6%B5%8B%E8%AF%95%E6%B5%8B%E8%AF%95');
    getParams.carType = decodeURI(getQueryString('carType'));
    getParams.energy = getQueryString('energyType') || '2';

    window.footPrinter = {};//脚印数据
    //所有页停留时间
    footPrinter.stayTime = {};
    //当前页
    footPrinter.currentPage = '1';
    //所选风格
    footPrinter.tagStyle = 100;
    //生成小传次数
    footPrinter.posterTimes = 0;
    //进入页面开始时间
    footPrinter.intoPageStartTime = 0;
    //浏览到的最大页面
    footPrinter.lastPage = 1;
    //图片资源
    window.posterImgData = '';
    //接口错误数据
    window.errorData = {};

    window.pageOutFunc = function(){
        let endTime = new Date().getTime();
        if(window.footPrinter.stayTime['page'+footPrinter.currentPage]){
            window.footPrinter.stayTime['page'+footPrinter.currentPage] += endTime - window.footPrinter.intoPageStartTime;
        }else{
            window.footPrinter.stayTime['page'+footPrinter.currentPage] = endTime - window.footPrinter.intoPageStartTime;
        }
        window.footPrinter.intoPageStartTime = endTime;
    }
}

export default window

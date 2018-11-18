// components/detail/detail.js
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        showDetails:{
            type:Boolean,
            value:false
        },
        prodata:{
            type:Object
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        imgSrc:app.globalData.imgSrc
    },

    /**
     * 组件的方法列表
     */
    methods: {
        hideDetails(){
            this.setData({
                showDetails:false
            })
        }
    }
})

// pages/myOrder/index.js
const appRequest = getApp().request;
const urlPath = getApp().globalData.www;
const imgUrl = getApp().globalData.url;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: imgUrl,
    navIndex: 0,
    page: 1,//当前选中的数据的页数
    ajaxBool: false, //是否加载完成
    list: [], //当前选中的数据
    listAll: { // 存储对应的数据
      0: {
        list: [],
        page: 1,
        ajaxBool: false,
      },
      1: {
        list: [],
        page: 1,
        ajaxBool: false,
      },
      4: {
        list: [],
        page: 1,
        ajaxBool: false,
      },
      5: {
        list: [],
        page: 1,
        ajaxBool: false,
      },
      7: {
        list: [],
        page: 1,
        ajaxBool: false,
      },
    },
    status: {
      1: '待付款',
      2: '退款申请中',
      3: '已退款',
      4: '待发货',
      5: '待确认收货',
      6: '已取消',
      7: '已完成',
      8: '申请换货',
      9: '已换货',
      10: '已退货',
      11: '退款申请驳回',
      12: '退货申请中',
      13: '退货申请驳回',
      14: '换货申请被驳回',
    }
  },
  //导航切换
  bindnav: function(e) {
    console.log(e.currentTarget.dataset.num)
    var num = e.currentTarget.dataset.num;
    var listAll = this.data.listAll;
    this.setData({
      navIndex: num,
      list: listAll[num].list,
      page: listAll[num].page,
      ajaxBool: listAll[num].ajaxBool
    })
    if (listAll[num].list.length == 0) {
      this.ajaxList()
    }
  },
  //加载数据
  ajaxList: function() {
    if(this.data.ajaxBool) {
      tt.showToast({
        title: '已加载完数据',
        icon: 'none',
      })
    }
    var url = urlPath + 'api/fxpt/fx_order'
    console.log(url)
    var page = this.data.page;
    var index = this.data.navIndex;
    var param = {
      page: page,
      status: index
    }
    appRequest({
      url: url,
      data: param,
      success: res => {
        tt.hideLoading()
        console.log(res)

        var _list = res.data.data.list;
        var listAll = this.data.listAll;
        var bool = false;
        if (_list.length == 0) {
          bool = true;
          return false;
        }
        if (_list.length<10) {
          bool = true;
        }
        listAll[index].list = listAll[index].list.concat(_list);
        listAll[index].page = page + 1;
        listAll[index].ajaxBool = bool;
        console.log('listAll',listAll)
        this.setData({
          listAll: listAll,
          list: this.data.list.concat(_list),
          page: page + 1,
          ajaxBool: bool,
        })

      },
    }, this.ajaxList)
  },
  //取消订单
  bindCancel: function(e){
    var id = e.currentTarget.dataset.id;
    tt.showModal({
      title: '提示',
      content: '是否取消订单？',
      success: res => {
        if (res.confirm) {
          tt.showLoading({
            title: '正在取消',
          })
          var url = urlPath + 'api/fxpt/order_cancle'
          appRequest({
            url: url,
            data: { id: id },
            success: res => {
              tt.showToast({
                title: '取消成功',
                icon: 'success'
              })
              var list = this.data.list;
              var listAll = this.data.listAll;
              for(var i =0;i<list.length;i++) {
                if(list[i].id == id) {
                  list.splice(i, 1)
                }
              }
              listAll[this.data.navIndex].list = list;
              this.setData({
                list: list,
                listAll: listAll
              })
              console.log(res)

            },
          })
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })


  },
  //自动取消订单
  autoCancel: function(e){
    console.log('autoCancel', e.detail.id)
    var id = e.detail.id;
    var url = urlPath + 'api/fxpt/order_cancle'
    appRequest({
      url: url,
      data: { id: id},
      success: res => {
        var list = this.data.list;
        var listAll = this.data.listAll;
        for (var i = 0; i < list.length; i++) {
          if (list[i].id == id) {
            list.splice(i, 1)
          }
        }
        listAll[this.data.navIndex].list = list;
        this.setData({
          list: list,
          listAll: listAll
        })
        console.log(res)

      },
    })
  },
  //删除订单
  bindDel: function (e) {
    var id = e.currentTarget.dataset.id;
    tt.showModal({
      title: '提示',
      content: '是否删除订单？',
      success: res => {
        if (res.confirm) {
          tt.showLoading({
            title: '正在删除',
          })
          var url = urlPath + 'api/fxpt/del_order'
          appRequest({
            url: url,
            data: { id: id },
            success: res => {
              tt.showToast({
                title: '删除成功',
                icon: 'success'
              })
              var list = this.data.list;
              var listAll = this.data.listAll;
              for (var i = 0; i < list.length; i++) {
                if (list[i].id == id) {
                  list.splice(i, 1)
                }
              }
              listAll[this.data.navIndex].list = list;
              this.setData({
                list: list,
                listAll: listAll
              })
              console.log(res)
            },
          })
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })


  },
  //确认收货
  bindConfirm: function (e) {
    var id = e.currentTarget.dataset.id;
    tt.showModal({
      title: '提示',
      content: '是否确认收货？',
      success: res => {
        if (res.confirm) {
          tt.showLoading({
            title: '正在确认收货',
          })
          var url = urlPath + 'api/fxpt/order_confirm'
          appRequest({
            url: url,
            data: { id: id },
            success: res => {
              tt.showToast({
                title: '确认收货成功',
                icon: 'success'
              })
              var list = this.data.list;
              var listAll = this.data.listAll;
              for (var i = 0; i < list.length; i++) {
                if (list[i].id == id) {
                  list.splice(i, 1)
                }
              }
              listAll[this.data.navIndex].list = list;
              this.setData({
                list: list,
                listAll: listAll
              })
              console.log(res)
            },
          })
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.ajaxList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    tt.showLoading({
      title: '正在加载',
    })
    this.ajaxList()
    console.log(this.data.page)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})

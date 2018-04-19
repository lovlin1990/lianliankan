// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    initLength:16,
    boxList:[]
  },
  // 初始化数据
  initData: function () {
    let dataList = []
    let intBoxValList = this.initValData()
    for (let i = 0; i < this.data.initLength;i++){
      dataList.push({
        id: i+1,
        value: intBoxValList[i],
        checked: ''
      })
    }
    this.setData({
      boxList: dataList
    })
    
    console.log(this.data.boxList)
  },
  // 初始化数据
  initValData: function () {
    let dataList = []
    let i = this.data.initLength / 2
    while (i > 0){
      dataList.push(i);
      dataList.push(i);
      i--;
    }
    // 打乱顺序
    dataList.sort(function () { return 0.5 - Math.random() })
    var str = dataList.join([]);
    // 随机生成8组成对出现的数
    return str
  },
  boxClick: function (e) {
    console.log(1);
    let boxData = e.currentTarget.dataset
    this.data.boxList.forEach((v) => {
      if (v.id === boxData.id){
        if (v.checked !== 'checked'){
          v.checked = 'checked'
        } else { 
          v.checked = ''
        }
        
      }
    })
    this.setData({
      boxList: this.data.boxList
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData()
    this.initValData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
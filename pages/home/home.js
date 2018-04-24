// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    initLength:20,
    boxList:[],
    error:0,
    right:0,
    person:0,
    firstDataId:'',
    firstDataVal: '',
    startClick:0,
    alertShow: false
  },
  // 初始化数据
  initData: function (length) {
    let dataList = []
    let intBoxValList = this.initValData(length)
    for (let i = 0; i < length;i++){
      dataList.push({
        id: i+1,
        value: intBoxValList[i],
        checked: '',
        senior: length >= 36 ? 'high-item' : '',
        shake:''
      })
    }
    this.setData({
      error:0,
      right: 0,
      startClick:0,
      firstDataId: '',
      firstDataVal: '',
      boxList: dataList,
      alertShow: false
    })
  },
  // 初始化数据，随机生成1-8的两两相等的数组
  initValData: function (length) {
    let dataList = []
    let i = length / 2
    while (i > 0){
      dataList.push(i);
      dataList.push(i);
      i--;
    }
    // 打乱顺序
    dataList.sort(function () { return 0.5 - Math.random() })
    
    // 随机生成8组成对出现的数
    return dataList
  },
  boxClick: function (e) {
    let boxData = e.currentTarget.dataset
    let firstDataId = this.data.firstDataId
    let firstDataVal = this.data.firstDataVal
    if (boxData.checked === 'checked'){
      return;
    }
    //判断转换期间是否完成
    if (this.data.startClick === 2) {
      return;
    }
    // 修改data数据，加载当前的checked
    this.data.boxList.forEach((v) => {
      if (v.id === boxData.id) {
        if (v.checked !== 'checked') {
          v.checked = 'checked'
        }
      }
    })
    this.setData({
      boxList: this.data.boxList
    })
    // 判断是否点击过
    if (firstDataVal === "") {
      firstDataVal = boxData.value
      firstDataId = boxData.id
      //重新赋值
      this.setData({
        firstDataVal: firstDataVal,
        firstDataId: firstDataId,
        startClick: 1
      })
    } else {
      if (firstDataVal !== boxData.value) {
        this.data.boxList.forEach((v) => {
          if (v.id === firstDataId) {
            v.shake = 'shake'
          }
        })
        this.setData({
          boxList: this.data.boxList
        })
        // 跟上次点击的不一样
        this.data.boxList.forEach((v) => {
          if (v.value === boxData.value) {
            v.checked = ''
            v.shake = ''
          }
          if (v.id === firstDataId) {
            v.checked = ''
            v.shake = ''
          }
        })
        this.data.error += 1
      } else {
        this.data.right += 1
      }
      
      this.setData({
        startClick: 2
      })
      firstDataVal = ''
      firstDataId = ''
      // 判断是否结束
      this.finishedEvent(this.data.right, this.data.error)
      // 延迟1.5秒赋值，可以延迟转换
      setTimeout(() => {
        //重新赋值
        this.setData({
          boxList: this.data.boxList,
          firstDataVal: firstDataVal,
          firstDataId: firstDataId,
          error: this.data.error,
          right: this.data.right,
          startClick: 0
        })
        
      }, 1500)
    }   
  },
  // 完成动画之后调用是否结束
  finishedEvent: function (right, error) {
    let initLength = this.data.initLength;
    if (right === initLength/2){
      let person = 0
      if (error >= 0 && error < 4){
        person = 99
      } else if (error >= 4 && error < 7){
        person = 90
      } else if (error >= 7 && error < 10) {
        person = 85
      } else if (error >= 10 && error < 12) {
        person = 75
      } else if (error >= 12 && error < 14) {
        person = 60
      } else {
        person = 30
      }
      setTimeout(() => {
        this.setData({
          alertShow: true,
          person: person
        })
      }, 1000)
      
    }
  },
  // 重新执行init
  setBegin: function () {
    this.initData(this.data.initLength)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    let length = 12;
    if(id === '1'){
      length = 12
    } else if (id === '2'){
      length = 20
    } else if (id === '3') {
      length = 36
    }
    this.setData({
      initLength: length
    })
    this.initData(length)
    this.initValData(length)
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
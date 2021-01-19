/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Party
 * @Date: 2020-03-30 15:27:37
 * @LastEditors: Party
 * @LastEditTime: 2020-04-03 16:44:38
 */
let utils = require('../../utils/utils')
Page({
  data: {
    projectAddress: 'https://github.com/myvin/quietweather',
    githubProject: 'https://github.com/zhangliwen1101/WeatherWidget',
    swiperHeight: 'auto',
    bannerImgList: [
      {
        src: '/img/share.png',
        title: '气象风云',
      },
      {
        src: '/img/yun.jpg',
        title: '气象风云',
      },
      {
        src: '/img/wu.jpg',
        title: '气象风云',
      },
      {
        src: '/img/xue.jpg',
        title: '气象风云',
      }
    ],
  },
  onLoad() {
    this.initSwiper()
  },
  wechatPayment(e) {
    const dt = new Date;
    dt.setMinutes(dt.getMinutes() + dt.getTimezoneOffset()); // 当前时间(分钟) + 时区偏移(分钟)
    let timestamp = dt.getTime().toString();
    timestamp = timestamp.substr(0, timestamp.length - 3)
    // appid： wxc27b0b47822e38c6
    // mch_id： 10000100
    // device_info： 1000
    // body： test
    // nonce_str： ibuaiVcKdpRxkhJA
    const stringA = "appid=wxc27b0b47822e38c6&body=test&device_info=1000&mch_id=10000100&nonce_str=ibuaiVcKdpRxkhJA";
    const stringSignTemp = stringA + "&key=192006250b4c09247ec02edce69f6a2d" //注：key为商户平台设置的密钥key
    const sign
      // = MD5(stringSignTemp).toUpperCase()
      = "9A0A8659F005D6984697E2CA0A9CF3B7" //注：MD5签名方式
    wx.requestPayment({
      timeStamp: timestamp,
      nonceStr: '随机32个以下字符串',
      package: 'prepay_id=1',
      signType: 'MD5',
      paySign: sign,
      success(res) {
        console.log('success: ', res, sign)
      },
      fail(res) {

        console.log('fail: ', res, sign)
      }
    })
  },
  previewImages(e) {
    let index = e.currentTarget.dataset.index || 0
    let urls = this.data.bannerImgList
    let arr = []
    urls.forEach(item => {
      arr.push(item.src)
    })
    wx.previewImage({
      current: arr[index],
      urls: arr,
      success: function (res) { },
      fail: function (res) {
        console.error('previewImage fail: ', res)
      }
    })
  },
  initSwiper() {
    let systeminfo = getApp().globalData.systeminfo
    if (utils.isEmptyObject(systeminfo)) {
      wx.getSystemInfo({
        success: (res) => {
          this.setSwiperHeight(res)
        },
      })
    } else {
      this.setSwiperHeight(systeminfo)
    }
  },
  setSwiperHeight(res) {
    this.setData({
      swiperHeight: `${(res.windowWidth || res.screenWidth) / 375 * 200}px`
    })
  },
  copy(e) {
    let dataset = (e.currentTarget || {}).dataset || {}
    let title = dataset.title || ''
    let content = dataset.content || ''
    wx.setClipboardData({
      data: content,
      success() {
        wx.showToast({
          title: `已复制${title}`,
          duration: 2000,
        })
      },
    })
  },
})
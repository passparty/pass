/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Party
 * @Date: 2019-10-28 09:43:16
 * @LastEditors: Party
 * @LastEditTime: 2020-03-30 15:47:05
 */
App({
  onLaunch() {
    // wx.cloud.init({
    //   env: 'release-818bbf',
    //   traceUser: true,
    // })
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.systeminfo = res
        this.globalData.isIPhoneX = /iphonex/gi.test(res.model.replace(/\s+/, ''))
      },
    })
  },
  globalData: {
    // 是否保持常亮，离开小程序失效
    keepscreenon: false,
    systeminfo: {},
    isIPhoneX: false,
    key: '984d91b4e09240fea0d3cb943e578f31',
    weatherIconUrl: 'https://cdn.heweather.com/cond_icon/',
    requestUrl: {
      weather: 'https://free-api.heweather.com/s6/weather',
      hourly: 'https://free-api.heweather.com/s6/weather/hourly',
    },
  },
})
const browserType = {
  wx: 'wx',
  ali: 'ali',
  qq: 'qq',
  weibo: 'wb',
  other: 'other'
}

const browser = {
  versions () {
    const u = navigator.userAgent
    // let app = navigator.appVersion
    return { // 移动终端浏览器版本信息
      trident: u.indexOf('Trident') > -1, // IE内核
      presto: u.indexOf('Presto') > -1, // opera内核
      webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
      iOS: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
      Android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或uc浏览器
      iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
      iPad: u.indexOf('iPad') > -1, // 是否iPad
      webApp: u.indexOf('Safari') === -1 // 是否web应该程序，没有头部与底部
    }
  },
  language: (navigator.browserLanguage || navigator.language).toLowerCase()
}

const UUID = () => {
  var d = new Date().getTime()
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    var r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x7 | 0x8)).toString(16)
  })
  return uuid
}

const device = {
  browserType: browserType,
  deviceId () {
    let deviceId = localStorage.getItem('device')
    // eslint-disable-next-line valid-typeof
    if (deviceId === null || typeof deviceId === undefined) {
      deviceId = UUID()
      localStorage.setItem('device', deviceId)
    }
    return deviceId
  },
  ua () {
    return navigator.userAgent.toLowerCase()
  },
  browser () {
    const ua = this.ua()
    if (browser.versions().mobile) {
      if (ua.match(/MicroMessenger/i) === 'micromessenger') {
        // 在微信中打开
        return browserType.wx
      }
      if (ua.match(/WeiBo/i) === 'weibo') {
        // 在新浪微博客户端打开
        return browserType.weibo
      }

      if (ua.match(/QQ/i) === 'qq') {
        // 在QQ空间打开
        return browserType.qq
      }

      if (ua.match(/alipaydefined/i) === 'alipaydefined' || ua.match(/aliapp/i) === 'aliapp' ||
          ua.match(/alipayclient/i) === 'alipayclient') {
        // 在支付宝中打开
        return browserType.ali
      }

      return browserType.other
    }
    return 'pc'
  }
}

export default device

export default {
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  useI18n: false,
  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  homeName: 'login',
  // // 第三方认证
  // oauth: {
  //   // 云门户
  //   icloud: {
  //     //测试环境
  //     clientId: 'Rz46zhEdy7bokZWWT', // 小付钱包
  //     // clientId: 'AFZ8GqPCDqriQh886', // 云环境：公安局食堂， 部署生产时候需要改此值
  //     url: 'https://accounts.icloudportal.com/oauth2/',//智控云门户环境
  //     urltoken: 'https://accounts.icloudportal.com/oauth2/token',//智控云门户环境
  //
  //     // //生产环境
  //     // clientId: 'CrvJAL3ZWiRHARrQY', // 生产
  //     // url: 'http://10.106.128.228:4000/oauth2/', // 公安局生产云门户环境
  //     // urltoken: 'http://10.106.128.228:4000/oauth2/token' // 公安局生产云门户环境
  //   }
  // },
  //
  // //测试环境
  // apiUrl: 'http://yun-dev202.smallpay.com/platform/api',
  //
  // // // 公安局环境生产
  // // apiUrl: 'http://10.106.128.229:8888/platform/api',
  //
  // // // 公安局外网访问环境
  // // apiUrl: 'http://222.168.5.77:8891/platform/api',
  //
  // VUE_APP_PLATFORM_APP_KEY: '640119',
  // VUE_APP_PLATFORM_APP_CHANNEL_ID: '10004',
  // // VUE_APP_PLATFORM_APP_SECRET: 'pJuRnzjmYl4AT8iBNaoExkW0gSsdvO51',
  // VUE_APP_PLATFORM_APP_SECRET: 'nDdMi8qEFT5XbehBUvg4RjmcZzNw09AK',
  //
  //
  //
  // publicPath: process.env.NODE_ENV === 'production' ? '/pic_ad' : '/pic_ad',

  // 指定企业数据
  usercode: '120493'
}

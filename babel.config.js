const plugins = []
if (process.env.NODE_ENV === 'production'){
  //exclude(忽略)
  plugins.push(['transform-remove-console',{"exclude":["error","warn"]}])
}
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],

  plugins: [
    [
      "import",
      {
        "libraryName": "vxe-table",
        "style": true // 样式是否也按需加载
      }
    ]
  ]

}

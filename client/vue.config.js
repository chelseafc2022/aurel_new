module.exports = {
  publicPath: '',
  outputDir: 'dist',
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    },
    cordovaPath: 'cordova'
  },
  transpileDependencies: [
    'quasar'
  ],

  // devServer: {
  //   proxy: 'https://localhost:8080'
  // }
}

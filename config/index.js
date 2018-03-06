// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');
var publicPath = process.env.ASSETS_HOST ? process.env.ASSETS_HOST : '/';

module.exports = {
  build: {
    env: require('./prod.env'),
    index: '',
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: publicPath,
    productionSourceMap: false,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8686,
    autoOpenBrowser: false,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api':{
        target: 'https://teacher.sandbox.yike.fm',
        target: 'https://sandbox.yike.fm',
        target: 'https://student.sandbox.yike.fm',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api':''
        },
        onProxyReq(proxyReq, req, res) {
          // req.headers['X-SESS'] = 'U5969c94a79dbc-259b112df965dc1.02336968';
          proxyReq.setHeader('X-SESS', 'U597982a817efe-145a8f878e88bd50.89614195');
          // let ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36';
          let ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36';
          proxyReq.setHeader('User-Agent', ua);

        },
        onProxyRes(proxyRes, req, res) {
          proxyRes.headers['Access-Control-Request-Origin'] = '*';
          proxyRes.headers['Access-Control-Request-Headers'] = '*';
        }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}

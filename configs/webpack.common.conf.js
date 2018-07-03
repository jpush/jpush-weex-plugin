const path = require('path');
const fs = require('fs-extra');
const webpack = require('webpack');
const webEntry = {
  'index': path.resolve('examples/entry.js'),
  'vendor': path.resolve('node_modules/phantom-limb/index.js')
}
const weexEntry = {
  'index': path.resolve('examples/index.vue?entry=true')
};
const config = require('./config');
const helper = require('./helper');
const vueLoaderConfig = require('./vue-loader.conf');
const vueWebTemp = helper.rootNode(config.templateDir);

/**
 * Plugins for webpack configuration.
 */
const plugins = [
  /*
   * Plugin: BannerPlugin
   * Description: Adds a banner to the top of each generated chunk.
   * See: https://webpack.js.org/plugins/banner-plugin/
   */
  new webpack.BannerPlugin({
    banner: '// { "framework": "Vue" } \n',
    raw: true,
    exclude: 'Vue'
  })
];

// Config for compile jsbundle for web.
const webConfig = {
  entry: webEntry,
  output: {
    path: helper.rootNode('./examples/web'),
    filename: '[name].js'
  },
  /**
   * Options affecting the resolving of modules.
   * See http://webpack.github.io/docs/configuration.html#resolve
   */
  resolve: {
    extensions: ['.js', '.vue', '.json']
  },
  /*
   * Options affecting the resolving of modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#module
   */
  module: {
    rules: [{
      test: /\.js$/,
      use: [{
        loader: 'babel-loader'
      }],
      exclude: [
        /node_modules(?!(\/|\\).*weex.*)/,
        /node_modules(\/|\\)phantom\-limb/
      ]
    },
    {
      test: /\.vue(\?[^?]+)?$/,
      use: [{
        loader: 'vue-loader',
        options: Object.assign(vueLoaderConfig({useVue: true, usePostCSS: false}), {
          /**
           * important! should use postTransformNode to add $processStyle for
           * inline style prefixing.
           */
          optimizeSSR: false,
          compilerModules: [{
            postTransformNode: el => {
              el.staticStyle = `$processStyle(${el.staticStyle})`
              el.styleBinding = `$processStyle(${el.styleBinding})`
            }
          }]
        })
      }]
    }
    ]
  },
  /*
   * Add additional plugins to the compiler.
   *
   * See: http://webpack.github.io/docs/configuration.html#plugins
   */
  plugins: plugins
};
// Config for compile jsbundle for native.
const weexConfig = {
  entry: weexEntry,
  output: {
    path: helper.rootNode('./examples/native'),
    filename: '[name].js'
  },
  /*
   * Options affecting the resolving of modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#module
   */
  module: {
    rules: [{
      test: /\.js$/,
      use: [{
        loader: 'babel-loader'
      }]
    },
    {
      test: /\.vue(\?[^?]+)?$/,
      use: [{
        loader: 'weex-loader',
        options: vueLoaderConfig({useVue: false})
      }]
    }]
  },
  /*
   * Add additional plugins to the compiler.
   *
   * See: http://webpack.github.io/docs/configuration.html#plugins
   */
  plugins: plugins,
  /*
  * Include polyfills or mocks for various node stuff
  * Description: Node configuration
  *
  * See: https://webpack.github.io/docs/configuration.html#node
  */
  node: config.nodeConfiguration
};

module.exports = [webConfig, weexConfig];

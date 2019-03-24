const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: 'development',
  entry:  ['webpack-hot-middleware/client', './src/index.js'], // 2つのファイルをwebpackの基点とする
  output: {
    filename: 'main.js', // 出力されるファイル名
    publicPath: '/example_public_path/' // 出力されるファイルを読み込めるパスを指定する
  },
  module: {
    rules: [
      {
        test: /\.js$/, // 拡張子が.jsであり
        exclude: /node_modules/, // ディレクトリがnode_module以外であれば
        use: ['babel-loader'] // Babelの対象とする
      },
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: ['vue-loader']
      }
    ]
  },
  resolve: {
    alias: {
      // https://jp.vuejs.org/v2/guide/installation.html#ランタイム-コンパイラとランタイム限定の違い
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // HMRを使用するためのプラグイン
    new VueLoaderPlugin()
  ]
};
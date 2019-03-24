const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const WebpackConfig = require('./webpack.config');

const app = express();
const compiler = webpack(WebpackConfig);

// メモリ上にファイルをコンパイルする
// ファイルを監視して、変更されていれば再コンパイルする
app.use(webpackDevMiddleware(compiler, {
	publicPath: WebpackConfig.output.publicPath,
}));

// クライアントに変更を通知する
// クライアント側でHMRに対応している箇所はリロードせずに更新される
app.use(webpackHotMiddleware(compiler));

// index.htmlを静的に配置しているディレクトリを指定する
app.use(express.static(__dirname));

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`);
});

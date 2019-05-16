const webpack = require('webpack');
const express = require('express');

const webpackConfig = require('./webpack.config.js');
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const history = require('connect-history-api-fallback');// Express配置history模式，SPA应用跳转页面后刷新情况下，因为是SPA应用所以找不到页面，这个插件用于解决这个问题
const compression = require('compression'); // gzip压缩


/**创建服务器*/
const app = express();
/**启用gzip压缩*/
app.use(compression());

/**history模式，url更加美观*/
app.use(history());

/**加入热更新组件*/
const compiler = webpack(webpackConfig);
/**监控文件*/
app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true }
}));
/**自动刷新*/
app.use(webpackHotMiddleware(compiler));

/**定位静态文件*/
app.use('/', express.static('./dist'));

// app.get("*", function (request, response) {
//     response.end("404 - NOT FOUND!");
// });

app.all('*', function (req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Content-type', 'text/html');
});

app.listen(3000, function () {
    console.log('started server on port 3000!!!!')
})
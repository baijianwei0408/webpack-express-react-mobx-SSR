const express = require('express');
const history = require('connect-history-api-fallback');// Express配置history模式，SPA应用跳转页面后刷新情况下，因为是SPA应用所以找不到页面，这个插件用于解决这个问题
const compression = require('compression'); // gzip压缩

/**创建服务器*/
const app = express();
/**启用gzip压缩*/
app.use(compression());

/**history模式，url更加美观*/
app.use(history());

/**
 * 获取配置信息
 */

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
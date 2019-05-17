// 处理css
import 'css-modules-require-hook/preset';
// 处理图片
import assethook from 'asset-require-hook';

assethook({
    extensions: ['jpg', 'png', 'gif', 'webp'],
    name: 'images/[name].[ext]',
    // name: 'images/[name].[hash:6].[ext]',
    limit: 10240
})

import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import history from 'connect-history-api-fallback';// Express配置history模式，SPA应用跳转页面后刷新情况下，因为是SPA应用所以找不到页面，这个插件用于解决这个问题
import compression from 'compression'; // gzip压缩

import { Provider } from 'mobx-react';
import { StaticRouter, Switch, Route } from 'react-router-dom';
import stores from '../../store';
import routers from "../../routers";

/**创建服务器*/
const app = express();
/**启用gzip压缩*/
app.use(compression());
// /**history模式，url更加美观*/
// app.use(history({
//     verbose: true,
//     index: '/'
// }));

let template = fs.readFileSync(path.resolve(__dirname, "../../../dist/index.html"));


routers.forEach(router => {
    app.get(router.path, function (req, res) {
        const app = ReactDOMServer.renderToString(
            <Provider {...stores}>
                <StaticRouter>
                    {router.component}
                </StaticRouter>
            </Provider>
        )

        let html = template.toString().replace('<div id="root"></div>', `<div id="root"><div>SPA SPA SPA</div>${app}</div>`)

        console.log('SPA Success')
        res.send(html);
    });
});


app.use('/', express.static('./dist'));

app.listen(3000, function () {
    console.log('running on port ' + 3000);
});
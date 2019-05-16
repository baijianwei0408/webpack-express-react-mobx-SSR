const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 根据模板生成html插件
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // css从js中分离插件
const CleanWebpackPlugin = require('clean-webpack-plugin/dist/clean-webpack-plugin'); // 清空输出路径插件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //css压缩插件

module.exports = ({
    entry: './index.js',
    mode: 'production',
    output: {
        filename: '[name].[hash:6].bundle.js', // 入口文件名
        chunkFilename: '[name].[hash:6].bundle.js', // 非入口文件名
        path: path.resolve(__dirname, '../../../dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js[x]?/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            //css
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            //sass
            {
                test: /\.sass$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            //png|svg|jpg|gif
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: '10240',
                        name: 'images/[name].[hash:6].[ext]',
                    }
                }],
            },
            //woff|woff2|eot|ttf|otf
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['url-loader']
            }
        ]
    },
    plugins: [
        //清空输入目录
        new CleanWebpackPlugin(),
        //从js中抽离css
        new ExtractTextPlugin("[name].[hash:6].css"),
        //根据模版自动生成html
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './public/index.html',
            minify: { //压缩HTML文件
                removeComments: true,    //移除HTML中的注释
                collapseWhitespace: true    //删除空白符与换行符
            }
        }),
        //环境变量
        new webpack.EnvironmentPlugin(['NODE_ENV']),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        // new webpack.HotModuleReplacementPlugin(),
        // new webpack.NoEmitOnErrorsPlugin(),
        //压缩css文件
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
            canPrint: true
        })
    ],
    // 提取公共代码
    optimization: {
        splitChunks: {
            cacheGroups: {
                // 注意: priority属性，打包优先级
                // 首先: 打包node_modules中的文件
                vendor: {
                    name: "vendor",
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "all",
                    priority: 10
                },
                // 其次: 打包业务中公共代码
                common: {
                    name: "common",
                    chunks: "all",
                    minSize: 1,
                    priority: 0
                }
            }
        },
        runtimeChunk: {
            name: 'manifest'
        },
        noEmitOnErrors: true
    },
})
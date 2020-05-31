const path = require('path');
// webpack 打包项目
// HtmlWebpackPlugin 生成产出HTML文件
// user-agent 把浏览器的UserAgent变成一个对象
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js', // 入口文件
    context: process.cwd(), // 上下文目录
    mode: 'development', // 开发模式，不填有默认值
    output: {
        path: path.resolve(__dirname, 'dist'), // 输出目录
        filename: 'monitor.js' // 文件名
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'), // devServer 静态文件根目录
    },
    plugins: [
        new HtmlWebpackPlugin({ // 自动打包出HTML文件的
            template: './src/index.html',
            inject: 'head'
        })
    ]
}
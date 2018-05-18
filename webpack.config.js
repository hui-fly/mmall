/*
* @Author: huifly
* @Date:   2018-05-14 22:06:01
* @Last Modified by:   hui-fly
* @Last Modified time: 2018-05-18 13:17:28
*/
var webpack = require('webpack');
var Ex      = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// 环境变量配置，dev / online
var WEBPACK_ENV       = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);
// 获取htnl-webpack-plugin参数的方法
var getHtmlConfig = function(name){
  return {
    template : './src/view/' + name + '.html',
    filename : 'view/' + name + '.html',
    inject   : true,
    hash     : true,
    chunks   : ['common',name],
  };
};
var config  = {
  entry: {
  	'common':["./src/page/common/index.js"],
  	'index' :["./src/page/index/index.js"],
  	'login' :["./src/page/login/index.js"],
  	// 'index':"./src/page/login/index.js",
  },//已多次提及的唯一入口文件
  output: {
    path: "./dist",//打包后的文件存放的地方
    publicPath:'/dist',
    filename: 'js/[name].js'//打包后输出文件的文件名
  },
  externals : {
    'jquery' : 'window.jQuery'
  },
  module: {
  	//以CSS文件为结尾的文件就是用'style-loader', 'css-loader'
  	  loaders: [
      // { test: /\.css$/, loader:'style-loader!css-loader' },
      { test: /\.css$/, loader: Ex.extract('style-loader','css-loader') }, // 单独打包出CSS，这里配置注意下
  		{ test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
      //{ test: /\.string$/, loader: 'html-loader'}
	  ]
  },
  plugins :[
    //独立通用模块
  	new webpack.optimize.CommonsChunkPlugin({
  		name :'common',
  		filename :'js/base.js'   //根目录就是output中的path
  	}),    
    //把CSS单独打包到文件里
  	new Ex("css/[name].css"),     //name就是入口里的变量
    // html模板的处理
    new HtmlWebpackPlugin(getHtmlConfig('index')),
    new HtmlWebpackPlugin(getHtmlConfig('login')),
  ]
};

if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}
module.exports = config;
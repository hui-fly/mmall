/*
* @Author: huifly
* @Date:   2018-05-14 22:06:01
* @Last Modified by:   huifly
* @Last Modified time: 2018-05-16 22:19:16
*/
var webpack = require('webpack');
var Ex      = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
//获取htnl-webpack-plugin参数的方法
var getHtmlConfig = function(name){
  return {
    template : './src/view/' + name + '.html',
    filename : 'view/' + name + '.html',
    inject   : true,
    hash     : true,
    chunks   : ['common',name]
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
    filename: 'js/[name].js'//打包后输出文件的文件名
  },
  externals : {
    'jquery' : 'window.jQuery'
  },
  module: {
  	//以CSS文件为结尾的文件就是用'style-loader', 'css-loader'
  	  loaders: [
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
module.exports = config;
/*
* @Author: huifly
* @Date:   2018-05-14 22:06:01
* @Last Modified by:   hui-fly
* @Last Modified time: 2018-05-25 23:23:36
*/

var webpack = require('webpack');
var Ex      = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// 环境变量配置，dev / online
var WEBPACK_ENV       = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);
// 获取htnl-webpack-plugin参数的方法
var getHtmlConfig = function(name,title){
  return {
    template : './src/view/' + name + '.html',
    title    : title,
    filename : 'view/' + name + '.html',      //目标文件的位置dist/view/....
    inject   : true,
    hash     : true,
    chunks   : ['common',name],      //需要打包的模块,即引用的文件为entry的common和name
  };
};
var config  = {
  entry: {
  	'common' :["./src/page/common/index.js"],//common是所有页面都要引用的，其实他只是引用了一个用于初始化的css
  	'index'  :["./src/page/index/index.js"], //由view下的index.html引用
  	'login'  :["./src/page/login/index.js"],//由view下的login.html引用
    'result' :["./src/page/result/index.js"],//由view下的result.html引用
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
      { test: /\.string$/, loader: 'html-loader'}
	  ]
  },
  //为没一个路径配置一个别名
  resolve:{
    alias : {
      util           : __dirname + '/src/util',//__dirname表示当前的根目录
      page           : __dirname + '/src/page',
      service        : __dirname + '/src/service',
      image          : __dirname + '/src/image',
      node_modules   : __dirname + '/node_modules',
    }
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
    new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
    new HtmlWebpackPlugin(getHtmlConfig('login','登录')),
    new HtmlWebpackPlugin(getHtmlConfig('result','操作结果')),
    new HtmlWebpackPlugin(getHtmlConfig('user-center','用户中心')),
  ]
};

if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}
module.exports = config;
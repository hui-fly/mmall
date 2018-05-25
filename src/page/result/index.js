/*
* @Author: hui-fly
* @Date:   2018-05-24 23:05:44
* @Last Modified by:   hui-fly
* @Last Modified time: 2018-05-25 23:57:44
*/
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');
require('./index.css');

$(function(){
	var type = _mm.getUrlParam('type')||'default',
	$element = $('.'+type+'-success')
	//显示对应的提示信息
	$element.show();
})
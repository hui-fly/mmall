/*
* @Author: hui-fly
* @Date:   2018-05-23 23:31:53
* @Last Modified by:   hui-fly
* @Last Modified time: 2018-05-24 10:43:14
*/
require('./index.css');
var _mm    = require('util/mm.js');
// 通用页面头部
var header = {
    init : function(){
        this.bindEvent();
    },
    onload : function(){
    	var keyword = _mm.getUrlParam('keyword');
    	//keyword存在，则回填输入框
    	if(keyword){
    		$('#search-input').val(keyword); //val方法返回或设置选中元素的val通常与表单一起使用
    	};
    },
  
    bindEvent : function(){
       var _this = this;
       //点击搜素按钮之后，做搜素提交
       $('#search-btn').click(function(){
       	   _this.searchSubmit();
       });
       //回车键做提交
       $('#search-input').keyup(function(e){
           if(13 === e.keyCode){
                _this.searchSubmit();
           }
       })
    },
        //搜索的提交
    searchSubmit : function(){
    	var keyword = $.trim($('#search-input').val());
    	//如果提交的时候有keyword，正常跳转到list页
    	if(keyword){
    		window.location.href = './list.html?keyword=' + keyword;
    	}
    	//如果keyword为空，直接返回首页
    	else{
    		_mm.goHome();
    	}
    },

};
header.init();
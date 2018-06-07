/*
* @Author: hui-fly
* @Date:   2018-05-18 19:07:26
* @Last Modified by:   hui-fly
* @Last Modified time: 2018-06-06 23:42:33
*/

// 'use strict';
var Hogan =require('hogan');
var conf  = {
	serverHost : '',//接口地址和当前的静态文件的地址一至，所以是空
};
//一个工具类
var _mm = {
	//请求后端数据，
    request : function(param){  
        var _this = this;    
    	$.ajax({
    		type    : param.method || 'get',  //默认get
    		url     : param.url    || '',
    		dataType: param.type   || 'json',  
    		data    : param.data   || '',     //请求时需要的数据
    		success : function(res){
    			//请求成功
                if(0 === res.status){
                	typeof param.success === 'function' && param.success(res.data,res.msg);
                }
                //没有登录状态需要登录
                else if(10 === res.status){
                    _this.doLogin();
                }
                //请求成功但是数据错误
                else if(1 === res.status){
                	typeof param.error === 'function' && param.error(res.msg);
                }
    		},
    		error   : function(err){           //请求失败
    			typeof param.error === 'function' && param.error(res.statusText);
    		},
    	});
    },
    //获取服务器地址
    getServerUrl : function(path){
    	return conf.serverHost + path;//conf是一个对象，在上边定义
    },
    //获取url参数
    getUrlParam : function(name){
    	//用正则表达式截取参数，例如：happymmall.com/product/list?keyword=xxx&page=1
    	var reg    = new RegExp('(^|&)' + name + '=([^&]* )(&|$)');
    	//window.location.search就是url后边的“?key=...”那段，用substr(1)去掉问号
    	var result = window.location.search.substr(1).match(reg);
    	//匹配到的话result就是一个数组，否则就是一个null。result的第二个元素就是匹配到的值即=后边的值
    	return result ? decodeURIComponent(result[2]) : null;
    },
    goHome: function(){
        window.location.href='/dist/view/index.html';
    },
    //渲染html模板,这要用到hogan，所以要先安装hogan，即执行npm install hogan --save
    renderHtml : function(htmlTemplate,data){
    	//hogan 会先编译然后渲染，现在把这2步合成一步
        var template = Hogan.compile(htmlTemplate);//编译,别把compile写错了
            result   = template.render(data);      //渲染
            return result;
    },
    //成功提示
    successTips : function(msg){
    	alert(msg || "操作成功")
    },
    errorTips : function(msg){
    	alert(msg || "哪里不对了~~")
    },
    //字段的验证，支持非空、手机、邮箱
    validate : function(value,type){
        var value = $.trim(value);  //去掉前后空格并转化为字符串
        //非空验证
        if('require' === type){
        	return !!value;  //转化成boolean值
        }
        //手机号
        if('phone' === type){
        	return /^1[3,4,5,7,8]\d{9}$/.test(value);
        }
        //邮箱
        if('email === type'){
        	return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
        }
    },
    //统一登陆处理
    doLogin : function(){
    	window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
    },
};

module.exports = _mm;

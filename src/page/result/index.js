/*
* @Author: hui-fly
* @Date:   2018-05-30 00:30:49
* @Last Modified by:   hui-fly
* @Last Modified time: 2018-05-30 20:59:08
*/

'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
    var type        = _mm.getUrlParam('type') || 'default',
        $element    = $('.' + type + '-success');
    // 显示对应的提示元素
    $element.show();
})
/*
 * 此脚本只是一个辅助，不含任何刷票逻辑
 * 1. 屏蔽前端javascript的alert验证
 * 2. 屏蔽验证码（感觉是作者留给自己的backdoor）
 * 3. 将submit修改为异步
 */

/**
 * 载入jQuery库，主要使用它的ajax
 */
function init(){
	var s=document.createElement('script');s.src='http://code.jquery.com/jquery-1.12.4.js';document.head.appendChild(s);
}
init();
// 屏蔽前端js验证
function submits(){return true;}
/**
 * ajax主体函数
 */
function ajaxSubmit(){
	var url=$("form").attr('action');
	var txtusrName=$('form [name=txtusrName]').val();
	var txtTel=$('form [name=txtTel]').val();
	var txtsfzh=$('form [name=txtsfzh]').val();
	var txtSafetyCode=$('form [name=txtSafetyCode]').val();
	var data={
		"GetUsers[]":$("input:checked").val(),
		url:url,txtusrName:txtusrName,txtTel:txtTel,txtsfzh:txtsfzh,txtSafetyCode:txtSafetyCode,btnSubmit:'提 交 选 票'
	};
	$.post({
		url:url,
		data:data,
		success:function(rsp){
			var msg = $(rsp).find('h1').first().html();//ChangeCodeImg()
			$('#txtTel').val(genPhoneNum());
			alert(msg);
		},
		error: function(http) {
			var msg = $(http.responseText).find('h1').first().html();//ChangeCodeImg()
			$('#txtTel').val(genPhoneNum());
			alert(msg);
	  	}
	});
}
/**
 * 产生随机电话号码
 */
function genPhoneNum(){
	var fnum=['159','138','181','180','135','158'];
	var mnum=["1631","3850","0372","3720","3722"];
	var raw=Math.floor(Math.random()*9999)+'';
	var len=raw.length;
	for(var i=4;i-len>0;i--)
		raw='0'+raw;
	return fnum[Math.floor(Math.random()*fnum.length)]+mnum[Math.floor(Math.random()*mnum.length)]+raw;
}
/**
 * 绑定提交时间，规避缺省页面跳转，采用ajax请求
 * 所有数据依旧采自页面提交
 */
function bind(){
	//ChangeCodeImg();
	// 屏蔽onfocus事件
	$('#txtSafetyCode').attr('onfocus','').hide();
	$('#txtTel').val(genPhoneNum());
	$("form").on("submit", function(e) {
  		e.preventDefault();
  		ajaxSubmit();
	});
}
// 绑定时间，2秒为等待jquery载入的时间
setTimeout("bind()", 2000);

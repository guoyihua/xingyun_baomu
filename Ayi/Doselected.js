$('.leixins li').click(function() {
	if($(this).hasClass('selected_li')){
		return 0;
	}
	//$('.leixins li').removeClass('selected_li');
	//$(this).addClass('selected_li');
	
	var LeiXin_sel = $(".leixins li").index(this);
	
	SetGeturl("l",LeiXin_sel);
	
	//这里直接用get的方式 进行跳转
	//window.location.href="?l="+LeiXin_sel;
	
});


$('.Hujis li').click(function() {
	if($(this).hasClass('selected_li')){
		return 0;
	}
	
	var Hujis_sel = $(".Hujis li").index(this);
	
	SetGeturl("h",Hujis_sel);
});

$('.Nianlins li').click(function() {
	if($(this).hasClass('selected_li')){
		return 0;
	}
	
	var Hujis_sel = $(".Nianlins li").index(this);
	
	SetGeturl("n",Hujis_sel);
});

$('.JingYans li').click(function() {
	if($(this).hasClass('selected_li')){
		return 0;
	}
	
	var Hujis_sel = $(".JingYans li").index(this);
	
	SetGeturl("j",Hujis_sel);
});

$('.XueLis li').click(function() {
	if($(this).hasClass('selected_li')){
		return 0;
	}
	
	var Hujis_sel = $(".XueLis li").index(this);
	
	SetGeturl("x",Hujis_sel);
});

function SetGeturl(str_tmp,id){
	var curHref = window.location.href;
	if(curHref.indexOf("?") < 0){
		//如果不存在？
		window.location.href="?"+str_tmp+"="+id;
		return ;
	}
	//在存在的状态下 如果有此参数
	if(hasParameter(str_tmp)){
		window.location.href=replaceParamVal(curHref,str_tmp,id);
	}else{//如果没有此参数 那么直接增加
		window.location.href=curHref+"&"+str_tmp+"="+id;
	}
}


function replaceParamVal(oldUrl, paramName, replaceWith) {
    var re = eval('/(' + paramName + '=)([^&]*)/gi');
    var nUrl = oldUrl.replace(re, paramName + '=' + replaceWith);
    return nUrl;
}
function hasParameter(name){
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
        return null;
}

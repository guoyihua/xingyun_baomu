//搜索框
$('.miayi-btn').click(function() {
	//var Rename_ser = $('#reser_Input').val();
	//if(Rename_ser!=""){
		GoToPage(1,2);
	//}
});

//类型
$('.leixin_a_list a').click(function() {
	//首先判断其是否已经是 被选项
	if($(this).hasClass('select_a')){
		return 0;
	}
	$('.leixin_a_list a').removeClass('select_a');
	$(this).addClass('select_a');
	GoToPage(1,2);
});

//户籍
$('.huji_a_list a').click(function() {
	//首先判断其是否已经是 被选项
	if($(this).hasClass('select_a')){
		return 0;
	}
	$('.huji_a_list a').removeClass('select_a');
	$(this).addClass('select_a');
	GoToPage(1,2);
});


//年龄
$('.nianlin_a_list a').click(function() {
	//首先判断其是否已经是 被选项
	if($(this).hasClass('select_a')){
		return 0;
	}
	$('.nianlin_a_list a').removeClass('select_a');
	$(this).addClass('select_a');
	GoToPage(1,2);
});


//经验
$('.jinyan_a_list a').click(function() {
	//首先判断其是否已经是 被选项
	if($(this).hasClass('select_a')){
		return 0;
	}
	$('.jinyan_a_list a').removeClass('select_a');
	$(this).addClass('select_a');
	GoToPage(1,2);
});


//学历
$('.xueli_a_list a').click(function() {
	//首先判断其是否已经是 被选项
	if($(this).hasClass('select_a')){
		return 0;
	}
	$('.xueli_a_list a').removeClass('select_a');
	$(this).addClass('select_a');
	GoToPage(1,2);
});

//排序
$('.paixu_a_list a').click(function() {
	//首先判断其是否已经是 被选项
	if($(this).hasClass('select_a_pai')){
		return 0;
	}
	$('.paixu_a_list a').removeClass('select_a_pai');
	$(this).addClass('select_a_pai');
});


function Set_Lei(lei,wei,cname){
	//首先清除同一类别的选项
	var del_lei_s = "a.deltt[value_l="+lei+"]";
	$(del_lei_s).remove();
	
	//如果小类别为0  那么不限 直接退出
	if(wei==0){
		return 0;
	}
	
	//然后增加对应的类别
	var charu = "<a class='subdiv_allinline deltt' href='javascript:del_lei_lan("+lei+","+wei+");' value_l="
				+lei+" value_s="+wei+">" + cname +"</a>";
	$(charu).appendTo('.title_bts_del');
}

function del_lei_lan(lei,wei){
	//首先删除自己这个条件
	var del_lei_s = "a.deltt[value_l="+lei+"]";
	$(del_lei_s).remove();
	
	//然后重置对应的栏目为 
	var ChongZhi_lei_s = ".div_allinline[value_dalei="+lei+"] a";
	$(ChongZhi_lei_s).removeClass('select_a');
	
	ChongZhi_lei_s+=":eq(0)";
	$(ChongZhi_lei_s).addClass('select_a');
	GoToPage(1,2);
}


//$('.one_a_con').click(function() {
$('.Mid_all').delegate(".one_a_con","click",function() { 
	window.open($(this).attr('urlT'));
});
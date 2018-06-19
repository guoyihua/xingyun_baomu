//这里提 一个 总体控制数据提交的 检测 是否数据在提交中。。。
var Goble_Can_Updata = true;

function Paixun_Js(num){
	GoToPage(1,2);
}

//用于分页数字的跳转
function GoToPage(num){
	var gotopos = arguments[1] ? arguments[1] : 1; 
	//alert(gotopos);
	//return ;

	//判断是否可以提交
	if(!Goble_Can_Updata){
		return 0;
	}
	Goble_Can_Updata = false;

	//这里是排序的限制条件
	var PaiXu_Style = $(".paixu_all a.paixu_a").index($(".paixu_all a.select_a_pai"));
	
	//这里根据五个限制条件进行筛选阿姨
	//类型
	var LeiXin_sel = $(".leixin_a_list a.subdiv_allinline").index($(".leixin_a_list a.select_a"));
	
	//户籍
	var HuJi_sel = $(".huji_a_list a.subdiv_allinline").index($(".huji_a_list a.select_a"));
	
	//年龄
	var NianLin_sel = $(".nianlin_a_list a.subdiv_allinline").index($(".nianlin_a_list a.select_a"));

	//经验
	var JingYan_sel = $(".jinyan_a_list a.subdiv_allinline").index($(".jinyan_a_list a.select_a"));
	
	//学历
	var XueLi_sel = $(".xueli_a_list a.subdiv_allinline").index($(".xueli_a_list a.select_a"));
	
	//这里开始检查 查找阿姨的姓名
	var Rename_ser = $('#reser_Input').val();

	//跳转到哪一页
	var GotoPageNumber = num;
	
	//每页多少阿姨 OnePage_show_num
	
	//这里直接做ajax
	$.ajax({
		  url: "search.php",
		  type: "POST",
		  dataType: "json",
		  data: {
		  	type:'GoPage',
		  	OnePage_show_num:OnePage_show_num,
		  	GotoPageNumber:GotoPageNumber,
		  	PaiXu_Style:PaiXu_Style,
		  	
		  	LeiXin_sel:LeiXin_sel,
		  	HuJi_sel:HuJi_sel,
		  	NianLin_sel:NianLin_sel,
		  	JingYan_sel:JingYan_sel,
		  	XueLi_sel:XueLi_sel,
		  	
		  	Rename_ser:Rename_ser
		  },
		  //触发ajax请求开始时执行
		  beforeSend:function(){
				Goble_Can_Updata = false;
		  },
		  complete:function(){
				Goble_Can_Updata = true;
		  },
		  success: function(data){
			//alert(data.ayi_lie_List);
			if(data.re=="good"){
				//首先删除 原来的阿姨列表
				$(".Mid_all .ayi_lie_List").remove();
				//然后增加
				$(data.ayi_lie_List).insertAfter('.div_allinline.paixu_all.paixu_a_list');
				
				//这里直接替换分页导航
				$('.am-pagination').html(data.am_pagination);
				
				if(gotopos==1){
					//上滑到顶部
					var $elem = $('.paixu_all');
					$('html, body').animate({scrollTop: $elem.offset().top-28}, 800); 
				}
			}
		  },
		  error: function(XMLHttpRequest, textStatus, errorThrown) {
              //alert(XMLHttpRequest.status);
              //alert(XMLHttpRequest.readyState);
              //alert(textStatus);
              //alert(XMLHttpRequest.responseText);
   		  }
	});
	
}
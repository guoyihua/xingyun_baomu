
var myScroll,
	pullDownEl, pullDownOffset,
	pullUpEl, pullUpOffset,
	generatedCount = 0;

function pullDownAction () {
	setTimeout(function () {		// <-- Simulate network congestion, remove setTimeout from production!
		var el, li, i;
		//el = document.getElementById('thelist');

		//for (i=0; i<3; i++) {
			//li = document.createElement('li');
			//li.innerText = 'Generated row ' + (++generatedCount);

			//$(TmpOne).prependTo('#thelist');
			
			
			//el.insertBefore(li, el.childNodes[0]);
		//}
		
		myScroll.refresh();			// Remember to refresh when contents are loaded (ie: on ajax completion)
	}, 1000);						// <-- Simulate network congestion, remove setTimeout from production!
}

/*
 * 
 * 	setTimeout(function () {		// <-- Simulate network congestion, remove setTimeout from production!
		var el, li, i;
		//el = document.getElementById('thelist');

		for (i=0; i<3; i++) {
			//li = document.createElement('li');
			//li.innerText = 'Generated row ' + (++generatedCount);
			//el.appendChild(li, el.childNodes[0]);
			var TmpOne = "<li class=\"One_ayi\">";
				TmpOne+= "<div class=\"one_a_con div_allinline\" urlt=\"http://admin.miayi.net/modules/WX_MAY/?id=20151105100935953\">";
				TmpOne+= "    			<div class=\"subdiv_allinline img_left\">";
				TmpOne+= "					<img src=\"http://admin.miayi.net/modules/AddAYi/SuoLveTu/azu_20151105101531229.jpg_cut_test_320_436.jpg\">";
				TmpOne+= "				</div>";
				TmpOne+= "    			<div class=\"subdiv_allinline right_con\">";
				TmpOne+= "					<p class=\"ayi_name\">李XX&nbsp;<spanp>育儿嫂 &nbsp;</spanp></p>";
				TmpOne+= "					<p class=\"con_a1\">年龄：48 岁 &nbsp; 属相： 狗</p>";
				TmpOne+= "					<p class=\"con_a2\">江苏南京人 &nbsp;学历：高中</p>";
				TmpOne+= "					<p class=\"jiagecankao\">价格：<span>3000&nbsp;-&nbsp;5500元</span></p>";
				TmpOne+= "					<p class=\"haopinglv\">评分:5 分</p>";
				TmpOne+= "					<p class=\"ljyy_bt\">";
				TmpOne+= "						<img class=\"ljyy_im\" src=\"../AuntsList/pic/LiJiYuYue.png\">";
				TmpOne+= "					</p>";
				TmpOne+= "    			</div>";
			    TmpOne+= "			</div>";
				TmpOne+= "		</li>";
			
			$(TmpOne).appendTo('#thelist');
		}
		
		myScroll.refresh();			// Remember to refresh when contents are loaded (ie: on ajax completion)
	}, 1000);						// <-- Simulate network congestion, remove setTimeout from production!
 * 
 * 
 */
var Goble_Can_Updata = true;
var Goble_NoData = false;
function pullUpAction () {
	//判断是否可以提交
	if(!Goble_Can_Updata){
		return 0;
	}
	
	//这里ajax 拖数据
	$.ajax({
		  url: "DoDB.php",
		  type: "POST",
		  dataType: "json",
		  data: {
		  	type:'pulldown',
		  	EndFid:EndFid,
		  	lx:lxajax,
		  	hj:hjajax,
		  	nl:nlajax,
		  	jy:jyajax,
		  	xl:xlajax
		  },
		  //触发ajax请求开始时执行
		  beforeSend:function(){
				Goble_Can_Updata = false;
		  },
		  complete:function(){
				Goble_Can_Updata = true;
		  },
		  success: function(data){
		  	if(data.re=="good"){
		  		$(data.ayi_lie_List).appendTo('#thelist');
		  		if(EndFid == data.EndFid){
		  			//证明没有更多数据了 
		  			//myScroll.destroy();
		  			//return ;
		  			$('.pullUpIcon').hide();
		  			Goble_NoData = true;
		  		}
		  		EndFid = data.EndFid;		  		
		  	}
		  	//setTimeout(myScroll.refresh(), 1000);
		    myScroll.refresh();
		  },
		  error: function(XMLHttpRequest, textStatus, errorThrown) {
              alert(XMLHttpRequest.status);
              alert(XMLHttpRequest.readyState);
              alert(textStatus);
              alert(XMLHttpRequest.responseText);
   		  }
	});
}

function loaded() {
	//首先先 重置 wrapper 的位置
	var SetPosX = $('.bgk_title').position().top+6;
	SetPosX+= $('.bgk_title').height();

	$('#wrapper').css("top",SetPosX);
	
	pullDownEl = document.getElementById('pullDown');
	pullDownOffset = pullDownEl.offsetHeight;
	pullUpEl = document.getElementById('pullUp');	
	pullUpOffset = pullUpEl.offsetHeight;
	
	if(EndFid==0){
		return ;
	}
	
	myScroll = new iScroll('wrapper', {
		useTransition: true,
		topOffset: pullDownOffset,
		onRefresh: function () {
			if (pullDownEl.className.match('loading')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '向下拖动刷新...';
			} else if (pullUpEl.className.match('loading')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '向上拖动获得更多...';
			}
			if(Goble_NoData){
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '已经没有更多数据';
			}
		},
		onScrollMove: function () {

			if (this.y > 5 && !pullDownEl.className.match('flip')) {
				pullDownEl.className = 'flip';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '释放刷新...';
				this.minScrollY = 0;
			} else if (this.y < 5 && pullDownEl.className.match('flip')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '向下拖动刷新...';
				this.minScrollY = -pullDownOffset;
			} 
			if(Goble_NoData){
				return ;
			}

			if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
				pullUpEl.className = 'flip';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '释放刷新...';
				this.maxScrollY = this.maxScrollY;
			} else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '向上拖动获得更多...';
				this.maxScrollY = pullUpOffset;
			}
		},
		onScrollEnd: function () {
			if (pullDownEl.className.match('flip')) {
				pullDownEl.className = 'loading';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';				
				pullDownAction();	// Execute custom function (ajax call?)
			} 
			if(Goble_NoData){
				return ;
			}
			if (pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载中...';				
				pullUpAction();		// Execute custom function (ajax call?)
			}
		}
	});
	
	setTimeout(Set_wrapper, 800);
	//setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
}

function Set_wrapper(){
	//首先 获得 width 
	var wtidhtmp = $('.amz-index').width()/2-$('.One_ayi').outerWidth()/2;
	//document.getElementById('wrapper').style.left = wtidhtmp;
	$('#wrapper').css('left',wtidhtmp);
	//alert(wtidhtmp);
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 800); }, false);


function refrwshh_fun(){
	//如果下面两个参数相差 超过40 就证明出现问题了 就要调整了
	if(myScroll.scroller.clientHeight-myScroll.scrollerH>100){
		myScroll.refresh();
	}	
}

setInterval(refrwshh_fun,1000); 
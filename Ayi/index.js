/* var swiper = new Swiper('.swiper-container', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        paginationClickable: true,
        spaceBetween: 30,
        centeredSlides: true,
        //autoplay: 5000,
        autoplayDisableOnInteraction: false,
        // Disable preloading of all images
        preloadImages: false,
        // Enable lazy loading
        lazyLoading: true              
    }); */
    /*
    jQuery(document).ready(
		function($){
			$(".Thumbnail").lazyload({
			     effect      : "fadeIn"
			});
	});*/
	var $elem = $('.table_sumit_div');

	$('#OneYuYue').click(
		 				function (e) {
							 $('html, body').animate({scrollTop: $elem.offset().top-100}, 800);  
		 				}
					);
					
	$('.jsgz_bt').click(
		 				function (e) {
							 $('html, body').animate({scrollTop: $elem.offset().top-100}, 800);  
		 				}
					);
					
	
	$(".xmay input").click(function(){   
		$("#iden").html("您的身份选择为 <b>雇主</b>，提交之后无法修改");
		$('#my-alert').modal('open');
    	check_xmWho(1);
    	
		$("#gzInfo").show();
		$("#ayiInfo").hide();
    });
    $(".xmgz input").click(function(){  
    	$("#iden").html("您的身份选择为 <b>阿姨</b>，提交之后无法修改");
    	$('#my-alert').modal('open');
    	check_xmWho(2);
    	
		$("#gzInfo").hide();
		$("#ayiInfo").show();
    });
    
    var serialNumber; //交易序列号
    var intervalQuery; //定时查询交易结果
    var xmWho_int = 0;					//当等于1的时候 是寻觅阿姨 如果等于2 就是寻觅工作
    check_xmWho(1);
    function check_xmWho(who_int){
//    	$('#my-alert').modal('open');
    	if(who_int==1){
    		$(".xmgz input").removeAttr("checked");
    		$(".xmay input").prop("checked",function(){
					return true;
			});
    	}
    	else{
    		$(".xmay input").removeAttr("checked");
    		$(".xmgz input").prop("checked",function(){
					return true;
			});
    	}
    	xmWho_int = who_int;
    }
    
    //这里提 一个 总体控制数据提交的 检测 是否数据在提交中。。。
	var Goble_Can_TiJIao = true;
	
	
		"use strict";
		var dappAddress = "n1qaMyp3hNH78ye3AFcnHGt4UiuUWtmLmkp";

		
		var nebulas = require("nebulas"),
		Account = nebulas.Account,
		neb = new nebulas.Neb();
		//neb.setRequest(new nebulas.HttpRequest("https://testnet.nebulas.io"));
		neb.setRequest(new nebulas.HttpRequest("https://mainnet.nebulas.io"));
		//neb.setRequest(new nebulas.HttpRequest("http://localhost:8685"));
		
		var NebPay = require("nebpay");
		var nebPay1 = new NebPay();
		var nebPay2 = new NebPay();
		var f=0;
		
		getMyInfo();
		function getMyInfo(){
			var to = dappAddress;
			var value = "0";
			var callFunction = "getMyInfo";
			var callArgs = "[]"; 
			
			
			serialNumber = nebPay1.simulateCall(to, value, callFunction, callArgs, {    
		            listener: cbTouch    
		        });
		}
		
		function cbTouch(resp){
		   console.log("response of push:"+JSON.parse(resp.result));
		   var re = JSON.parse(resp.result);
		   if(re!=null &&re.length>0){
			   	$("#none").html("已根据您的账户地址登陆！");
				$('#alertNone').modal('open');
				if(re[0].role==0){
					$("#miayi").click();
					$("#migongzuo").attr('disabled',true);
					$(".i_name").val(re[0].name);
					$(".i_phone").val(re[0].phone);
					$(".i_adress").val(re[0].adress);
					$('.select_WebAyi option[value='+re[0].select_WebAyi+']').attr("selected",true);
					$('.select_WebXinzi option[value='+re[0].select_WebXinzi+']').attr("selected",true);
					$('.select_WebJingyan option[value='+re[0].select_WebJingyan+']').attr("selected",true);
					$('.sex option[value='+re[0].sex+']').attr("selected",true);
					$('#subscribe-submit').attr('href','javascript:Pipei();');
					$('#subscribe-submit').text('匹配');
				}else{
					$("#migongzuo").click();
					$("#miayi").attr('disabled',true);
					$(".i_name1").val(re[0].name);
					$(".i_phone1").val(re[0].phone);
					$(".i_adress1").val(re[0].adress);
					$('.select_WebAyi1 option[value='+re[0].select_WebAyi+']').attr("selected",true);
					$('.select_WebXinzi1 option[value='+re[0].select_WebXinzi+']').attr("selected",true);
					$('.select_WebJingyan1 option[value='+re[0].select_WebJingyan+']').attr("selected",true);
					$('.sex1 option[value='+re[0].sex+']').attr("selected",true);
					$('#subscribe-submit1').attr('href','javascript:Pipei1();');
					$('#subscribe-submit1').text('匹配');
				}
		   
		   }
		   
		}
		
		function Pipei(){
			var select_WebAyi = $('.select_WebAyi').val();
		
			var select_WebXinzi = $('.select_WebXinzi').val();
			
			var select_WebJingyan = $('.select_WebJingyan').val();
			var sex = $('.sex').val();
			//这里 是选择找工作 还是找阿姨  xmWho_int
			var name = $('.i_name').val();
			
			var phone = $('.i_phone').val();
			
			var adress = $('.i_adress').val();
			
			var to = dappAddress;
			var value = "0";
			var callFunction = "getAyiList";
			var options = {
				//callback 是交易查询服务器地址,
				//callback: NebPay.config.mainnetUrl //在主网查询(默认值)
				listener: cbPush
			}
			var callArgs = "[\"" + name + "\",\"" + phone + "\",\"" + adress + "\",\"" + select_WebAyi + "\",\"" + select_WebXinzi + "\",\"" + select_WebJingyan + "\",\"" + sex  + "\"]";
			
			
			serialNumber = nebPay1.simulateCall(to, value, callFunction, callArgs, {    
		            listener: cbGetAyi 
		        });
			
		}
		
		function Pipei1(){
			var select_WebAyi = $('.select_WebAyi1').val();
		
			var select_WebXinzi = $('.select_WebXinzi1').val();
			
			var select_WebJingyan = $('.select_WebJingyan1').val();
			var sex = $('.sex1').val();
			//这里 是选择找工作 还是找阿姨  xmWho_int
			var name = $('.i_name1').val();
			
			var phone = $('.i_phone1').val();
			
			var adress = $('.i_adress1').val();
			
			var to = dappAddress;
			var value = "0";
			var callFunction = "getGuzhuList";
			var options = {
				//callback 是交易查询服务器地址,
				//callback: NebPay.config.mainnetUrl //在主网查询(默认值)
				listener: cbPush
			}
			var callArgs = "[\"" + name + "\",\"" + phone + "\",\"" + adress + "\",\"" + select_WebAyi + "\",\"" + select_WebXinzi + "\",\"" + select_WebJingyan  + "\",\"" + sex+ "\"]";
			
			
			serialNumber = nebPay1.simulateCall(to, value, callFunction, callArgs, {    
		            listener: cbGetGuzhu   
		        });
		}
		
		
		function cbPush(resp){
		   console.log("response of push:"+JSON.stringify(resp.result));
		   
		   if(typeof resp == 'string'){
				console.log('reject');
				alert("Canceled uploading");
		   }else{
				//alert("success");
			    $('#my-modal-loading').modal('open');
				intervalQuery = setTimeout(function(){
						$('#my-modal-loading').modal('close');
						funcIntervalQuery();
				},16000);
		   } 
		}
		function cbPush1(resp){
			   console.log("response of push:"+JSON.stringify(resp.result));
			   
			   if(typeof resp == 'string'){
					console.log('reject');
					alert("Canceled uploading");
			   }else{
					//alert("success");
				    $('#my-modal-loading').modal('open');
					intervalQuery = setTimeout(function(){
						 $('#my-modal-loading').modal('close');
							funcIntervalQuery1();
					},16000);
			   } 
			}
		function cbGetAyi(resp){
		   console.log("response of push:"+JSON.stringify(resp.result));
		   
		   if(typeof resp == 'string'){
				console.log('reject');
				alert("Canceled uploading");
		   }else{
				var result = JSON.parse(resp.result);
				if(!result.length){
					$("#none").html("没有匹配到合适的阿姨！");
					$('#alertNone').modal('open');
				}else{
					$('#my-modal-loading').modal('open');
					   setTimeout(function(){
						   $('#my-modal-loading').modal('close');
					   },2000);
					   for(var i=0;i<result.length;i++){
							 var imgurl='';
								 if(result[i].sex=='0'){
									imgurl = "小妖精.png";
								 }else{
									imgurl = "厨师.png";
								 }
								 $("#list").html("");
								$("#list").append('<div class="swiper-slide">'+
												'<ul><li>'+			            					              						              		
													'<div class="ayi-box">'+
												       '<h1>'+result[i].name+'</h1>'+
										               '<a target="_blank">'+
										               	'<img class="Thumbnail" src="'+imgurl+'">'+
												       '</a>'+
												       '<br/>'+
												       '<a class ="con_ayi_a" target="_blank">'+transType(result[i].select_WebAyi)+'&nbsp;'+transJingyan(result[i].select_WebJingyan)+
												       '</a>'+
													   '<a class ="con_ayi_a" target="_blank">'+transXinzi(result[i].select_WebXinzi)+
													   '</a>'+
													   '<a class ="con_ayi_a" target="_blank">联系方式：'+result[i].phone+
												       '</a>'+
													   '<a class ="con_ayi_a" target="_blank">地址：'+result[i].adress+
												       '</a>'+
													'</div>'+
												'</li>'+
							              	'</ul>'+	             	
								'</div>')
							}
				}
				
					var swiper = new Swiper('.swiper-container', {
						nextButton: '.swiper-button-next',
						prevButton: '.swiper-button-prev',
						paginationClickable: true,
						spaceBetween: 30,
						centeredSlides: true,
						//autoplay: 5000,
						autoplayDisableOnInteraction: false,
						// Disable preloading of all images
						preloadImages: false,
						// Enable lazy loading
						lazyLoading: true              
					});
		   } 
		}
		function cbGetGuzhu(resp){
		   console.log("response of push:"+JSON.stringify(resp.result));
		   
		   if(typeof resp == 'string'){
				console.log('reject');
				alert("Canceled uploading");
		   }else{
				var result = JSON.parse(resp.result);
				if(!result.length){
					$("#none").html("没有匹配到合适的雇主！");
					$('#alertNone').modal('open');
				}else{
					$('#my-modal-loading').modal('open');
					   setTimeout(function(){
						   $('#my-modal-loading').modal('close');
					   },2000);
					for(var i=0;i<result.length;i++){
						 var imgurl='';
							 if(result[i].sex=='0'){
								imgurl = "生意人.png";
							 }else{
								imgurl = "生意人.png";
							 }
							 $("#list").html("");
							$("#list").append('<div class="swiper-slide">'+
											'<ul><li>'+			            					              						              		
												'<div class="ayi-box">'+
											       '<h1>'+result[i].name+'</h1>'+
									               '<a target="_blank">'+
									               	'<img class="Thumbnail" src="'+imgurl+'">'+
											       '</a>'+
											       '<br/>'+
											       '<a class ="con_ayi_a" target="_blank">'+transType(result[i].select_WebAyi)+'&nbsp;'+transJingyan(result[i].select_WebJingyan)+
											       '</a>'+
												   '<a class ="con_ayi_a" target="_blank">'+transXinzi(result[i].select_WebXinzi)+
												   '</a>'+
												   '<a class ="con_ayi_a" target="_blank">联系方式：'+result[i].phone+
											       '</a>'+
												   '<a class ="con_ayi_a" target="_blank">地址：'+result[i].adress+
											       '</a>'+
												'</div>'+
											'</li>'+
						              	'</ul>'+	             	
							'</div>')
						}
				}
				
					var swiper = new Swiper('.swiper-container', {
						nextButton: '.swiper-button-next',
						prevButton: '.swiper-button-prev',
						paginationClickable: true,
						spaceBetween: 30,
						centeredSlides: true,
						//autoplay: 5000,
						autoplayDisableOnInteraction: false,
						// Disable preloading of all images
						preloadImages: false,
						// Enable lazy loading
						lazyLoading: true              
					});
		   } 
		}
		
		 function funcIntervalQuery(){
			if(f==0){
				nebPay1.queryPayInfo(serialNumber)
			  .then(function(resp){
				console.log("response:"+resp);
				var respObject = JSON.parse(resp);
				Pipei();
				if(respObject.code ===0){
					f=1;
					alert("成功,即将为您匹配合适的人。。。");
					var result = JSON.parse(respObject.data.execute_result);
					 for(var i=0;i<result.length;i++){
						 var imgurl='';
						 if(result[i].sex=='0'){
							imgurl = "小妖精.png";
						 }else{
							imgurl = "厨师.png";
						 }
						 $("#list").html("");
						$("#list").append('<div class="swiper-slide">'+
										'<ul><li>'+			            					              						              		
											'<div class="ayi-box">'+
										       '<h1>'+result[i].name+'</h1>'+
								               '<a target="_blank">'+
								               	'<img class="Thumbnail" src="'+imgurl+'">'+
										       '</a>'+
										       '<br/>'+
										       '<a class ="con_ayi_a" target="_blank">'+transType(result[i].select_WebAyi)+'&nbsp;'+transJingyan(result[i].select_WebJingyan)+
										       '</a>'+
											   '<a class ="con_ayi_a" target="_blank">'+transXinzi(result[i].select_WebXinzi)+
											   '</a>'+
											   '<a class ="con_ayi_a" target="_blank">联系方式：'+result[i].phone+
										       '</a>'+
											   '<a class ="con_ayi_a" target="_blank">地址：'+result[i].adress+
										       '</a>'+
											'</div>'+
										'</li>'+
					              	'</ul>'+	             	
						'</div>')
					}
					var swiper = new Swiper('.swiper-container', {
						nextButton: '.swiper-button-next',
						prevButton: '.swiper-button-prev',
						paginationClickable: true,
						spaceBetween: 30,
						centeredSlides: true,
						//autoplay: 5000,
						autoplayDisableOnInteraction: false,
						// Disable preloading of all images
						preloadImages: false,
						// Enable lazy loading
						lazyLoading: true              
					});
				}
			  }).catch(function(err){
				console.log(err);
			  });
			}
		  
		}
		 function funcIntervalQuery1(){
				if(f==0){
					nebPay1.queryPayInfo(serialNumber)
				  .then(function(resp){
					console.log("response:"+resp);
					var respObject = JSON.parse(resp);
					Pipei1();
					if(respObject.code ===0){
						f=1;
						alert("成功,即将为您匹配合适的人。。。");
						var result = JSON.parse(respObject.data.execute_result);
						 for(var i=0;i<result.length;i++){
							 var imgurl='';
							 if(result[i].sex=='0'){
								imgurl = "小妖精.png";
							 }else{
								imgurl = "厨师.png";
							 }
							 $("#list").html("");
							$("#list").append('<div class="swiper-slide">'+
											'<ul><li>'+			            					              						              		
												'<div class="ayi-box">'+
											       '<h1>'+result[i].name+'</h1>'+
									               '<a target="_blank">'+
									               	'<img class="Thumbnail" src="'+imgurl+'">'+
											       '</a>'+
											       '<br/>'+
											       '<a class ="con_ayi_a" target="_blank">'+transType(result[i].select_WebAyi)+'&nbsp;'+transJingyan(result[i].select_WebJingyan)+
											       '</a>'+
												   '<a class ="con_ayi_a" target="_blank">'+transXinzi(result[i].select_WebXinzi)+
												   '</a>'+
												   '<a class ="con_ayi_a" target="_blank">联系方式：'+result[i].phone+
											       '</a>'+
												   '<a class ="con_ayi_a" target="_blank">地址：'+result[i].adress+
											       '</a>'+
												'</div>'+
											'</li>'+
						              	'</ul>'+	             	
							'</div>')
						}
						var swiper = new Swiper('.swiper-container', {
							nextButton: '.swiper-button-next',
							prevButton: '.swiper-button-prev',
							paginationClickable: true,
							spaceBetween: 30,
							centeredSlides: true,
							//autoplay: 5000,
							autoplayDisableOnInteraction: false,
							// Disable preloading of all images
							preloadImages: false,
							// Enable lazy loading
							lazyLoading: true              
						});
					}
				  }).catch(function(err){
					console.log(err);
				  });
				}
			  
			}
	
	
	function LiJiYuYue1(){
		
		
		//这是 选择阿姨类型
		var select_WebAyi = $('.select_WebAyi').val();
		
		var select_WebXinzi = $('.select_WebXinzi').val();
		
		var select_WebJingyan = $('.select_WebJingyan').val();
		var sex = $('.sex').val();
		//这里 是选择找工作 还是找阿姨  xmWho_int
		var name = $('.i_name').val();
		
		var phone = $('.i_phone').val();
		
		var adress = $('.i_adress').val();
		
		
		var to = dappAddress;
		var value = "0";
		var callFunction = "addGuzhu";
		var options = {
            //callback 是交易查询服务器地址,
            //callback: NebPay.config.mainnetUrl //在主网查询(默认值)
			listener: cbPush
        }
		var callArgs = "[\"" + name + "\",\"" + phone + "\",\"" + adress + "\",\"" + select_WebAyi + "\",\"" + select_WebXinzi + "\",\"" + select_WebJingyan  + "\",\"" + sex+ "\"]";
		
		
		serialNumber = nebPay1.call(to, value, callFunction,  callArgs,
			{
				listener:cbPush
			});
		
		
	}
	
	function LiJiYuYue2(){
		
		
		//这是 选择阿姨类型
		var select_WebAyi = $('.select_WebAyi1').val();
		
		var select_WebXinzi = $('.select_WebXinzi1').val();
		
		var select_WebJingyan = $('.select_WebJingyan1').val();
		var sex = $('.sex1').val();
		//这里 是选择找工作 还是找阿姨  xmWho_int
		var name = $('.i_name1').val();
		
		var phone = $('.i_phone1').val();
		
		var adress = $('.i_adress1').val();
		
		var to = dappAddress;
		var value = "0";
		var callFunction = "addAyi";

		var callArgs = "[\"" + name + "\",\"" + phone + "\",\"" + adress + "\",\"" + select_WebAyi + "\",\"" + select_WebXinzi + "\",\"" + select_WebJingyan  + "\",\"" + sex+ "\"]";
		
		
		serialNumber = nebPay1.call(to, value, callFunction, callArgs, {
			listener: cbPush1
		});
		
	}
	
	function transJingyan(code){
		var str='';
		switch(code){
			case '0' : str = '1年以下经验';
			break;
			case '1' : str = '1-3年经验';
			break;
			case '2' : str = '3-5年经验';
			break;
			case '3' : str = '5年以上经验';
			break;
			default:
			break;
		}
		return str;
	}
	
	function transXinzi(code){
		var str='';
		switch(code){
			case '0' : str = '面议';
			break;
			case '1' : str = '3000-5000元';
			break;
			case '2' : str = '5001-10000元';
			break;
			case '3' : str = '10000元以上';
			break;
			default:
			break;
		}
		return str;
	}
	function transType(code){
		var str='';
		switch(code){
			case '0' : str = '月嫂';
			break;
			case '1' : str = '钟点工';
			break;
			case '2' : str = '保洁';
			break;
			case '3' : str = '护理';
			break;
			case '4' : str = '家教';
			break;
			default:
			break;
		}
		return str;
	}

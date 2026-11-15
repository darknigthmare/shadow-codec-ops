$(function(){
	var check_mm  = 0;
	var check_dd  = 0;
	var check_yy  = 0;
	var _age      = undefined;
	window.onload = function() {
		var flag = navigator.cookieEnabled;
		if(flag===true){
			// console.log("cookie: valid");
			_age = $.cookie('mgage');
			//console.log("_age: "+_age);
			if(_age=='under'){
				window.location.href = "./sorry";
			}
		}else{
			console.log("cookie: invalid");
			//$('#submit').css("display","none");
			$('#submit').text("Please use cookie");
		}
	}
	
	$('#agegate').submit(function(){
		var regionlang = $('.selectRegion option:selected').val();
		var _split = regionlang.split('/');
		var region = _split[0];
		var lang   = _split[1];
		// console.log(_split);
		// console.log("region: "+region);

		var ct = new Date();
		ct.setTime(ct.getTime()+(2*60*60*1000));//2hours
		//ct.setTime(ct.getTime()+(24*60*60*1000*27));//27day
		//ct.setTime(ct.getTime()+(24*60*60*1000));//24hour
		//ct.setTime(ct.getTime()+(60*1000));//1min
				
		if(region!==null && lang!==null){
			//console.log("check region");
			$.cookie('mgregion',region,{expires:ct,path:'/mg/'});
			$.cookie('mglang',lang,{expires:ct,path:'/mg/'});

			if(region=='us' || region=='eu' || region=='jp' || region=='asia'){
			//if(region=='us'){
				var mm     = $('.mm option:selected').val();
				var dd     = $('.dd option:selected').val();
				var yyyy   = $('.yyyy option:selected').val();
				var age    = getAge(yyyy,mm,dd);
				// console.log("yyyymmdd: "+yyyy+"-"+mm+"-"+dd);
				// console.log("age: "+age);

				var region2age = {"jp": 17, "us": 17, "eu": 17, "asia": 17};

				if(_age!='under'){
					if(age<=region2age[region]){
						$.cookie('mgage','under',{expires:ct,path:'/mg/'});
					}else{
						_age = $.cookie('mgage');
						if(_age!="under"){
							$.cookie('mgage','over',{expires:ct,path:'/mg/'});
						}
					}
				}
			}

		}else{
			console.log("check region: false");
		}

	});

	$('.selectRegionlist').change(function(){
		var _regionlang   = $('.selectRegion option:selected').val();
		var _region       = _regionlang.split('/')[0];
		var _birthday     = $('.selectBirthday');
		//console.log(_region);
		if(_region=='jp' || _region=='us' || _region=='eu' || _region=='asia'){
		 	//console.log("change region: "+_region);
			$(_birthday).attr('aria-hidden', false);
		}else{
			$(_birthday).attr('aria-hidden', true);
		}

		// product img
		if(_region == ''){
			$('#product-active li').removeClass('is-active');
			$('#product-active li').removeClass('is-hide');

			$('#product-active img').animate({
					"width": "100%"
			}, 500);
		}
		else {
			$('#product-active li').removeClass('is-active');
			$('#product-active li').addClass('is-hide');
			$('#product-active li[data-name="' + _region + '"]').addClass('is-active');
			$('#product-active li[data-name="' + _region + '"]').removeClass('is-hide');

			$('#product-active .is-hide img').animate({
					"width": "90%"
			}, 500);

			$('#product-active .is-active img').animate({
					"width": "100%"
			}, 500);
   }
	 console.log(_region);

	});

	$("form").change(function(e){
		var target = $( e.target );
		if ( target.attr('name') === 'mm' ) {
			check_mm = $('.mm option:selected').val();
		}
		if ( target.attr('name') === 'dd' ) {
			check_dd = $('.dd option:selected').val();
		}
		if ( target.attr('name') === 'yyyy' ) {
			check_yy = $('.yyyy option:selected').val();
		}
		if(check_mm > 0 && check_dd > 0 && check_yy > 0){
			$('#submit').attr('aria-hidden', false);
			$('#submit').prop("disabled", false);
		}else{
			$('#submit').attr('aria-hidden', true);
			$('#submit').prop("disabled", true);
		}
	});

});

function getAge(y,m,d){
	var b = new Date(y,m-1,d);
	var t = new Date();
	var tB = new Date(t.getFullYear(),b.getMonth(),b.getDate());
	var age = t.getFullYear() - b.getFullYear();
	return (t < tB) ? age-1:age;
}
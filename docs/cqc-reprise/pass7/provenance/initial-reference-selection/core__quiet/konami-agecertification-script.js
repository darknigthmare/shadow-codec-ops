

$(function(){
	
	var showcng = function(){
		setTimeout(function(){
			if($('#sel-country').val() == '11'){
				$('.selnone').css({'visibility':'hidden'});
			}else{
				$('.selnone').css({'visibility':'visible'});
			}
		}, 100);
	};
	
	
	var chg_lang = function(){
		setTimeout(function(){
			//$('.easy-select-box').eq(1).find('.esb-item').eq(1).click();
			if($('#sel-country').val() == '1' || $('#sel-country').val() == '3' || $('#sel-country').val() == '4' || $('#sel-country').val() == '9')
			{
				if($('#sel-language')[0])
				{
					$('.easy-select-box').eq(1).find('.esb-item').each(function(ii,elem){
						if(ii == 0)
						{
							$(this).click();
						}
						else
						{
							$(this).css({'display':'none'});
						}
					});
				}
			}
			else
			{
				$('.easy-select-box').eq(1).find('.esb-item').css({'display':''});
			}
		}, 100);
	};
	
	
	var languages = null;
	
	var chg_lang_sp = function(){
		if($('#sel-language')[0])
			return;
		setTimeout(function(){
			//$('.easy-select-box').eq(1).find('.esb-item').eq(1).click();
			if($('#sel-country').val() == '1' || $('#sel-country').val() == '3' || $('#sel-country').val() == '4' || $('#sel-country').val() == '9')
			{
				$('#sel-language option').each(function(){
					if($(this).val() != 'en')
					{
						$(this).remove();//css({'display':'none'});
					}
				});
				$('#sel-language').val('en');
			}
			else
			{
				var selval = $('#sel-language').val();
				$('#sel-language option').remove();
				$('#sel-language').append(languages);
				$('#sel-language').val(selval);
			}
		}, 100);
	};
	
	
	if($('body.sp').size() === 0){
		
		if($('#sel-language')[0])
			$('#sel-language').easySelectBox();
		
		$('#sel-country').easySelectBox();
		$('#sel-month').easySelectBox();
		$('#sel-day').easySelectBox();
		$('#sel-year').easySelectBox();
		
		$('.easy-select-box').eq(0).find('.esb-item').click(function(){
			showcng();
			chg_lang();
		});
		
	}else{
		
		if($('#sel-language')[0])
		languages = $('#sel-language option');
		
		$('#sel-country').change(function(){
			showcng();
			chg_lang_sp();
		});
	}
	
	
	setTimeout(function(){
		if($('body.sp').size() === 0){
			chg_lang();
		}else{
			chg_lang_sp();
		}
	}, 100);
	
	
	
	//showcng();
	
});



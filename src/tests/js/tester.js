var tester = {
	
	passedCss : {backgroundColor:'#E6EFC2',color:'#264409',border:'2px solid #C6D880',padding:'5px',margin:'5px'},
	
	failedCss : {backgroundColor:'#FBE3E4',color:'#8a1f11',border:'2px solid #FBC2C4',padding:'5px',margin:'5px'},
	
	showCss : {backgroundColor:'#FFFFFF',color:'#8a1f11',border:'2px solid #CCCCCC',padding:'5px',margin:'5px'},	
	
	passed : function(text){
		var t = text || 'Test Passed';
		var el = document.createElement('p');
		var p = $(el).css(tester.passedCss).text(t);
		var div = document.getElementById('ajaxTest');
		$(div).append(el);
	},
	
	failed : function(text){
		var t = text || 'Test Failed';
		var el = document.createElement('p');
		var p = $(el).css(tester.failedCss).text(t);
		var div = document.getElementById('ajaxTest');
		$(div).append(el);
	},

	show : function(t){
		var el = document.createElement('p');
		var p = $(el).css(tester.showCss).text(t);
		var div = document.getElementById('ajaxTest');
		$(div).append(el);
	},
	
	assertEqual : function(a,b,text){
		if(a == b){
			tester.passed();
		}else{
			tester.failed(text);
		}
	},
	
	passedError: function(){
		tester.passed('Test failed as expected!');
	},
	
	jAjaxonError: function(XMLHttpRequest, textStatus, errorThrown){
		tester.failed('Error Handler : ' + XMLHttpRequest.statusText);
	},
	
	insertHidden:function(a){
		var el = $(document.createElement('div')).css({
			display: 'none'
		});
		el.append(a);
		var div = document.getElementById('ajaxTest');
		$(div).append(el);
	}	 	
};

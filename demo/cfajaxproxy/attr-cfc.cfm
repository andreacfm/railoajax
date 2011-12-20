<h3>cfajaxproxy cfc attribute test cases.</h3>

<cfajaxproxy cfc="demo.cfajaxproxy.files.test" jsclassname="proxy" extends="true"/>
<div id="ajaxTest">
</div>
<script type="text/javascript">
/* test 1 */
var obj1 = new proxy();
obj1.setErrorHandler(tester.jAjaxonError);
function success1(data, textStatus){
	tester.assertEqual(data,1,'test 1 failed - Call with no arguments did not returned the cfc default.');
}	
obj1.setCallbackHandler(success1);
obj1.getData();



/* test 2 */
var obj2 = new proxy();
obj2.setErrorHandler(tester.jAjaxonError);
function success2(data, textStatus){
	tester.assertEqual(data,1000,'Test 2 failed - Passing implicit argument failed');
}	
obj2.setCallbackHandler(success2);
obj2.getData(1000);



/* test 3 */
var obj3 = new proxy();
obj3.setErrorHandler(tester.passedError);
function success3(data, textStatus){
	tester.failed('Test 3 was expecting to fail!');
}	
obj3.setCallbackHandler(success3);
obj3.getData('test');


/* test 4 */
var obj4 = new proxy();
obj4.setErrorHandler(tester.jAjaxonError);
function success4(data, textStatus){
	tester.assertEqual(data,7,'test 4 - Failed call on a method inherited with cfc extends');
}	
obj4.setCallbackHandler(success4);
obj4.getSum(3,4);


/* test 5 */
var obj5 = new proxy();
obj5.setErrorHandler(tester.jAjaxonError);
function success5(data, textStatus){
	if((data['myName'] == 'Andrea') && (data['myAge'] == 35) && (data['myCity'] == 'Milan')){
		tester.passed();
	}else{
		tester.failed('Test 5 - Return Json');		
	}
}
obj5.setCallbackHandler(success5);
obj5.getInfoJson('Andrea','35','Milan');	

/* test 6 */
var obj6 = new proxy();
obj6.setErrorHandler(tester.jAjaxonError);
function success6(data, textStatus){
	if((data['myName'] == 'Andrea') && (data['myAge'] == 35) && (data['myCity'] == 'Milan')){
		tester.passed();
	}else{
		tester.failed('Test 6 - setForm()');		
	}
}
obj6.f = $(document.createElement('form')).attr({id: 'myForm'});
obj6.i = $(document.createElement('input')).attr({name: 'myName'}).val('Andrea');
obj6.i2 = $(document.createElement('input')).attr({name: 'myAge'}).val(35);
obj6.i3 = $(document.createElement('input')).attr({name: 'myCity'}).val('Milan');

$(obj6.f).append(obj6.i);
$(obj6.f).append(obj6.i2);
$(obj6.f).append(obj6.i3);
tester.insertHidden(obj6.f);

obj6.setCallbackHandler(success6);
obj6.setForm('myForm');
obj6.getInfoJson();	

/* test 7 */
var obj7 = new proxy();
obj7.setErrorHandler(tester.jAjaxonError);
function success7(data, textStatus){
		tester.show('setQueryFormat("column") : ' + Railo.Json.encode(data))
}
obj7.setCallbackHandler(success7);
obj7.setForm('myForm');
obj7.setQueryFormat('column');
obj7.getQuery();	

/* test 8 */
var obj8 = new proxy();
var result = obj8.getData(10);
tester.assertEqual(result,10,'Test 8 failed');


/* test 9 */
var str = {myName:'Andrea', myAge:30};
var obj9 = new proxy();
var result = obj9.getInfoJson(str);
tester.assertEqual(result['myName'],'Andrea','Test 9 Failed');
tester.assertEqual(result['myAge'],'30','Test 10 Failed');

/*test 10*/
var obj10 = new proxy();
var result = obj10.getApplicationScope();
tester.assertEqual(result,'RailoAjaxTestDrive','Test 10 ( return Application scope ) Failed');

</script>

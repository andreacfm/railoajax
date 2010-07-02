<script type="text/javascript">
function onError(code,message){
	alert(code + ' - ' + message);
}
</script>

<h2>CFC Bind</h2>
<ul>
	<li>
		The onSuccess function receive 2 arguments:
		<ul>
			<li>data: a json object or a string returned by the cfc.</li>
			<li>textStatus : a string with the status of the ajax call.</li>
		</ul>
	</li>
</ul>
<h3>Bind a single element in the page.</h3>
<pre>
**************************************************************
tag
**************************************************************
&lt;cfcfajaxproxy bind="cfc:RailoAjax.cfajaxproxy.files.test.getName({myForm:myName})" 
onSuccess="updateDiv1" onError="onError"/>

**************************************************************
cfc
**************************************************************
&lt;cffunction name="getName" access="remote" returntype="string">
	&lt;cfargument name="myName" type="string" required="true"/>
	&lt;cfreturn 'My Name is ' & arguments.myName/>
&lt;/cffunction>

**************************************************************
js
**************************************************************
updateDiv1 = function(data, textStatus){							
  document.getElementById('myDiv1').innerHTML = data;			
}										
</pre>
<cfajaxproxy bind="cfc:RailoAjax.cfajaxproxy.files.test.getName({myForm:myName})" onSuccess="updateDiv1" onError="onError"/>	
<script type="text/javascript">								
updateDiv1 = function(data, textStatus){
  document.getElementById('myDiv1').innerHTML = data;			
}										
</script>
<form format="html" id="myForm">
  <label>My Name</label><input type="text" name="myName">
</form>	
<div id="myDiv1" class="result"> </div>


<!------------------------------------------------------------------------------------------------------------------------->
<h3>Bind multiple element on the page.</h3>
<p>The ajax call is made onChange of both the binded element and will send both elements values to cfc.</p>
<p>Element are included in a form with ID myForm2</p>
<p>Cfc return a string</p>
<pre>
**************************************************************
tag
**************************************************************
&lt;cfajaxproxy bind="cfc:RailoAjax.cfajaxproxy.files.test.getInfo({myForm2:myName},{myForm2:myAge})" 
onSuccess="updateDiv2" onError="onError"/>	

**************************************************************
cfc
**************************************************************
&lt;cffunction name="getInfo" access="remote" returntype="string">
	&lt;cfargument name="myName" type="string" required="true"/>
	&lt;cfargument name="myAge" type="numeric" required="true"/>
	&lt;cfreturn 'My Name is ' & arguments.myName & ' and I am ' & arguments.myAge & ' years old.'/>
&lt;/cffunction>

**************************************************************
js
**************************************************************
updateDiv2 = function(data, textStatus){							
  document.getElementById('myDiv2').innerHTML = data;			
}
</pre>
<cfajaxproxy bind="cfc:RailoAjax.cfajaxproxy.files.test.getInfo({myForm2:myName},{myForm2:myAge})" onSuccess="updateDiv2" onError="onError"/>	
<script type="text/javascript">
updateDiv2 = function(data, textStatus){							
  document.getElementById('myDiv2').innerHTML = data;			
}
</script>
<form id="myForm2">
  <label>myName</label><input type="text" name="myName"><br>
  <label>myAge</label><input type="text" name="myAge" value="35">
</form>	
<div id="myDiv2" class="result"></div>


<!------------------------------------------------------------------------------------------------------------------------->
<h3>Change Default Event</h3>
<p>{element@mousedown}</p>
<p>In this example also the element with name 'send' will trigger the binding on 'mouseover'</p>
<pre>
**************************************************************
tag
**************************************************************
&lt;cfajaxproxy 
bind="cfc:RailoAjax.cfajaxproxy.files.test.getInfo({myForm3:myName},{myForm3:myAge},{send@mousedown})" 
onSuccess="updateDiv3" onError="onError"/>	
**************************************************************
cfc
**************************************************************
same as previous
**************************************************************
js
**************************************************************
same as previous
</pre>
<cfajaxproxy bind="cfc:RailoAjax.cfajaxproxy.files.test.getInfo({myForm3:myName},{myForm3:myAge},{send@mousedown})" onSuccess="updateDiv3" onError="onError"/>	
<script type="text/javascript">
updateDiv3 = function(data, textStatus){							
  document.getElementById('myDiv3').innerHTML = data;			
}
</script>
<form id="myForm3">
  <label>myName</label><input type="text" name="myName"><br>
  <label>myAge</label><input type="text" name="myAge" value="35"><br/><br/>
  <input type="button" name="send" class="submitButton" value="Send" /> 
</form>
<div id="myDiv3" class="result"></div>
------------------------------------------------------------------------------------------------
<p>{element@none}</p>
<p>Same as before but in this case the element with '@none' will not react to any event. 
Binding is delegated to the 'mousedown' event on send2 element.</p>
<pre>
**************************************************************
tag
**************************************************************
&lt;cfajaxproxy 
bind="cfc:RailoAjax.cfajaxproxy.files.getInfo({myForm4:myName@none},{myForm4:myAge@none},{send@mousedown})" 
onSuccess="updateDiv4" onError="onError"/>	
**************************************************************
cfc
**************************************************************
same as previous
**************************************************************
js
**************************************************************
same as previous
</pre>
<cfajaxproxy bind="cfc:RailoAjax.cfajaxproxy.files.test.getInfo({myForm4:myName@none},{myForm4:myAge@none},{send2@mousedown})" onSuccess="updateDiv4" onError="onError"/>	
<script type="text/javascript">
updateDiv4 = function(data, textStatus){							
  document.getElementById('myDiv4').innerHTML = data;			
}
</script>
<form id="myForm4">
  <label>myName</label><input type="text" name="myName"><br/>
  <label>myAge</label><input type="text" name="myAge" value="35"><br/><br/>
  <input type="button" name="send2" class="submitButton" value="Send" /> 
</form>

<div id="myDiv4" class="result"></div>

<!------------------------------------------------------------------------------------------------------------------------->
<h3>Argument alias : (arg={myForm2:myName})</h3>
<p>The value of the element with name 'city' will be passed as 'myCity'</p>
<p>In this case cfc return a json string that is evaluated by Railo.Ajax and pushed into listener as a js object.</p>
<pre>
**************************************************************
tag
**************************************************************
&lt;cfajaxproxy 
bind="cfc:RailoAjax.cfajaxproxy.files.getInfoJson({myForm5:myName},{myForm5:myAge},myCity={myForm5:city})" 
onSuccess="updateDiv5" onError="onError"/>	

**************************************************************
cfc
**************************************************************
&lt;cffunction name="getInfoJson" access="remote" returntype="struct">
	&lt;cfargument name="myName" type="string" required="false"/>
	&lt;cfargument name="myAge" type="numeric" required="false" default="20"/>
	&lt;cfargument name="myCity" type="string" required="false" default=""/>
	&lt;cfscript>
		var str = structnew();
		str['myName'] = arguments.myName;
		str['myAge'] = arguments.myAge;
		str['myCity'] = arguments.myCity;			
		return str;
	&lt;/cfscript>
&lt;/cffunction>

**************************************************************
Js Function
**************************************************************
var str = 'My name is ' + data['myName'] + '. I am ' + data['myAge'] + 
' years old and I live in ' + data['myCity'];
document.getElementById('myDiv5').innerHTML = str;			
</pre>

<cfajaxproxy bind="cfc:RailoAjax.cfajaxproxy.files.test.getInfoJson({myForm5:myName},{myForm5:myAge},myCity={myForm5:city})" onSuccess="updateDiv5" onError="onError"/>	
<script type="text/javascript">
updateDiv5 = function(data, textStatus){
	var str = 'My name is ' + data['myName'] + '. I am ' + data['myAge'] + ' years old and I live in ' + data['myCity'];
	document.getElementById('myDiv5').innerHTML = str;			
}
</script>

<form id="myForm5">
  <label>myName</label><input type="text" name="myName"><br>
  <label>myAge</label><input type="text" name="myAge"  value="35"><br>
  <label>city</label><input type="text" name="city">
</form>	
<div id="myDiv5" class="result"></div>

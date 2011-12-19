<script type="text/javascript">
function onError(XMLHttpRequest, textStatus, errorThrown){
	alert(XMLHttpRequest.statusText);
}
</script>
<h2>cfajaxproxy URL Bind</h2>
<h3>Basic.</h3>
<ul>
<li>The cfm page called must return a json string.</li>
<li>If the returned json has a single item this is passed directly as value ( and not has object ) to the onSuccess listner.</li>
</ul>
<p>Example:<br/>
If the cfm page return serializeJson(url.name) the data argument of the updateDiv1 function will be the string<br/> 
'name' and not object{name:name}. This is valid also for cfc bindings.</p>
<pre class="code">
**************************************************************
cfc
**************************************************************
&lt;cfajaxproxy bind="url:/RailoAjax/cfajaxProxy/files/getName.cfm?name={myForm:myName}&age={myForm:myAge}" 
onSuccess="updateDiv1" onError="onError"/>

**************************************************************
cfm
**************************************************************
&lt;cfparam name="url.name" default="" />
&lt;cfparam name="url.age" default="" />
&lt;cfoutput>#serializeJson(url)#&lt;/cfoutput>

**************************************************************
js
**************************************************************
updateDiv1 = function(data, textStatus){							
  document.getElementById('myDiv1').innerHTML = 'My Name is ' + data['NAME'] + ' and I am  ' + data['AGE'] + ' years old';			
}										
</pre>
<cfajaxproxy bind="url:#getContextRoot()#/RailoAjax/cfajaxProxy/files/getName.cfm?name={myForm:myName}&age={myForm:myAge}" onSuccess="updateDiv1" onError="onError"/>	
<script type="text/javascript">								
updateDiv1 = function(data, textStatus){
  document.getElementById('myDiv1').innerHTML = "My Name is " + data['name'] + " and I am  " + data['age'] + " years old";				
}										
</script>
<form format="html" id="myForm">
  <label>My Name</label><input type="text" name="myName"><br>
  <label>My Age</label><input type="text" name="myAge" value="35">
</form>	
<div id="myDiv1" class="result"> </div>

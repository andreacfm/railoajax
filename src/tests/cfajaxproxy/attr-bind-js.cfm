<h2>Javascript Bind</h2>

<!------------------------------------------------------------------------------------------------------------>
<h3>Bind a single element.</h3>
<cfajaxproxy bind="javascript:updateDiv1({myForm:myName})" />	
<script type="text/javascript">								
updateDiv1 = function(data){							
  document.getElementById('myDiv1').innerHTML = data;			
}										
</script>
<p>Bind to a single form element in the page. <br/>
Binding string means : <i>onChange bind value of field with name 'myName'
and look for it into a container with id 'myForm'.</i>
</p>
<pre>
&lt;cfajaxproxy bind="javascript:updateDiv1({myForm:myName})" />	
**************************************************************
Js Function
**************************************************************
updateDiv1 = function(data){							
  document.getElementById('myDiv1').innerHTML = data;			
}										
</pre>
<form id="myForm" action="##">
  <label>myName</label>
  <input type="text" name="myName">
</form>	
<div id="myDiv1" class='result'></div>


<!------------------------------------------------------------------------------------------------------------>
<h3>Bind to multiple fields</h3>
<p>You can bind more that one fields to a js function that act like listener. In this case Railo Ajax 
will pass a literal object to the listener with both the binded values while adobecf simply skip the second argument.</p>
<p>Bind : <i>Event onChange. Bind values of fields with name 'myName' and 'myAge' contained by an element with id 'myForm2'</i></p>
<cfajaxproxy bind="javascript:updateDiv2({myForm2:myName},{myForm2:myAge})" />	
<script type="text/javascript">								
updateDiv2 = function(data){
  var str = 'My name is ' + data["myName"] + ' and I am ' + data["myAge"] + ' years old';
  document.getElementById('myDiv2').innerHTML = str;			
}										
</script>
<pre>
&lt;cfajaxproxy bind="javascript:updateDiv2({myForm2:myName},{myForm2:myAge})" />	

**************************************************************
Js Function
**************************************************************
updateDiv2 = function(data){
  var str = 'My name is ' + data["myName"] + ' and I am ' + data["myAge"] + ' years old';
  document.getElementById('myDiv2').innerHTML = str;			
}										
</pre>
<form id="myForm2">
  <label>myName</label><input type="text" name="myName"><br>
  <label>myAge</label><input type="text" name="myAge">
</form>	
<div id="myDiv2" class="result"></div>

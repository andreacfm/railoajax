<cfajaximport params="#{loadersrc = '/myloader.png'}#">
<script type="text/javascript">
function onError(a,b){
	alert(b);
}
</script>
<h2>cfdiv</h2>
<ul>
	<li>Cfidv bindings always expects plain results. ReturnFormat is always 'plain'.</li> 
	<li>Call a cfc method that return somethign different from a string throw and exception ( use cfajaxproxy instead ).</li>
</ul>


<!--- **************************************************************************************************** --->
<h3>Url Binding</h3>
<p>bindonload="false"</p>
<pre>
&lt;cfdiv 
bind="url:/demo/cfdiv/files/getHTML.cfm?name={myForm2:name}&age={myForm2:age}"
onBindError="onError" 
bindonload="false" 
id="mydiv1"/>
</pre>
<cfdiv bind="url:#getContextRoot()#/demo/cfdiv/files/getHTML.cfm?name={myForm2:name}&age={myForm2:age}" onBindError="onError" bindonload="false" id="mydiv1"/>
<form id="myForm2" format="html">
  <label>Name</label><input type="text" name="name"><br>
  <label>Age</label><input type="text" name="age" value="35">
</form>



<!--- **************************************************************************************************** --->
<h3>Bind onLoad</h3>
<p>As default cfdiv try to bind onload.<br/>
This example div is binded to the same input fields of the previous example but is also updated onLoad.</p>
<p>onChange event both div will be updated.</p>
<pre>
&lt;cfdiv 
bind="url:/demo/cfdiv/files/getHTML.cfm?name={myForm2:name}&age={myForm2:age}"
onBindError="onError" 
id="mydiv1"/>
</pre>
<cfdiv bind="url:#getContextRoot()#/demo/cfdiv/files/getHTML.cfm?name={myForm2:name}&age={myForm2:age}" onBindError="onError" id="mydiv2"/>



<!--- **************************************************************************************************** --->
<h3>Call a cfm page that return a json string.</h3>
<p>Json is treaten like plain text and is not parsed.</p>
<p>In this example we create a 'p' element on page and not a 'div'. ( tagname="p" )</p>
<pre>
&lt;cfdiv 
bind="url:/demo/cfdiv/files/getName.cfm?myname={myForm3:name}&myage={myForm3:age}"
onBindError="onError" 
id="mydiv3" 
tagname="p"/>
</pre>
<cfdiv bind="url:#getContextRoot()#/demo/cfdiv/files/getName.cfm?arg=no_bind&myname={myForm3:name}&myage={myForm3:age}" onBindError="onError" id="mydiv3" tagname="p"/>
<form id="myForm3" format="html">
  <label>Name</label><input type="text" name="name" value="Andrea"><br>
  <label>Age</label><input type="text" name="age" value="35">
</form>



<!--- **************************************************************************************************** --->
<h3>Refresh a Div programmatically.</h3>
<p>While you use a custom ID when you create your div you can programmatically fire the bind using the Railo.Ajax.refresh function.</p>
<p><b>IS IMPORTATNT TO USE YOUR OWN UNIQUE DIV ID TO HAVE LATER CONTROL OVER THEM</b></p> 
<pre>

&lt;input type="button" onclick="Railo.Ajax.refresh('mydiv3')" class="submitButton" value="Refresh div 'mydiv3"/>

</pre>

<input type="button" onclick="Railo.Ajax.refresh('mydiv3')" class="submitButton" value="Refresh div 'mydiv3"/>



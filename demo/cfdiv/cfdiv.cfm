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
<script src="https://gist.github.com/2863851.js?file=cfdiv-1.cfm"></script>
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
<script src="https://gist.github.com/2863851.js?file=cfdiv-2.cfm"></script>
<cfdiv bind="url:#getContextRoot()#/demo/cfdiv/files/getHTML.cfm?name={myForm2:name}&age={myForm2:age}" onBindError="onError" id="mydiv2"/>



<!--- **************************************************************************************************** --->
<h3>Call a cfm page that return a json string.</h3>
<p>Json is treaten like plain text and is not parsed.</p>
<p>In this example we create a 'p' element on page and not a 'div'. ( tagname="p" )</p>
<script src="https://gist.github.com/2863851.js?file=cfdiv-3.cfm"></script>
<cfdiv bind="url:#getContextRoot()#/demo/cfdiv/files/getName.cfm?arg=no_bind&myname={myForm3:name}&myage={myForm3:age}" onBindError="onError" id="mydiv3" tagname="p"/>
<form id="myForm3" format="html">
  <label>Name</label><input type="text" name="name" value="Andrea"><br>
  <label>Age</label><input type="text" name="age" value="35">
</form>


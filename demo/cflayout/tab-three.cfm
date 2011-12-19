<h2>cflayout - tab</h2>
<h3>Ajax and Binding</h3>
<form id="myForm" format="html">
  <label>Name</label><input type="text" name="name"><br>
  <label>Age</label><input type="text" name="age" value="35">
</form>
<pre><br/>
&lt;cflayout type="tab"><br/>
	
	&lt;cflayoutarea title="Static">tab 1&lt;/cflayoutarea><br/>
	
	&lt;cflayoutarea title="Ajax" 
	source="/RailoAjax/cflayout/files/ajax.cfm">tab 2&lt;/cflayoutarea><br/>
	
	&lt;cflayoutarea title="Url Binding" 
	source="/RailoAjax/cflayout/files/getHtml.cfm?name={myForm:name}&age={myForm:age}"
	refreshOnActivate="true"/><br/>
&lt;/cflayout>
</pre>
<cflayout type="tab">
	<cflayoutarea title="Static">tab 1</cflayoutarea>
	<cflayoutarea title="Ajax" source="/RailoAjax/cflayout/files/ajax.cfm">tab 2</cflayoutarea>
	<cflayoutarea title="Url Binding" source="/RailoAjax/cflayout/files/getHtml.cfm?name={myForm:name}&age={myForm:age}" refreshOnActivate="true"/>
</cflayout>

<script type="text/javascript">
function onError(a,b){
	alert(b);
};

function customError(x,s,b){
	$(document.getElementById(b.bindTo)).html('Error ' + x  + ' Message: ' + s);
}

function addHandlers(){
	Railo.Window.onHide('win8',function(n){alert('onHide ' + n);});
	Railo.Window.onShow('win8',function(n){alert('onShow ' + n);});
}

</script>

<h2>cfwindow</h2>
<h3>Basic - Auto Open</h3>
<pre>
**************************************************************
tag
**************************************************************
&lt;cfwindow name="win1" title="win1" 
source="/RailoAjax/cfwindow/files/windowcontentA.cfm" initShow="true"/>

**************************************************************
html
**************************************************************
&lt;button onclick="Railo.Window.show('win1');">Open Win 1</button>
&lt;button onclick="Railo.Window.hide('win1');">Close Win 1</button>
</pre>
<cfwindow name="win1" title="win1" source="#getContextRoot()#/RailoAjax/cfwindow/files/windowcontentA.cfm" initShow="true"/>
<input type="button" class="submitButton" onclick="Railo.Window.show('win1');" value="Open Win 1"/>
<input type="button" class="submitButton" onclick="Railo.Window.hide('win1');" value="Close Win 1"/>

<h3>OnBindError</h3>
<p>The custom error handler receives ( result status, result text , bind object)</p>
<pre>
**************************************************************
js
**************************************************************
function customError(x,s,b){
	$(document.getElementById(b.bindTo)).html('Error ' + x  + ' Message: ' + s);
}

**************************************************************
tag
**************************************************************
&lt;cfwindow 
name="error" 
title="Error Win" 
source="/RailoAjax/cfwindow/files/windowcontent.cfm" 
onBindError="customError"/>
</pre>
<cfwindow name="error" title="Error Win" source="#getContextRoot()#/RailoAjax/cfwindow/files/windowcontent.cfm" onBindError="customError"/>
<input type="button" class="submitButton" onclick="Railo.Window.show('error');" value="Open Win With Binding Error!">

<h3>Binding to elements</h3>
<p>Element name also trigger onChange.</p>
<pre>
**************************************************************
tag
**************************************************************
&lt;cfwindow 
name="win2" 
title="win2" 
source="/RailoAjax/cfwindow/files/getname.cfm?name={form:name}&age={form:age@none}"
RefreshOnShow="true"/>
**************************************************************
html
**************************************************************
&lt;form id="form" format="html">
  &lt;label>Name&lt;/label>&lt;input type="text" name="name">
  &lt;label>Age&lt;/label>&lt;input type="text" name="age">
&lt;/form>

&lt;button onclick="Railo.Window.show('win2');">Open Win 2</button>
</pre>
<form id="form" format="html">
  <label>Name</label><input type="text" name="name"><br>
  <label>Age</label><input type="text" name="age"><br/><br/>
  <input type="button" class="submitButton" onclick="Railo.Window.show('win2');" value="Open Win 2"/>
</form>
<cfwindow name="win2" title="win2" source="#getContextRoot()#/RailoAjax/cfwindow/files/getname.cfm?name={form:name@none}&age={form:age@none}" RefreshOnShow="true"/>

<h3>Modal</h3>
<pre>
**************************************************************
tag
**************************************************************
&lt;cfwindow 
name="win3" 
title="win3" 
source="/RailoAjax/cfwindow/files/modal.cfm" 
modal='true'/>

**************************************************************
html
**************************************************************
&lt;button onclick="Railo.Window.show('win3');">Open Win 3</button>
</pre>
<cfwindow name="win3" title="win3" source="#getContextRoot()#/RailoAjax/cfwindow/files/modal.cfm" modal='true'/>
<input type="button" class="submitButton" onclick="Railo.Window.show('win3');" value="Open Win 3"/>

<h3>RefreshOnShow : true</h3>
<p>Reload the window content any time window is opened.</p>
<pre>
&lt;cfwindow 
name="win4" title="win4" 
source="/RailoAjax/cfwindow/files/windowrefresh.cfm" RefreshOnShow="true"/>
</pre>
<cfwindow name="win4" title="win4" source="#getContextRoot()#/RailoAjax/cfwindow/files/windowrefresh.cfm" RefreshOnShow="true"/>
<input type="button" class="submitButton" onclick="Railo.Window.show('win4');" value="Open Win 4"/>
<input type="button" class="submitButton" onclick="Railo.Window.hide('win4');" value="Close Win 4"/>

<h3>Start and Min Dimensions</h3>
<pre>
&lt;cfwindow name="win5" title="win5" 
source="/RailoAjax/cfwindow/files/windownorefresh.cfm" 
width="700" height="500" minHeight="400" minWidth="400"/>
</pre>
<cfwindow name="win5" title="win5" source="#getContextRoot()#/RailoAjax/cfwindow/files/windownorefresh.cfm" width="700" height="500" minHeight="400" minWidth="400"/>
<input type="button" class="submitButton" onclick="Railo.Window.show('win5');" value="Open Win 5" />
<input type="button" class="submitButton" onclick="Railo.Window.hide('win5');" value="Close Win 5" />

<h3>No draggable and no resizable.</h3>
<pre>
&lt;cfwindow 
	name="win6" 
	title="win6" 
	draggable="false" 
	resizable="false">
	...............................
&lt;/cfwindow>
</pre>
<cfwindow name="win6" title="win6" draggable="false" resizable="false">
	<p>This window cannot be resized and dragged.</p>
	<p>This content is the body of the cfwindow tag and is not pulled by ajax.</p>
</cfwindow>
<input type="button" class="submitButton" onclick="Railo.Window.show('win6');" value="Open Win 6"/>
<input type="button" class="submitButton" onclick="Railo.Window.hide('win6');" value="Close Win 6"/>

<h3>Position X and Y</h3>
<pre>
**************************************************************
tag
**************************************************************
&lt;cfwindow 
name="win3" 
title="win3" 
source="/RailoAjax/cfwindow/files/modal.cfm" 
modal='true' x="0" y="0"/>

**************************************************************
html
**************************************************************
&lt;button onclick="Railo.Window.show('win7');">Open Win 3</button>
</pre>
<cfwindow name="win7" title="win 7" source="#getContextRoot()#/RailoAjax/cfwindow/files/modal.cfm" modal='true' x="0" y="0"/>
<input type="button" class="submitButton" onclick="Railo.Window.show('win7');" value="Open Win 7"/>


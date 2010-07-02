<cfajaximport params="#{jsLib = 'ext'}#" />

<h2>Ext Library</h2>
<br/>
<p>The same examples using ext interface</p>
<p>Enable the Ext library Globally for any UI tag in the page.</p>
<pre>
<br/>
&lt;cfajaximport params="#{jsLib = 'ext'}#" />
<br/>
</pre>
<p>Or for a single tag use the "lslib" attribute ( int this way will still be possible for another tag to ask for a different library )</p>
<pre>
<br/>
&lt;cfwindow jslib="ext" />
<br/>
</pre>

<script type="text/javascript">
function onError(a,b){
	alert(b);
};

function customError(x,s,b){
	Railo.Window.getWindowObject(b.bindTo).body.update('Error ' + x  + ' Message: ' + s);
}

function addHandlers(){
	Railo.Window.onHide('win8',function(n){alert('onHide ' + n);});
	Railo.Window.onShow('win8',function(n){alert('onShow ' + n);});
}
</script>

<h3>Basic - Auto Open</h3>
<cfwindow name="win1" title="win1" source="#getContextRoot()#/RailoAjax/cfwindow/files/windowcontentA.cfm" initShow="true"/>
<input type="button" class="submitButton" onclick="Railo.Window.show('win1');" value="Open Win 1"/>
<input type="button" class="submitButton" onclick="Railo.Window.hide('win1');" value="Close Win 1"/>

<h3>OnBindError</h3>
<p>The custom error handler receives ( result status, result text , bind object)</p>
<cfwindow name="error" title="Error Win" source="#getContextRoot()#/RailoAjax/cfwindow/files/windowcontent.cfm" onBindError="customError"/>
<input type="button" class="submitButton" onclick="Railo.Window.show('error');" value="Open Win With Binding Error!">

<h3>Binding to elements</h3>
<p>Element name also trigger onChange.</p>
<form id="form" format="html">
  <label>Name</label><input type="text" name="name"><br>
  <label>Age</label><input type="text" name="age"><br/><br/>
  <input type="button" class="submitButton" onclick="Railo.Window.show('win2');" value="Open Win 2"/>
</form>
<cfwindow name="win2" title="win2" source="#getContextRoot()#/RailoAjax/cfwindow/files/getname.cfm?name={form:name}&age={form:age@none}" RefreshOnShow="true"/>

<h3>Modal</h3>
<cfwindow name="win3" title="win3" source="#getContextRoot()#/RailoAjax/cfwindow/files/modal.cfm" modal='true'/>
<input type="button" class="submitButton" onclick="Railo.Window.show('win3');" value="Open Win 3"/>

<h3>RefreshOnShow : true</h3>
<p>Reload the window content any time window is opened.</p>
<cfwindow name="win4" title="win4" source="#getContextRoot()#/RailoAjax/cfwindow/files/windowrefresh.cfm" RefreshOnShow="true"/>
<input type="button" class="submitButton" onclick="Railo.Window.show('win4');" value="Open Win 4"/>
<input type="button" class="submitButton" onclick="Railo.Window.hide('win4');" value="Close Win 4"/>

<h3>Start and Min Dimensions</h3>
<cfwindow name="win5" title="win5" source="#getContextRoot()#/RailoAjax/cfwindow/files/windownorefresh.cfm" width="700" height="500" minHeight="400" minWidth="400"/>
<input type="button" class="submitButton" onclick="Railo.Window.show('win5');" value="Open Win 5" />
<input type="button" class="submitButton" onclick="Railo.Window.hide('win5');" value="Close Win 5" />

<h3>No draggable and no resizable.</h3>
<cfwindow name="win6" title="win6" draggable="false" resizable="false">
	<div class="x-window-body">
		<p>This window cannot be resized and dragged.</p>
		<p>This content is the body of the cfwindow tag and is not pulled by ajax.</p>
		<b>Ext require that the static html is surrounded by a div with class "x-window-body" to be correctly displayed.</b>
	</div>
</cfwindow>
<input type="button" class="submitButton" onclick="Railo.Window.show('win6');" value="Open Win 6"/>
<input type="button" class="submitButton" onclick="Railo.Window.hide('win6');" value="Close Win 6"/>
<h3>Create Programmatically.</h3>
<input type="button" class="submitButton" onclick="Railo.Window.create('win7','win7','<cfoutput>#getContextRoot()#</cfoutput>/RailoAjax/cfwindow/files/fly.cfm',{initShow:true})" value="Create Win 7"/>
<input type="button" class="submitButton" onclick="Railo.Window.show('win7');" value="Open Win 7"/>
<input type="button" class="submitButton" onclick="Railo.Window.hide('win7');" value="Close Win 7"/>

<h3>OnShow - OnHide</h3>
<input type="button" class="submitButton" onclick="Railo.Window.create('win8','win8','<cfoutput>#getContextRoot()#</cfoutput>/RailoAjax/cfwindow/files/fly.cfm',{initShow:true});addHandlers();" value="Create Win 8"/>
<input type="button" class="submitButton" onclick="Railo.Window.show('win8');" value="Open Win 8"/>
<input type="button" class="submitButton" onclick="Railo.Window.hide('win8');" value="Close Win 8" />
<h3>Buttons and callbacks</h3>
<pre>
<br/>
Railo.Window.create(
	'win9',
	'win9',
	'<cfoutput>#getContextRoot()#</cfoutput>/RailoAjax/cfwindow/files/fly.cfm',
	{initShow:true,
		buttons:[{
				text : 'Ok',
				handler:function(button){
					alert('Button ' + button.getText() + ' has been pressed!');
				}	
			},
			{
				text : 'Close'
				handler:function(button){
					Railo.Window.getWindowObject('win9').hide();
				}	
			}]
	});
<br/>
</pre>
<script type="text/javascript">
function makeWinWithButtons(){
	Railo.Window.create(
		'win9',
		'win9',
		'<cfoutput>#getContextRoot()#</cfoutput>/RailoAjax/cfwindow/files/fly.cfm',
		{initShow:true,
			buttons:[{
					text : 'Ok',
					handler:function(button){
						alert('Button ' + button.getText() + ' has been pressed!');
					}	
				},
				{
					text : 'Close',
					handler:function(button){
						Railo.Window.getWindowObject('win9').hide();
					}	
				}]
		});
}
</script>
<input type="button" class="submitButton" onclick="makeWinWithButtons();" value="Create Win 9"/>
<input type="button" class="submitButton" onclick="Railo.Window.show('win9');" value="Open Win 9"/>
<input type="button" class="submitButton" onclick="Railo.Window.hide('win9');" value="Close Win 9"/>


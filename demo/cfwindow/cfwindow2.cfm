<cfajaximport tags="CFWINDOW" />
<script type="text/javascript">
function onError(a,b){
	alert(b);
};

function addHandlers(){
	Railo.Window.onHide('win8',function(n){alert('onHide ' + n);});
	Railo.Window.onShow('win8',function(n){alert('onShow ' + n);});
}
</script>

<h2>cfwindow</h2>
<h3>Create Programmatically.</h3>
<pre>
**************************************************************
html
**************************************************************
&lt;button 
onclick="Railo.Window.create(
	'win7','win7','/RailoAjax/cfwindow/files/fly.cfm',{initShow:true})">
	Create Win 7
&lt;/button>

&lt;button onclick="Railo.Window.show('win7');">Open Win 7&lt;/button>
&lt;button onclick="Railo.Window.hide('win7');">Close Win 7&lt;/button>
</pre>
<input type="button" class="submitButton" onclick="Railo.Window.create('win7','win7','<cfoutput>#getContextRoot()#</cfoutput>/RailoAjax/cfwindow/files/fly.cfm',{initShow:true})" value="Create Win 7"/>
<input type="button" class="submitButton" onclick="Railo.Window.show('win7');" value="Open Win 7"/>
<input type="button" class="submitButton" onclick="Railo.Window.hide('win7');" value="Close Win 7"/>

<h3>OnShow - OnHide</h3>
<pre>
**************************************************************
js
**************************************************************
function addHandlers(){
	Railo.Window.onHide('win8',function(n){alert('onHide ' + n);});
	Railo.Window.onShow('win8',function(n){alert('onShow ' + n);});
}

**************************************************************
html
**************************************************************
&lt;button 
onclick="Railo.Window.create(
'win8','win8','/RailoAjax/cfwindow/files/fly.cfm',{initShow:true});addHandlers();">
Create Win 8
%lt;/button>

&lt;button onclick="Railo.Window.show('win8');">Open Win 8&lt;/button>
&lt;button onclick="Railo.Window.hide('win8');">Close Win 8&lt;/button>
</pre>
<input type="button" class="submitButton" onclick="Railo.Window.create('win8','win8','<cfoutput>#getContextRoot()#</cfoutput>/RailoAjax/cfwindow/files/fly.cfm',{initShow:true});addHandlers();" value="Create Win 8"/>
<input type="button" class="submitButton" onclick="Railo.Window.show('win8');" value="Open Win 8"/>
<input type="button" class="submitButton" onclick="Railo.Window.hide('win8');" value="Close Win 8" />

<input type="button" value="test"
onclick="Railo.Window.create('winPreview','Question Block','<cfoutput>#getContextRoot()#</cfoutput>/RailoAjax/cfwindow/files/fly.cfm', {initShow:true,height:400,width:700,modal:true,closable:false,draggable:true,resizable:true,center:true,initshow:true,minHeight:200,minWidth:200});">


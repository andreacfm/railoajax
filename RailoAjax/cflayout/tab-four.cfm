<h2>Cf-layout Tab</h2>
<h3>Callbacks</h3>
<p>Tag allow to set a series of callback to customize your tabs acting on events.</p>
<ul>
	<li>TabsSelect</li>
	<li>TabsLoad</li>
	<li>TabsEnable</li>
	<li>TabsDisable</li>
	<li>TabsAdd</li>
	<li>TabsRemove</li>
</ul>
<p>Any callback must accepts 2 arguments as per jquery ui docs:</p>
<pre>
Event binding example:

function(event, ui) {

    // Objects available in the function context:
    ui.tab     // anchor element of the tab
    ui.panel   // element, that contains tab contents
    ui.index   // zero-based index 

}
</pre>
<p>Page Code</p>
<pre>
**************************************************************
js
**************************************************************
&lt;script type="text/javascript">
function selectCallback(event,ui){
	alert('Selected tab n. ' + ui.index);
}
function addCallback(event,ui){
	alert('Added tab n. '  + ui.index);
}
function removeCallback(event,ui){
	alert('Removed tab n. '  + ui.index);
}
function enableCallback(event,ui){
	alert('Enabled tab n. ' + ui.index);
}
function disableCallback(event,ui){
	alert('Disabled tab n. ' + ui.index);
}
function loadCallback(event,ui){
	alert('Loaded tab n. ' + ui.index);
}
&lt;/script>

**************************************************************
tag
**************************************************************
&lt;cflayout type="tab" name="callbackTest" tabsenable="enableCallback" 
          tabsdisable="disableCallback" tabsadd="addCallback" tabsremove="removeCallback" 
		  tabsselect="selectCallback" tabsload="loadCallback">
	&lt;cflayoutarea title="One">tab 1&lt;/cflayoutarea>
	&lt;cflayoutarea title="Two" disabled="true" name="disabled1">tab 2&lt;/cflayoutarea>
	&lt;cflayoutarea title="Three" disabled="true" name="disabled2">tab 3&lt;/cflayoutarea>
&lt;/cflayout>

**************************************************************
html
**************************************************************
&lt;ul>
	&lt;li>&lt;a href="javascript:ColdFusion.Layout.enableTab('callbackTest','disabled1')">Enable Tab 2&lt;/a>&lt;/li>
	&lt;li>&lt;a href="javascript:ColdFusion.Layout.disableTab('callbackTest','disabled1')">Disable Tab 2&lt;/a>&lt;/li>	
	&lt;li>&lt;a href="javascript:ColdFusion.Layout.enableTab('callbackTest','disabled2')">Enable Tab 3&lt;/a>&lt;/li>
	&lt;li>&lt;a href="javascript:ColdFusion.Layout.disableTab('callbackTest','disabled2')">Disable Tab 3&lt;/a>&lt;/li>
 	&lt;li>
		&lt;a href="javascript:ColdFusion.Layout.createTab('callbackTest','','New Tab',
		'/RailoAjax/cflayout/files/ajax.cfm',{refreshOnActivate:false})">Add a New Tab.&lt;/a>
	&lt;/li>	
 	&lt;li>
 		&lt;a href="javascript:ColdFusion.Layout.removeLastTab('callbackTest')">Remove Last Tab.&lt;/a>
	&lt;/li>

&lt;/ul>

</pre>
<script type="text/javascript">
function selectCallback(event,ui){
	alert('Selected tab n. ' + ui.index);
}
function addCallback(event,ui){
	alert('Added tab n. '  + ui.index);
}
function removeCallback(event,ui){
	alert('Removed tab n. '  + ui.index);
}
function enableCallback(event,ui){
	alert('Enabled tab n. ' + ui.index);
}
function disableCallback(event,ui){
	alert('Disabled tab n. ' + ui.index);
}
function loadCallback(event,ui){
	alert('Loaded tab n. ' + ui.index);
}
</script>

<cflayout type="tab" name="callbackTest" tabsenable="enableCallback" 
          tabsdisable="disableCallback" tabsadd="addCallback" tabsremove="removeCallback" 
		  tabsselect="selectCallback" tabsload="loadCallback">
	<cflayoutarea title="One">tab 1</cflayoutarea>
	<cflayoutarea title="Two" disabled="true" name="disabled1">tab 2</cflayoutarea>
	<cflayoutarea title="Three" disabled="true" name="disabled2">tab 3</cflayoutarea>
</cflayout>

<ul>
	<li><a href="javascript:ColdFusion.Layout.enableTab('callbackTest','disabled1')">Enable Tab 2</a></li>
	<li><a href="javascript:ColdFusion.Layout.disableTab('callbackTest','disabled1')">Disable Tab 2</a></li>	
	<li><a href="javascript:ColdFusion.Layout.enableTab('callbackTest','disabled2')">Enable Tab 3</a></li>
	<li><a href="javascript:ColdFusion.Layout.disableTab('callbackTest','disabled2')">Disable Tab 3</a></li>
 	<li>
		<a href="javascript:ColdFusion.Layout.createTab('callbackTest','','New Tab',
		'/RailoAjax/cflayout/files/ajax.cfm',{refreshOnActivate:false})">Add a New Tab.</a>
	</li>	
 	<li>
 		<a href="javascript:ColdFusion.Layout.removeLastTab('callbackTest')">Remove Last Tab.</a>
	</li>

</ul>

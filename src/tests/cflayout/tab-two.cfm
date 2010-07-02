<h2>cflayout - tab</h2>
<h3>Selected</h3>
<p>Choose whitch tab start opened</p>
<pre>
&lt;cflayout type="tab">
	&lt;cflayoutarea title="One">tab 1&lt;/cflayoutarea>
	&lt;cflayoutarea title="Two" selected="true">tab 2&lt;/cflayoutarea>
&lt;/cflayout>
</pre>
<cflayout type="tab">
	<cflayoutarea title="One">tab 1</cflayoutarea>
	<cflayoutarea title="Two" selected="true">tab 2</cflayoutarea>
</cflayout>

<h3>Diasable / Enable</h3>
<p>Select witch tab start in disabled mode and enable via js.</p>
<ul>
	<li>When a tab is selected cannot be disabled. Select another tab before.</li>
	<li>When a tab is enabled also receive focus.</li>
</ul>
<pre>
&lt;cflayout type="tab">
	&lt;cflayoutarea title="One">tab 1&lt;/cflayoutarea>
	&lt;cflayoutarea title="Two" selected="true">tab 2&lt;/cflayoutarea>
&lt;/cflayout>
</pre>
<cflayout type="tab" name="disabledTest">
	<cflayoutarea title="One">tab 1</cflayoutarea>
	<cflayoutarea title="Two" disabled="true" name="disabled1">tab 2</cflayoutarea>
	<cflayoutarea title="Three" disabled="true" name="disabled2">tab 3</cflayoutarea>
</cflayout>
<ul>
	<li><a href="javascript:ColdFusion.Layout.enableTab('disabledTest','disabled1')">Enable Tab 2</a></li>
	<li><a href="javascript:ColdFusion.Layout.disableTab('disabledTest','disabled1')">Disable Tab 2</a></li>	
	<li><a href="javascript:ColdFusion.Layout.enableTab('disabledTest','disabled2')">Enable Tab 3</a></li>
	<li><a href="javascript:ColdFusion.Layout.disableTab('disabledTest','disabled2')">Disable Tab 3</a></li>
</ul>
<br/>

<h3>Add and remove tabs programamtically.</h3>
<p>New tab can be added and removed programmatically via js.</p>
<p>By default a new is appended while you can also decide the right position you wan to place it passing an index reference.</p>
<cflayout type="tab" name="addRemoveTest">
	<cflayoutarea title="One">tab 1</cflayoutarea>
</cflayout>
<p>Add remove tab based on position.</p>
<ul>
 	<li>
		<a href="javascript:ColdFusion.Layout.createTab('addRemoveTest','','New Tab','/RailoAjax/cflayout/files/ajax.cfm',{index:0,refreshOnActivate:false})">Prepend a new Tab.</a>
	</li>	
 	<li>
		<a href="javascript:ColdFusion.Layout.createTab('addRemoveTest','','New Tab','/RailoAjax/cflayout/files/ajax.cfm',{refreshOnActivate:false})">Add a New Tab at the End.</a>
	</li>	
 	<li>
 		<a href="javascript:ColdFusion.Layout.removeLastTab('addRemoveTest')">Remove Last Tab.</a>
	</li>
</ul>
<p>Add remove tab based on ID. Please note that you cannot add a tab with the same name twice.</p>
<ul>
	<li><a href="javascript:ColdFusion.Layout.createTab('addRemoveTest','myTab','MyTab','/RailoAjax/cflayout/files/ajax.cfm',{refreshOnActivate:false,selected:true})">Add a Tab with name 'myTab'</a></li>
	<li><a href="javascript:ColdFusion.Layout.removeTab('addRemoveTest','myTab')">Remove MyTab</a></li>
</ul>
<h2>cflayout - tab</h2>

<h3>Basic Tab Layout</h3>
<ul>
	<li>name attributes are generated to be unique. If you need to have interaction via js you will like to give 
	a personalized name ( id ). Be aware that <b>NAME MUST BE UNIQUE IN THE WHOLE PAGE</b> and not just in a single layout.</li>
</ul>
<p>Basic Tab layout is statically based on cflayoutarea children and their generated content.</p>
<pre>
&lt;cflayout type="tab">
	&lt;cflayoutarea name="tab1" title="One"> tab 1 &lt;/cflayoutarea>
	&lt;cflayoutarea name="tab2" title="Two"> tab 2 &lt;/cflayoutarea>
&lt;/cflayout>
</pre>

<cflayout type="tab">
	<cflayoutarea title="One"> tab 1 </cflayoutarea>
	<cflayoutarea title="Two"> tab 2 </cflayoutarea>
</cflayout>

<h3>General Styling of the layout container.</h3>
<p>The 'style' attribute will be added to the layout container div.<br/> 
The tabHeight attributes will be added in the same way with the the 'height' css property declaration.</p>
<pre>
&lt;cflayout type="tab" tabHeight="250" style="font-size:20px;"> 
	&lt;cflayoutarea title="One"> tab 1 &lt;/cflayoutarea>
	&lt;cflayoutarea title="Two"> tab 2 &lt;/cflayoutarea>
&lt;/cflayout>
</pre>

<cflayout type="tab" tabHeight="250" style="font-size:20px;">
	<cflayoutarea title="One">tab 1</cflayoutarea>
	<cflayoutarea title="Two">tab 2</cflayoutarea>
</cflayout>

<h3>Styling of the tab panel container</h3>
<p>A style attribute can be aplied to any cflayoutarea tag and will be attached to tha single tab container.</p>
<p>Also the overflow can be customized for any single tab. Default is auto. Other values can be any value will make sense
to be passed to the overflow css statement.</p>

<p><i>Note that only the first tab is styled whiel tab 2 use an hidden policy for the overflow content.</i></p>
<pre>
&lt;cflayout type="tab" tabHeight="100">
	&lt;cflayoutarea title="One" style="background-color:red;">
		Lorem ipsum dolor sit amet...
	&lt;/cflayoutarea>
	&lt;cflayoutarea title="Two" overflow="hidden">
		Lorem ipsum dolor sit amet...
	&lt;/cflayoutarea>
	&lt;cflayoutarea title="Three">tab 2&lt;/cflayoutarea>
&lt;/cflayout>
</pre>

<cflayout type="tab" tabHeight="100">
	<cflayoutarea title="One" style="background-color:red;">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tortor nibh, blandit ac pellentesque vitae, malesuada sed odio. Donec id tellus tellus, eget lacinia ante. Sed urna erat, molestie at commodo eu, tristique et ipsum. Nullam vel nibh sed nibh imperdiet bibendum vitae ut ligula. Aliquam posuere consectetur neque quis dignissim. Ut placerat tincidunt lectus, eget convallis elit ullamcorper non. Curabitur fermentum hendrerit placerat. Aliquam porta convallis congue. Vivamus vitae massa metus, at hendrerit augue. Nam in diam nec ante vehicula laoreet et eget ligula. Proin molestie congue iaculis. Pellentesque vitae nibh eu felis hendrerit pellentesque. Proin ullamcorper fermentum rhoncus. Integer sit amet libero mauris, ut ultrices nisi. Vestibulum velit libero, laoreet eget viverra at, egestas vitae nisi. Nunc nibh purus, dignissim ac pretium id, volutpat vel nisi.
		Vivamus vitae blandit odio. Curabitur sagittis viverra varius. Phasellus lectus justo, elementum non rhoncus lobortis, pulvinar a orci. Praesent eget malesuada leo. Donec luctus, augue porttitor varius fermentum, neque nulla aliquam lectus, in congue tellus est non augue. Cras mattis lorem fermentum lorem egestas quis pulvinar mauris consectetur. Sed dignissim libero nec est viverra scelerisque egestas nisl egestas. In tristique iaculis mauris, eget facilisis orci dictum nec. Pellentesque at magna mauris. Suspendisse potenti. Etiam nisl neque, eleifend in sollicitudin sit amet, tempor sit amet diam. Donec faucibus fermentum nunc, in consequat libero scelerisque nec. Mauris enim neque, dapibus quis dignissim sit amet, dapibus vitae dui. Maecenas ut turpis quis velit fermentum sodales in volutpat magna. Ut aliquam mi eu nunc vehicula tincidunt.
		Praesent pulvinar varius mattis. Donec in nisi enim. Etiam elementum nisi in nisi elementum volutpat. Curabitur nec interdum metus. Etiam enim nulla, lacinia congue pharetra non, molestie vel nunc. Nunc interdum porta tincidunt. Vivamus a nibh eget sem viverra elementum. Curabitur non ante a erat consectetur commodo eget eget leo. Aenean ut arcu ornare nisl aliquam vestibulum quis sit amet metus. Duis posuere accumsan diam, ac sodales sapien mattis quis. Vestibulum et massa at tortor congue tempus. Sed blandit lacus at dui tincidunt tempus. Pellentesque sed nisl est, vitae pellentesque enim. Pellentesque viverra libero vel nisl porttitor viverra. </cflayoutarea>
	<cflayoutarea title="Two" overflow="hidden">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tortor nibh, blandit ac pellentesque vitae, malesuada sed odio. Donec id tellus tellus, eget lacinia ante. Sed urna erat, molestie at commodo eu, tristique et ipsum. Nullam vel nibh sed nibh imperdiet bibendum vitae ut ligula. Aliquam posuere consectetur neque quis dignissim. Ut placerat tincidunt lectus, eget convallis elit ullamcorper non. Curabitur fermentum hendrerit placerat. Aliquam porta convallis congue. Vivamus vitae massa metus, at hendrerit augue. Nam in diam nec ante vehicula laoreet et eget ligula. Proin molestie congue iaculis. Pellentesque vitae nibh eu felis hendrerit pellentesque. Proin ullamcorper fermentum rhoncus. Integer sit amet libero mauris, ut ultrices nisi. Vestibulum velit libero, laoreet eget viverra at, egestas vitae nisi. Nunc nibh purus, dignissim ac pretium id, volutpat vel nisi.
		Vivamus vitae blandit odio. Curabitur sagittis viverra varius. Phasellus lectus justo, elementum non rhoncus lobortis, pulvinar a orci. Praesent eget malesuada leo. Donec luctus, augue porttitor varius fermentum, neque nulla aliquam lectus, in congue tellus est non augue. Cras mattis lorem fermentum lorem egestas quis pulvinar mauris consectetur. Sed dignissim libero nec est viverra scelerisque egestas nisl egestas. In tristique iaculis mauris, eget facilisis orci dictum nec. Pellentesque at magna mauris. Suspendisse potenti. Etiam nisl neque, eleifend in sollicitudin sit amet, tempor sit amet diam. Donec faucibus fermentum nunc, in consequat libero scelerisque nec. Mauris enim neque, dapibus quis dignissim sit amet, dapibus vitae dui. Maecenas ut turpis quis velit fermentum sodales in volutpat magna. Ut aliquam mi eu nunc vehicula tincidunt.
		Praesent pulvinar varius mattis. Donec in nisi enim. Etiam elementum nisi in nisi elementum volutpat. Curabitur nec interdum metus. Etiam enim nulla, lacinia congue pharetra non, molestie vel nunc. Nunc interdum porta tincidunt. Vivamus a nibh eget sem viverra elementum. Curabitur non ante a erat consectetur commodo eget eget leo. Aenean ut arcu ornare nisl aliquam vestibulum quis sit amet metus. Duis posuere accumsan diam, ac sodales sapien mattis quis. Vestibulum et massa at tortor congue tempus. Sed blandit lacus at dui tincidunt tempus. Pellentesque sed nisl est, vitae pellentesque enim. Pellentesque viverra libero vel nisl porttitor viverra. </cflayoutarea>
	<cflayoutarea title="Three">tab 3</cflayoutarea>
</cflayout>


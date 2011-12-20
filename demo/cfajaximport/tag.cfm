<h2>Using the TAGS attribute</h2>
<p>This page use a cfdiv to load a remote content. This content include the ability to create a window. 
The resources for managing the window are not already in the page and are not event loaded in the remote content 
so you need to laod them via cfajaximport using the tags attribute. 
</p>

<p>This page code</p>
<pre>
 &lt;cfajaximport tag="CFWINDOW"/>
 &lt;cfdiv bind="url:/demo/cfajaximport/files/openwindow.cfm"/>
</pre>
 <cfajaximport tags="CFWINDOW"/>
 <p>This content is loaded via ajax on page load.</p>
 <cfdiv bind="url:/demo/cfajaximport/files/openwindow.cfm"/>


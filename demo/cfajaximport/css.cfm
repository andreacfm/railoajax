<h2>Change Skin</h2>
<h3>This Page open a cfwindow after that cfajaximport has changed the css path.</h3>
<ul>
	<li>Cfajaximport must be at the top of the page before any other ajax tag.</li>
	<li>
		The cssSrc attribute must point to a directory where you can place your custom css resources. Note that this folder
		must reproduce the original RailoAjax css folder structure. More on docs about this.
	</li>
	<li>Any css file must have .cfm extension and declare <strong>cfcontent tag type="text/css"</strong> at the top of the page.</li>	
	
</ul>
<p>RailoSkin.css.cfm</p>
<pre>
&lt;cfcontent type="text/css">
.... css rules ...
</pre>

<p>This page code</p>
<pre>
 &lt;cfajaximport csssrc="/RailoAjax/cfajaximport/css/"/>
 &lt;cfwindow name="win1" source="#getContextRoot()#/RailoAjax/cfajaximport/files/changecss.cfm" 
      initShow="true"/>	  
</pre>

 <cfajaximport csssrc="/RailoAjax/cfajaximport/css/"/>
 <cfwindow name="win1" source="#getContextRoot()#/RailoAjax/cfajaximport/files/changecss.cfm" 
      initShow="true"/>

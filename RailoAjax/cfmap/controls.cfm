<cfset key = 'ABQIAAAAeu0Td2YVlOPq6y8EytJWJBT2yXp_ZAY8_ufC3CFXhHIE1NvwkxTZumvxeaCz-DWk43YtoFFAKySnsA' />
<cfif findNoCase('projects.getrailo.org',cgi.http_host)>
	 <cfset key = 'ABQIAAAAeu0Td2YVlOPq6y8EytJWJBQrwY-N4pzRBQldrVz4T-XjvwgWPxRM3fX3k_q_DOCaBZuweff1O-lTwg' />
</cfif>

<cfajaximport params="#{googlemapkey = key }#" />

<h2>Map Type Coontrol </h2>

<p>Default is basic</p>

<h3>none</h3>
<pre>
&lt;cfmap width="400" height="400" 
		centeraddress="345 Park Avenue, san jose, CA 95110-2704, USA" 
		zoomlevel="9" 
		typecontrol="none"/>

</pre>
<cfmap width="400" height="400" 
		centeraddress="345 Park Avenue, san jose, CA 95110-2704, USA" 
		zoomlevel="9" 
		typecontrol="none"/>
		
<h3>basic</h3>
<pre>
&lt;cfmap width="400" height="400" 
		centeraddress="345 Park Avenue, san jose, CA 95110-2704, USA" 
		zoomlevel="9" />
</pre>
<cfmap width="400" height="400" 
		centeraddress="345 Park Avenue, san jose, CA 95110-2704, USA" 
		zoomlevel="9" />
		
<h3>advanced</h3>
<pre>
&lt;cfmap width="400" height="400" 
		centeraddress="345 Park Avenue, san jose, CA 95110-2704, USA" 
		zoomlevel="9" 
		typecontrol="advanced"/>

</pre>
<cfmap width="400" height="400" 
		centeraddress="345 Park Avenue, san jose, CA 95110-2704, USA" 
		zoomlevel="9" 
		typecontrol="advanced"/>


<h2>Zoom Coontrol </h2>
<p>Default is 'small'</p>

<h3>none</h3>
<pre>
&lt;cfmap width="400" height="400" 
		centeraddress="345 Park Avenue, san jose, CA 95110-2704, USA" 
		zoomlevel="9" 
		zoomcontrol="none"/>	
</pre>
<cfmap width="400" height="400" 
		centeraddress="345 Park Avenue, san jose, CA 95110-2704, USA" 
		zoomlevel="9" 
		zoomcontrol="none"/>
		
<h3>small</h3>
<pre>
&lt;cfmap width="400" height="400" 
		centeraddress="345 Park Avenue, san jose, CA 95110-2704, USA" 
		zoomlevel="9"/>	
</pre>
<cfmap width="400" height="400" 
		centeraddress="345 Park Avenue, san jose, CA 95110-2704, USA" 
		zoomlevel="9"/>
		
<h3>large</h3>
<pre>
&lt;cfmap width="400" height="400" 
		centeraddress="345 Park Avenue, san jose, CA 95110-2704, USA" 
		zoomlevel="9" 
		zoomcontrol="large"/>	
</pre>
<cfmap width="400" height="400" 
		centeraddress="345 Park Avenue, san jose, CA 95110-2704, USA" 
		zoomlevel="9" 
		zoomcontrol="large"/>

<h3>small3d</h3>
<pre>
&lt;cfmap width="400" height="400" 
		centeraddress="345 Park Avenue, san jose, CA 95110-2704, USA" 
		zoomlevel="9" 
		zoomcontrol="small3d"/>	
</pre>
<cfmap width="400" height="400" 
		centeraddress="345 Park Avenue, san jose, CA 95110-2704, USA" 
		zoomlevel="9" 
		zoomcontrol="small3d"/>

<h3>large3d</h3>
<pre>
&lt;cfmap width="400" height="400" 
		centeraddress="345 Park Avenue, san jose, CA 95110-2704, USA" 
		zoomlevel="9" 
		zoomcontrol="large3d"/>	
</pre>
<cfmap width="400" height="400" 
		centeraddress="345 Park Avenue, san jose, CA 95110-2704, USA" 
		zoomlevel="9" 
		zoomcontrol="large3d"/>

<h2>Others Zoom Controls</h2>

<h3>Dsiable doubleclickzoom</h3>
<pre>
&lt;cfmap width="400" height="400" 
		centeraddress="345 Park Avenue, san jose, CA 95110-2704, USA" 
		zoomlevel="9" 
		doubleclickzoom="false"/>	
</pre>
<cfmap width="400" height="400" 
		centeraddress="345 Park Avenue, san jose, CA 95110-2704, USA" 
		zoomlevel="9" 
		doubleclickzoom="false"/>

<h3>Dsiable continuouszoom</h3>
<pre>
&lt;cfmap width="400" height="400" 
		centeraddress="345 Park Avenue, san jose, CA 95110-2704, USA" 
		zoomlevel="9" 
		continuouszoom="false"/>	
</pre>
<cfmap width="400" height="400" 
		centeraddress="345 Park Avenue, san jose, CA 95110-2704, USA" 
		zoomlevel="9" 
		continuouszoom="false"/>

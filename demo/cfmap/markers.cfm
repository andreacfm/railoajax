<cfset key = 'ABQIAAAAeu0Td2YVlOPq6y8EytJWJBT2yXp_ZAY8_ufC3CFXhHIE1NvwkxTZumvxeaCz-DWk43YtoFFAKySnsA' />
<cfif findNoCase('projects.getrailo.org',cgi.http_host)>
	 <cfset key = 'ABQIAAAAeu0Td2YVlOPq6y8EytJWJBQrwY-N4pzRBQldrVz4T-XjvwgWPxRM3fX3k_q_DOCaBZuweff1O-lTwg' />
</cfif>

<cfajaximport params="#{googlemapkey = key }#" />

<h2>CfMap Markers</h2>

<h3>Markercolor</h3>
<p>Customize the default icon with a different color.</p>
<pre>
&lt;cfmap 
	centeraddress="345 Park Avenue, san jose, CA 95110-2704, USA"
	zoomlevel="10"
	markercolor="CCCCCC"	
	/>
</pre>

<cfmap 
	centeraddress="345 Park Avenue, san jose, CA 95110-2704, USA"
	zoomlevel="10"
	markercolor="CCCCCC"	
	/>

<h3>Markericon</h3>
<p>Use a custom icon</p>
<pre>
&lt;cfmap 
	centeraddress="345 Park Avenue, san jose, CA 95110-2704, USA"
	zoomlevel="10"
	markercolor="CCCCCC"	
	/>
</pre>

<cfmap 
	centeraddress="345 Park Avenue, san jose, CA 95110-2704, USA"
	zoomlevel="10"
	markericon="cfmap/icon.png"	
	/>

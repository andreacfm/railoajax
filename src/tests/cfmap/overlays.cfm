<cfset key = 'ABQIAAAAeu0Td2YVlOPq6y8EytJWJBT2yXp_ZAY8_ufC3CFXhHIE1NvwkxTZumvxeaCz-DWk43YtoFFAKySnsA' />
<cfif findNoCase('projects.getrailo.org',cgi.http_host)>
	 <cfset key = 'ABQIAAAAeu0Td2YVlOPq6y8EytJWJBQrwY-N4pzRBQldrVz4T-XjvwgWPxRM3fX3k_q_DOCaBZuweff1O-lTwg' />
</cfif>

<cfajaximport params="#{googlemapkey = key }#" />

<h2>CfMap - Overlays</h2>

<h3>Overview</h3>

<pre>
&lt;cfmap 
	name="myMap" 
	centeraddress="345 Park Avenue, san jose, CA 95110-2704, USA"
	zoomlevel="8"
	overview="true"
	/>
</pre>

<cfmap 
	name="myMap" 
	centeraddress="345 Park Avenue, san jose, CA 95110-2704, USA"
	zoomlevel="8"
	overview="true"
	/>

<h3>Showscale</h3>

<pre>
&lt;cfmap 
	name="myMap2" 
	centeraddress="345 Park Avenue, san jose, CA 95110-2704, USA"
	zoomlevel="8"
	showscale="true"
	/>
</pre>

<cfmap 
	name="myMap2" 
	centeraddress="345 Park Avenue, san jose, CA 95110-2704, USA"
	zoomlevel="12"
	showscale="true"
	/>

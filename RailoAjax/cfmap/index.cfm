<cfset key = 'ABQIAAAAeu0Td2YVlOPq6y8EytJWJBT2yXp_ZAY8_ufC3CFXhHIE1NvwkxTZumvxeaCz-DWk43YtoFFAKySnsA' />
<cfif findNoCase('projects.getrailo.org',cgi.http_host)>
	 <cfset key = 'ABQIAAAAeu0Td2YVlOPq6y8EytJWJBQrwY-N4pzRBQldrVz4T-XjvwgWPxRM3fX3k_q_DOCaBZuweff1O-lTwg' />
</cfif>

<cfajaximport params="#{googlemapkey = key }#" />

<h2>CfMap</h2>

<h3>Google Key</h3>
<p>The lonely supported way to add a googlekey up to now is using cfajaxproxy at the top of your template as following:</p>
<pre>
<br/>
	&lt;cfajaximport params="#{googlemapkey = 'your key'}#" />
<br/>
</pre>


<h3>Basic Usage : centeraddress and custom zoomlevel</h3>
<pre>
&lt;cfmap 
	name="myMap" 
	centeraddress="345 Park Avenue, san jose, CA 95110-2704, USA"
	zoomlevel="10"/>
</pre>

<cfmap 
	name="myMap" 
	centeraddress="345 Park Avenue, san jose, CA 95110-2704, USA"
	zoomlevel="10"
	/>
	

<h3>Use longitude, latitude, width, height and type. Add a tip and an html message on marker click.</h3>
<ul>
	<li>Height and width default are 400px</li>
	<li>Type can be 'map,satellite,hybrid,terrain'.</li>
</ul>

<pre>
&lt;cfmap 
	name="myMap2" 
	centerlatitude="37.4419"
	centerlongitude="-122.1419"
	width="300"
	height="300"
	zoomlevel="16"
	type="satellite" 
	tip="This is the marker tip"
	markerwindowcontent="&lt;b>Html from cfmap attribute&lt;/b>"		
	/>
</pre>

<cfmap 
	name="myMap2" 
	centerlatitude="37.4419"
	centerlongitude="-122.1419"
	zoomlevel="16"
	width="300"
	height="300"
	type="satellite"
	tip="This is the marker tip"
	markerwindowcontent="<b>Html from cfmap attribute</b>"		
	/>	
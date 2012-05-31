<cfset key = 'AIzaSyBWyEeTKA6ikzmFdflJBIWHxiqQH_Ez_sk' />
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

<cfset key = 'AIzaSyBWyEeTKA6ikzmFdflJBIWHxiqQH_Ez_sk' />
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

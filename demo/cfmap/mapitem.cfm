<cfset key = 'ABQIAAAAeu0Td2YVlOPq6y8EytJWJBT2yXp_ZAY8_ufC3CFXhHIE1NvwkxTZumvxeaCz-DWk43YtoFFAKySnsA' />

<cfajaximport params="#{googlemapkey = key }#" />

<h2>CfMapitem</h2>
<p>Dynamically add marker to your map</p>

<pre>
&lt;cfmap 
	name="myMap" 
	centeraddress="via montenapoleone 1, Milano, Italia"
	zoomlevel="5">
		
	&lt;cfmapitem 
		address="via veneto 10, Roma, Italia"
		tip="Marker Tip"
		markerwindowcontent="&lt;b>Hello&lt;/b>&lt;p>This html comes from cfmapitem &lt;br/>markerwindowcontent attributes&lt;/p>"/>	

&lt;/cfmap>	
</pre>


<cfmap 
	centeraddress="via montenapoleone 1, Milano, Italia"
	zoomlevel="5">
		
	<cfmapitem 
		address="via veneto 10, Roma, Italia"
		tip="Marker Tip"
		markerwindowcontent="<b>Hello</b><p>This html comes from cfmapitem <br/>markerwindowcontent attributes</p>"/>	

</cfmap>	


<h2>Custom color and icon</h2>

<pre>
&lt;cfmap 
	centeraddress="via veneto 30, Roma, Italia"
	zoomlevel="18">
		
	&lt;cfmapitem 
		address="via veneto 15, Roma, Italia"
		tip="Marker Tip"
		markerwindowcontent="&lt;b>Hello&lt;/b>&lt;p>This html comes from cfmapitem &lt;br/>markerwindowcontent attributes&lt;/p>"
		markercolor="CCCCCC"
	/>	

	&lt;cfmapitem 
		address="via veneto 40, Roma, Italia"
		markericon="cfmap/icon.png"	
	/>	

&lt;/cfmap>	

</pre>

<cfmap 
	centeraddress="via veneto 30, Roma, Italia"
	zoomlevel="18">
		
	<cfmapitem 
		address="via veneto 15, Roma, Italia"
		tip="Marker Tip"
		markerwindowcontent="<b>Hello</b><p>This html comes from cfmapitem <br/>markerwindowcontent attributes</p>"
		markercolor="CCCCCC"
	/>	

	<cfmapitem 
		address="via veneto 40, Roma, Italia"
		markericon="cfmap/icon.png"	
	/>	

</cfmap>	

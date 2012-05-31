<cfset key = 'AIzaSyBWyEeTKA6ikzmFdflJBIWHxiqQH_Ez_sk' />
<cfif findNoCase('projects.getrailo.org',cgi.http_host)>
	 <cfset key = 'ABQIAAAAeu0Td2YVlOPq6y8EytJWJBQrwY-N4pzRBQldrVz4T-XjvwgWPxRM3fX3k_q_DOCaBZuweff1O-lTwg' />
</cfif>

<cfajaximport params="#{googlemapkey = key }#" />

<script>

function init() {
	ColdFusion.Map.addEvent("mainMap","click",function(overlay,overlaylnglt) {
		address = arguments[arguments.length-1];
		var loc = new GLatLng(address.lat(),address.lng());
		panoramaOptions = { latlng:loc };
		var myPano = new GStreetviewPanorama(document.getElementById("streetDiv"), panoramaOptions);
	});
}
</script>

<cfmap centeraddress="Milano Italy" zoomlevel="15" name="mainMap"/>

<div id="streetDiv" style="width:500px;height:500px"></div>
<cfset ajaxOnLoad("init")>
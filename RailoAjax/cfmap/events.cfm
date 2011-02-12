<cfset key = 'ABQIAAAAeu0Td2YVlOPq6y8EytJWJBT2yXp_ZAY8_ufC3CFXhHIE1NvwkxTZumvxeaCz-DWk43YtoFFAKySnsA' />
<cfif findNoCase('projects.getrailo.org',cgi.http_host)>
	 <cfset key = 'ABQIAAAAeu0Td2YVlOPq6y8EytJWJBQrwY-N4pzRBQldrVz4T-XjvwgWPxRM3fX3k_q_DOCaBZuweff1O-lTwg' />
</cfif>

<cfajaximport params="#{googlemapkey = key }#" />

<script type="text/javascript">
function loadHandler(name,map){
	var cons = Sizzle('#console')[0];
	var html = cons.innerHTML;
	cons.innerHTML= html + '<p style="color:green;font-size:14px;">Map <b>'  + name + '</b> loaded</p>';	
}	
function onNotFound(msg,name,map){
	var cons = Sizzle('#console2')[0];
	var html = cons.innerHTML;
	cons.innerHTML= html + '<p style="color:blu;font-size:14px;">Map <b>'  + name + ' </b> : ' + msg+ '</p>';	
}	

</script>


<h2>CfMap - Events</h2>

<h3>onLoad</h3>
<p>listen to the onLoad event dispatched when the map is 'ready'. The js fucntion receive 2 arguments. The name of the map and the 
js map object</p>
<pre>
&lt;script type="text/javascript">
function loadHandler(name,map){
	var cons = Sizzle('#console')[0];
	var html = cons.innerHTML;
	cons.innerHTML= html + '&lt;p style="color:green;font-size:14px;">Map &lt;b>'  + name + '&lt;/b> loaded&lt;/p>';	
}	
&lt;/script>
<br/><br/>
&lt;cfmap 
	name="myMap" 
	centeraddress="345 Park Avenue, san jose, CA 95110-2704, USA"
	zoomlevel="10"
	onLoad="loadHandler"
	/>
</pre>

<div id="console" style="border:1px solid #000000;width:300px;">

</div>
<br/><br/>
<cfmap 
	name="myMap" 
	centeraddress="345 Park Avenue, san jose, CA 95110-2704, USA"
	zoomlevel="10"
	onLoad="loadHandler"
	/>

<h3>onNotFound</h3>
<p>You can pass a js function to be executed when a point is not found.</p>
<p>The js function get 3 arguments. A message error, the map name, the map js object.</p>

<pre>
&lt;script type="text/javascript">
function onNotFound(msg,name,map){
	var cons = Sizzle('#console2')[0];
	var html = cons.innerHTML;
	cons.innerHTML= html + '&lt;p style="color:blu;font-size:14px;">Map &lt;b>'  + name + ' &lt;/b> : ' + msg+ '&lt;/p>';	
}	
&lt;/script>
<br/><br/>
&lt;cfmap 
	name="myMap2" 
	centeraddress="direction that do not exists"
	zoomlevel="10"
	onNotFound="onNotFound"
	width="300"
	height="300"			
	/>
</pre>

<br/><br/>

<div id="console2" style="border:1px solid #000000;width:300px;">

</div>

<br/><br/>
<cfmap 
	name="myMap2" 
	centeraddress="direction that do not exists"
	zoomlevel="10"
	onNotFound="onNotFound"
	width="300"
	height="300"			
	/>

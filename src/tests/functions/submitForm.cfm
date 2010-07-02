<h1>Railo.Ajax.submitForm</h1>
<p>This example shows how to submit any form of the dom via ajax.</p>
<p>In this case the form is submitted any 3 secs implementing an auto-save scenario. Try to write some data!</p>
<cfajaximport tags="CFAJAXPROXY" />

<pre>
function callback(data,textStatus){
	var el = document.getElementById('messageBox');
	el.innerHTML = data;	
}

window.onload = function(){
	setInterval("Railo.Ajax.submitForm('autoSave','/RailoAjax/functions/files/save.cfm',callback)",3000);	
}	

</pre>

<script type="text/javascript">
function callback(data,textStatus){
	var el = document.getElementById('messageBox');
	el.innerHTML = data;	
}

window.onload = function(){
	setInterval("Railo.Ajax.submitForm('autoSave','/RailoAjax/functions/files/save.cfm',callback)",3000);	
}	
</script>

<div id="messageBox" class="result"> </div>
<form id="autoSave" format="html">
  <label>Name</label><input type="text" name="name"><br>
  <label>Address</label><input type="text" name="address"><br/>
  <label>Phone</label><input type="text" name="phone"><br/>
</form>

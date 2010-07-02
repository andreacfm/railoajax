<h1>Railo.Ajax.ajaxForm</h1>
<p>The function prepare the form to be submitted via ajax when the submit event is fired!</p>
<cfajaximport tags="CFAJAXPROXY" />

<pre>
window.onload = function(){
	Railo.Ajax.ajaxForm('ajaxForm','messageBox');	
}	
</pre>

<div id="messageBox" class="result"> </div>
<form id="ajaxForm" action="/RailoAjax/functions/files/save.cfm">
  <label>Name</label><input type="text" name="name"><br>
  <label>Address</label><input type="text" name="address"><br/>
  <label>Phone</label><input type="text" name="phone"><br/><br/>
  <input type="submit" class="submitButton" value="Submit"/>
</form>

<h3>Tip</h3>
<p>You can provide to ajaxForm a callbackHandler to intercept the data but you can also listen to event <b>Railo.AfterInnerHtml</b>
that is dispatched any time a bunch of html is injected by any library method.</p>
<p>Event will carry the id of the element where html has been inserted as lonely argument.</p>

<pre>
function highlight(id){
	
		if (id == 'messageBox2') {
			var el = document.getElementById(id);
			var actualBG = el.style.backgroundColor;
			el.style.backgroundColor = 'yellow';
			setTimeout(function(){
				el.style.backgroundColor = actualBG;
			}, 1000);
		}
}

Railo.Events.subscribe(highlight,'Railo.AfterInnerHtml');

window.onload = function(){
	Railo.Ajax.ajaxForm('ajaxForm2','messageBox2');	
}	
</pre>

<script type="text/javascript">
function highlight(id){
	
		if (id == 'messageBox2') {
			var el = document.getElementById(id);
			var actualBG = el.style.backgroundColor;
			el.style.backgroundColor = 'yellow';
			setTimeout(function(){
				el.style.backgroundColor = actualBG;
			}, 1000);
		}
}

Railo.Events.subscribe(highlight,'Railo.AfterInnerHtml');

window.onload = function(){
	Railo.Ajax.ajaxForm('ajaxForm','messageBox');	
	Railo.Ajax.ajaxForm('ajaxForm2','messageBox2');	
}	
</script>

<div id="messageBox2" class="result"> </div>
<form id="ajaxForm2" action="/RailoAjax/functions/files/save.cfm">
  <label>Name</label><input type="text" name="name"><br><br>
  <input type="submit" class="submitButton" value="Submit"/>
</form>

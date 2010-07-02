<h1>AjaxOnLoad</h1>
<p>The function 'hello' is invoked by ajaxOnLoad when the page is ready.</p>

<script type="text/javascript">
function hello(){
	alert('Hello! I have been invoked by AjaxOnLoad');
}
</script>

<cfset ajaxOnLoad('hello') />

<pre>
 &lt;script type="text/javascript">
function hello(){
	alert('Hello! I have been invoked by AjaxOnLoad');
}
 &lt;/script>

 &lt;cfset ajaxOnLoad('hello') />

</pre>

<cfajaximport tags="CFWINDOW" />
<h3>Buttons and callbacks</h3>
<pre>
&lt;button 
onclick="Railo.Window.create('win9','win9','/RailoAjax/cfwindow/files/fly.cfm',
		{initShow:true,
		buttons:{ok:function(ui){
					alert('Button ' + $(ui.target).text());
					},
				close:function(){
					$(this).dialog('close');
					}
				}
	});">Create Win 9</button>

&lt;button onclick="Railo.Window.show('win9');">Open Win 9</button>
&lt;button onclick="Railo.Window.hide('win9');">Close Win 9</button>
</pre>
<input type="button" class="submitButton" onclick="Railo.Window.create('win9','win9','<cfoutput>#getContextRoot()#</cfoutput>/RailoAjax/cfwindow/files/fly.cfm',{initShow:true,buttons:{ok:function(ui){alert('Button ' + $(ui.target).text());},close:function(){$(this).dialog('close');}}});" value="Create Win 9"/>
<input type="button" class="submitButton" onclick="Railo.Window.show('win9');" value="Open Win 9"/>
<input type="button" class="submitButton" onclick="Railo.Window.hide('win9');" value="Close Win 9"/>

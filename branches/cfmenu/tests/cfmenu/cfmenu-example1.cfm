<h2>CFMENU Example: Vertical, default skin</h2>

<h3>Result</h3>

<cfmenu name="menuVertical" skin="yui-skin-sam" type="vertical" width="130" font="Verdana" fontsize="13" selecteditemcolor="red" selectedfontcolor="white">
	<cfmenuitem display="Railo">
		<cfmenuitem display="About" href="http://www.getrailo.org/index.cfm/about-railo/" />				
		<cfmenuitem display="Blog" href="http://www.railo.ch/blog/" />
		<cfmenuitem display="Documentation">
			<cfmenuitem display="FAQs" href="http://www.getrailo.org/index.cfm/community/faq/" />
			<cfmenuitem display="Wiki" href="http://wiki.getrailo.org/" />											
		</cfmenuitem>		
		<cfmenuitem display="Download" href="http://www.getrailo.org/index.cfm/download/" />	
		<cfmenuitem display="Team" href="http://www.getrailo.org/index.cfm/community/team/"/>					
		<cfmenuitem divider="true" />
		<cfmenuitem display="Reload" helptext="Ctrl+R" href="javascript:document.location.reload();"/>
	</cfmenuitem>
	<cfmenuitem display="Community">
		<cfmenuitem display="Mailing List" href="http://groups.google.com/group/railo"/>		
		<cfmenuitem display="Report Bugs" href="http://jira.jboss.org/jira/browse/RAILO"/>			
	</cfmenuitem>
</cfmenu>

<h3>Code</h3>

<cfset strCode ='

<cfmenu name="menuVertical" type="vertical" width="130" font="Verdana" fontsize="13" selecteditemcolor="red" selectedfontcolor="white">
	<cfmenuitem display="Railo">
		<cfmenuitem display="About" href="http://www.getrailo.org/index.cfm/about-railo/" />				
		<cfmenuitem display="Blog" href="http://www.railo.ch/blog/" />
		<cfmenuitem display="Documentation">
			<cfmenuitem display="FAQs" href="http://www.getrailo.org/index.cfm/community/faq/" />
			<cfmenuitem display="Wiki" href="http://wiki.getrailo.org/" />											
		</cfmenuitem>		
		<cfmenuitem display="Download" href="http://www.getrailo.org/index.cfm/download/" />	
		<cfmenuitem display="Team" href="http://www.getrailo.org/index.cfm/community/team/"/>					
		<cfmenuitem divider="true" />
		<cfmenuitem display="Reload" helptext="Ctrl+R" href="javascript:document.location.reload();"/>
	</cfmenuitem>
	<cfmenuitem display="Community">
		<cfmenuitem display="Mailing List" href="http://groups.google.com/group/railo"/>		
		<cfmenuitem display="Report Bugs" href="http://jira.jboss.org/jira/browse/RAILO"/>			
	</cfmenuitem>
</cfmenu>

' />

<pre>
<cfoutput>#htmleditformat(trim(strCode))#</cfoutput>
</pre>
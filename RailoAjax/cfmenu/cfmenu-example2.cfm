<h2>CFMENU Example: Horizontal, 'yui-skin-sam' skin</h2>

<h3>Code</h3>
 
<cfset strCode ='

<cfmenu name="menuHorizontalSkinned" skin="yui-skin-sam" type="horizontal" font="Verdana" fontsize="13">	
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

<h3>Result</h3>

<cfmenu name="menuHorizontalSkinned" skin="yui-skin-sam" type="horizontal" font="Verdana" fontsize="13">	
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

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
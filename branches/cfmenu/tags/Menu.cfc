<!--- /*		
Project:     @projectName  @projectUrl
Author:      MrBuzzy <mrbuzzy@gmail.com>
Version:     @projectVersion
Build Date:  @date
Build:		 @number

Copyright @year @author

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.	
			
*/--->

<cfcomponent name="Menu" extends="railo.commons.html.ajax.AjaxBase" output="true">
	
	<cfset variables._SUPPORTED_JSLIB = 'jquery' />
	<cfset variables.instance.menuitems = arraynew(1)>

	<!--- Meta data --->
	<cfset this.metadata.attributetype="fixed">
    <cfset this.metadata.attributes = {
		autosubmenudisplay:	{required:false,type:"boolean",default=true},
		childstyle:			{required:false,type:"string",default=""},
		bgcolor:			{required:false,type:"string",default=""},			
		doyuifonts:			{required:false,type:"boolean",default=false},			
		font:				{required:false,type:"string",default=""},
		fontsize:			{required:false,type:"string",default=""},
		fontcolor:			{required:false,type:"string",default=""},			
		hidedelay:			{required:false,type:"string",default:"10"},					
		menustyle:			{required:false,type:"string",default:""},				
		name:				{required:false,type:"string",default:"_cf_menu_#randRange(1,999999999)#"},
		selectedfontcolor:	{required:false,type:"string",default:""},
		selecteditemcolor:	{required:false,type:"string",default:""},					
		showdelay:			{required:false,type:"string",default:"250"},					
		skin:      			{required:false,type:"string",default:""}, //or yui-skin-sam
		type:      			{required:false,type:"string",default:"horizontal"},
		width:  			{required:false,type:"string",default:""},
		jsLib:              {required:false,type:"string",default:"yui"}
	}>

	<cfset this.tagName="CFMENU">
	     
    <cffunction name="init" output="no" returntype="void"
      hint="invoked after tag is constructed">
    	<cfargument name="hasEndTag" type="boolean" required="yes">
      	<cfargument name="parent" type="component" required="no" hint="the parent cfc custom tag, if there is one">
      	
		<cfset var js = "" />

		<cfset super.init() />

      	<cfset variables.hasEndTag = arguments.hasEndTag />
	
	  	<cfif not hasEndTag>
	  		<cfthrow message="CFMENU must have an end tag.">
	  	</cfif>
		
  	</cffunction>

    
    <cffunction name="onStartTag" output="yes" returntype="boolean">
   		<cfargument name="attributes" type="struct">
   		<cfargument name="caller" type="struct">
		
		<cfset this.type = attributes.type>
		<cfset this.font = attributes.font>
		<cfset this.fontColor = attributes.fontColor>
						
	    <cfreturn variables.hasEndTag>
	</cffunction>


    <cffunction name="onEndTag" output="yes" returntype="boolean">
   		<cfargument name="attributes" type="struct">
   		<cfargument name="caller" type="struct">									
  		<cfargument name="generatedContent" type="string">						
			
		<cfif not arraylen(variables.instance.menuitems)>
			<cfthrow message="The CFMENU tag must contain atleast one CFMENUITEM tag within it.">
		</cfif>

		<cfif not listfindnocase("horizontal,vertical",attributes.type)>
			<cfthrow message="CFMENU type must be 'horizontal' or 'vertical'">
		</cfif>

		<cfset renderMenu(attributes)>
						
		<cfreturn false />
	</cffunction>


	<cffunction name="appendMenuItem" access="public">
		<cfargument name="menuitem" type="struct">
		<cfset arrayappend(variables.instance.menuitems,arguments.menuitem)>
	</cffunction>

	
	<cffunction name="renderMenuItem" access="private">
	
		<cfargument name="menuitem" type="struct">
		<cfargument name="isTop" type="boolean" default="false">
		<cfargument name="childStyle" type="string" default="">
	
		<cfset var liClass = "">
		<cfset var aClass = "">						
		
		<cfsetting enablecfoutputonly="true">
		
		<cfif this.type is "horizontal" and arguments.isTop>
			<cfset liClass = "yuimenubaritem">
			<cfset aClass = "yuimenubaritemlabel">
		<cfelse>
			<cfset liClass = "yuimenuitem">
			<cfset aClass = "yuimenuitemlabel">					
		</cfif>
	
		<cfif arguments.menuitem.divider>
			<cfoutput>
				</ul>
				<ul>
			</cfoutput>
		<cfelse>

			<!--- li --->
			<cfset temp = "">					
			<cfif menuitem.style neq "">
				<cfset temp = listappend(temp,menuitem.style,";")>					
			</cfif>
			<cfif arguments.childStyle neq "">
				<cfset temp = listappend(temp,arguments.childStyle,";")>
			</cfif>						
			<cfif listlen(temp,";")>
				<cfset temp = 'style="#temp#"'>
			</cfif>
			
			<cfif trim(temp) neq "">
				<cfoutput>
				<li id="#menuitem.name#" class="#liClass#" #trim(temp)#></cfoutput>
			<cfelse>
				<cfoutput>
				<li id="#menuitem.name#" class="#liClass#"></cfoutput>
			</cfif>

			<!--- href --->
			<cfset temp = "">					
			<cfif this.font neq "">
				<cfset temp = listappend(temp,"font-family:#this.font#",";")>
			</cfif>
			<cfif this.fontColor neq "">
				<cfset temp = listappend(temp,"color:#this.fontColor#",";")>
			</cfif>						
			<cfif listlen(temp,";")>
				<cfset temp = 'style="#temp#"'>
			</cfif>				
			<cfset temp = temp & " " & renderTagAttributes(menuitem,'href,target')>
			
			<cfoutput>
				<a class="#aclass#" #temp#>#arguments.menuitem.display#<cfif arguments.menuitem.helptext neq ""><em class="helptext">#arguments.menuitem.helptext#</em></cfif></a></cfoutput>

		</cfif>
			
		<cfif arraylen(arguments.menuitem.menuitems)>					
			<!--- New sub menu --->
			<cfoutput>
				<div class="yuimenu" style="#arguments.menuitem.menustyle#">
	                   <div class="bd"> 
	                       <ul class="first-of-type">
			</cfoutput>							
				<cfloop array="#arguments.menuitem.menuitems#" index="m">				
					<cfif arguments.menuitem.childStyle is "">
						<cfset renderMenuItem(m,false,arguments.childStyle)>
					<cfelse>
						<cfset renderMenuItem(m,false,arguments.menuitem.childStyle)>
					</cfif>
				</cfloop>
			<cfoutput>
						</ul>
					</div>
				</div>
			</cfoutput>
		</cfif>
		<cfoutput>
					</li>
		</cfoutput>
		<cfsetting enablecfoutputonly="false">
	
	</cffunction>


	<cffunction name="renderMenu" access="private">
		<cfargument name="attributes">
		<!--- YUI menu HTML (ColdFusion default) --->
		<cfset renderMenuAsYuiHTML(attributes)>
		<!--- TODO: YUI menu as JS --->
		<!--- <cfset renderMenuAsYuiJS()> --->
		<!--- TODO: jquery menu as JS --->
		<!--- <cfset renderMenuAsJquery()> --->
	</cffunction>


	<cffunction name="renderMenuAsYuiHtml" access="private">
		<cfargument name="attributes">

		<cfset var divStyle = "">
		<cfset var divClass = "">
		<cfset var htmlhead = "">

		<cfset divStyle = attributes.menustyle>

		<cfif this.type is "horizontal">
			<cfset divClass = "yuimenubar yuimenubarnav">
		<cfelseif this.type is "vertical">
			<cfset divClass = "yuimenu">
			<cfif isNumeric(attributes.width)>
				<cfset divStyle = listappend(divStyle,"width:#attributes.width#px",";")>
			<cfelseif trim(attributes.width) is "">
			<cfelse>
				<cfset divStyle = listappend(divStyle,"width:#attributes.width#",";")>
			</cfif>
		</cfif>

		<cfif trim(attributes.bgcolor) neq "">
			<cfset divStyle = listappend(divStyle,"background-color:#attributes.bgcolor#",";")>
		</cfif>

		<cfif isnumeric(attributes.fontsize)>
			<!--- pixels --->
			<cfset divStyle = listappend(divStyle,"font-size:#attributes.fontsize#px",";")>
		<cfelseif attributes.fontsize neq "">
			<!--- percentage or other --->
			<cfset divStyle = listappend(divStyle,"font-size:#attributes.fontsize#",";")>
		</cfif>

		<!--- Setup JS library --->
		<cfif not structKeyExists(request,'Railo_Ajax_Menu')>
			<cfsavecontent variable="js">
				<cfoutput>									
					<!--- Railo Ajax --->
					<script type="text/javascript">Railo.Ajax.importTag('CFMENU','#attributes.jslib#');</script>
				</cfoutput>		
			</cfsavecontent>
			<cfhtmlhead text="#js#" />
			<cfset request.Railo_Ajax_Menu = 'loaded' />						
		</cfif>
				
		<!--- Begin menu --->
		<cfoutput>
		<cfif attributes.skin neq ""><div class="#attributes.skin#"></cfif>
			<div id="#attributes.name#" class="#divClass#" style="#divStyle#">
		</cfoutput>
		<cfoutput>			
				<div class="bd">
				   	<ul class="first-of-type"></cfoutput>
				
				<cfloop array="#variables.instance.menuitems#" index="m">				
					<cfset renderMenuItem(m,true,attributes.childStyle)>
				</cfloop>
				
				<cfoutput>
					</ul>
				</div>
			</div>
			<cfif attributes.skin neq ""></div></cfif>
	
			<cfsavecontent variable="htmlhead">
				<cfif attributes.selecteditemcolor neq "">
				<style type="text/css">
				###attributes.name# .yuimenubaritem-selected,
				###attributes.name# .yuimenuitem-selected 
				{
			    	background:none;
			    	background-color: #attributes.selecteditemcolor#;
				}
				</cfif>
				</style>
				<cfif attributes.selectedfontcolor neq "">
				<style type="text/css">
				###attributes.name# .yuimenubaritemlabel-selected,
				###attributes.name# .yuimenubaritemlabel-selected:visited,
				###attributes.name# .yuimenuitemlabel-selected,
				###attributes.name# .yuimenuitemlabel-selected:visited {
					text-decoration:none;
					color:#attributes.selectedfontcolor#;
				}
				</style>
				</cfif>
				<!--- TODO: move to in Railo.Ajax.Menu or equivalent. --->
				<script type="text/javascript">					
					YAHOO.util.Event.onContentReady("#attributes.name#", function () {
				    <cfif this.type is "vertical">    
					var menu = new YAHOO.widget.Menu("#attributes.name#",{position:"static",visible:true,showdelay:#attributes.showdelay#, hidedelay:#attributes.hidedelay#, lazyload:true});
					menu.render();
					menu.show();
				    <cfelseif this.type is "horizontal">	
					var menu = new YAHOO.widget.MenuBar("#attributes.name#",{autosubmenudisplay:#attributes.autosubmenudisplay#,showdelay:#attributes.showdelay#, hidedelay:#attributes.hidedelay#, lazyload:true});
					menu.render();
					</cfif>                
					});			
				</script>								
			</cfsavecontent>
			<cfhtmlhead text="#htmlhead#">
		
		</cfoutput>
	
	</cffunction>


	<cffunction name="renderTagAttributes" output="false" returntype="string" access="private" description="Converts a struct to a string that can be used as HTML tag attributes">
		<cfargument name="attrs" type="struct" hint="tag attributes">
		<cfargument name="filter" type="String" hint="selection of keys as a list" required="false">
		<cfargument name="append" type="String" hint="string to append to all values" required="false" default="">

		<cfset var myHTML = "">
		<cfset var i = "">
		<cfset var key = "">
		<cfset var asKey = "">
		
		<cfloop collection="#attrs#" item="i">

			<!--- transpose attributes, exmaple "menustyle as style" --->
			<cfif listlen(i," ") is 3>
				<cfset key = gettoken(i,1," ")>
				<cfset asKey = gettoken(i,3," ")>
			<cfelse>			
				<cfset key = i>			
				<cfset asKey = i>
			</cfif>

			<cfif (filter eq "" or listfindnocase(filter,key)) and (attrs[key] neq "" or append neq "")>
				<cfset myhtml = myhtml & '#lcase(asKey)#="#attrs[key]##append#" '>
			</cfif>
		
		</cfloop>
		
		<cfreturn trim(myHtml)>
		
	</cffunction>

		
</cfcomponent>
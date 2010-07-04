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

<cfcomponent name="MenuItem" output="false">

	<!--- TODO: hidefocus? --->
	
	<cfset this.tagName="CFMENUITEM">

	<cfset variables.instance.ajaxBinder = createObject('component','railo.commons.html.ajax.ajaxBinder').init() />
	
	<!--- Meta data --->
	<cfset this.metadata.attributetype="fixed">
    <cfset this.metadata.attributes={
		childstyle:	{required:false,type:"string",default=""},
		display:	{required:false,type:"string",default:""},
		divider:	{required:false,type:"boolean"},
		helptext:			{required:false,type:"string",default=""},			
		href:	{required:false,type:"string",default:"javascript:void(0);"},
		image:	{required:false,type:"string",default:""},
		menustyle:	{required:false,type:"string",default:""},
		name:		{required:false,type:"string",default:"_cf_menu_item_#randRange(1,999999999)#"},
		style:	{required:false,type:"string",default:""},						
		target:	{required:false,type:"string",default:""}	
	}> 

         
    <cffunction name="init" output="yes" returntype="void" hint="invoked after tag is constructed">
    	<cfargument name="hasEndTag" type="boolean" required="yes">
      	<cfargument name="parent" type="component" required="yes" hint="the parent cfc custom tag, if there is one">
      	<cfset var js = "" />

		<cfif not hasEndTag>
	  		<cfthrow message="The CFMENUITEM tag must have a closing tag." />
	  	<cfelseif not IsDefined('parent.tagName') or (parent.tagName neq "CFMENUITEM" and parent.tagName neq "CFMENU") />
			<cfthrow message="CFMENUITEM must be nested within CFMENU or CFMENUITEM." />
		</cfif>

		<cfset variables.hasEndTag = arguments.hasEndTag />
		<!--- new struct and array --->
	  	<cfset variables.menuitem.menuitems = arraynew(1) />
	  	<cfset variables.parent = arguments.parent />
		<cfset this.type = parent.type />
		
  	</cffunction>

    
    <cffunction name="onStartTag" output="false" returntype="boolean">
   		<cfargument name="attributes" type="struct">
   		<cfargument name="caller" type="struct">			

		<!--- attribute validation and set up menuitem --->
		<cfif not IsDefined('attributes.display') and not IsDefined('attributes.divider')>
			<cfthrow message="Attribute validation error for tag CFMENUITEM." detail="You must provide the 'display' (string) attribute OR the 'divider' (boolean) attribute.">
		<cfelseif IsDefined('attributes.divider') and IsBoolean(attributes.divider)>
			<cfset variables.menuitem.divider = attributes.divider>
		<cfelseif IsDefined('attributes.display')>			
			<cfset variables.menuitem.childstyle = attributes.childstyle>
			<cfset variables.menuitem.display = attributes.display>
			<cfset variables.menuitem.divider = false>
			<cfset variables.menuitem.href = attributes.href>
			<cfset variables.menuitem.helptext = attributes.helptext>			
			<cfset variables.menuitem.image = attributes.image>
			<cfset variables.menuitem.menustyle = attributes.menustyle>
			<cfset variables.menuitem.name = attributes.name>
			<cfset variables.menuitem.style = attributes.style>															
			<cfset variables.menuitem.target = attributes.target>
		</cfif>

		<cfreturn variables.hasEndTag>
	    
	</cffunction>


    <cffunction name="onEndTag" output="false" returntype="boolean">
   		<cfargument name="attributes" type="struct">
   		<cfargument name="caller" type="struct">								
  		<cfargument name="generatedContent" type="string">						

			<!--- A child is born --->
			<cfset variables.parent.appendMenuItem(menuitem)>
						
		<cfreturn false />
		
	</cffunction>


	<cffunction name="getAjaxBinder" output="false" returntype="ajaxBinder" access="private">
		<cfreturn variables.instance.ajaxBinder />
	</cffunction>


	<cffunction name="appendMenuItem">
		<cfargument name="menuitem">
		<cfset arrayappend(variables.menuitem.menuitems,arguments.menuitem)>
	</cffunction>


</cfcomponent> 
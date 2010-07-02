<!--- /*		
Project:     @projectName  @projectUrl
Author:      @author <@authorEmail>
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
<cfcomponent name="cfAjaximport" extends="railo.commons.html.ajax.AjaxBase">
	
	<cfset variables.tags = 'CFAJAXPROXY,CFDIV,CFWINDOW,CFMAP,CFMENU' />
	
	<!--- Meta data --->
	<cfset this.metadata.attributetype="fixed">
    <cfset this.metadata.attributes={
		scriptSrc:	{required:false,type:"string",default:""},
		tags:       {required:false,type:"string",default:""},
		cssSrc:     {required:false,type:"string",default:""},
		adapter:    {required:false,type:"string",default:""},
		params :    {required:false,type:"struct",default:"#structNew()#"}
	}>
         
    <cffunction name="init" output="no" returntype="void" hint="invoked after tag is constructed">
    	<cfargument name="hasEndTag" type="boolean" required="yes">
      	<cfargument name="parent" type="component" required="no" hint="the parent cfc custom tag, if there is one">
  	</cffunction> 
    
    <cffunction name="onStartTag" output="no" returntype="boolean">
   		<cfargument name="attributes" type="struct">
   		<cfargument name="caller" type="struct">
		
      	<cfset var opts = {} />
		
		<!--- init the base ajax class --->
		<cfif len(attributes.scriptSrc)>
			<cfset opts['scriptSrc'] = attributes.scriptSrc />
		</cfif>
		<cfif len(attributes.cssSrc)>
			<cfset opts['cssSrc'] = attributes.cssSrc />
		</cfif>
		<cfif len(attributes.adapter)>
			<cfset opts['adapter'] = attributes.adapter/>
		</cfif>
		
		<!--- TODO: remove this when railo bug is solved --->
		<cfif not structKeyExists(attributes,'params')>
			<cfset attributes.params = struct() />
		</cfif> 
		
		<cfset opts.params = attributes.params />
				
      	<cfset super.init(argumentCollection:opts)/>
  
		<!--- check --->
		<cfloop list="#attributes.tags#" index="el">
			<cfif listFind(variables.tags,el) eq 0>
				<cfthrow message="tag [#el#] is not a valid value. Valid tag names are [#variables.tags#]" />
			</cfif>	
		</cfloop>
		
        <cfset doImport(argumentCollection=arguments) />
        
        <cfreturn false>
    </cffunction>
	
    <cffunction name="doImport" output="no" returntype="void">
   		<cfargument name="attributes" type="struct">
   		<cfargument name="caller" type="struct">
   		
   		<cfif len(attributes.tags)>
			<cfsavecontent variable="js"><cfoutput>
			<script type="text/javascript">
			<cfloop list="#attributes.tags#" index="el">Railo.Ajax.importTag('#el#');
			</cfloop>
			</script>		
			</cfoutput></cfsavecontent>
			<cfhtmlhead text="#stripWhiteSpace(js)#"/>
		</cfif>
	</cffunction>
		
</cfcomponent>
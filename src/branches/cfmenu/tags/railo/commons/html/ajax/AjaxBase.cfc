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
<cfcomponent name="ajaxBase">
		
	<!--- Instance vars --->
	<cfset variables.instance = {} />
	
	<cfset variables.instance.SCRIPTSRC = "/mapping-tag/railo/commons/html/libs/RailoJs.cfc?method=get&lib=" />
	<cfset variables.instance.CSSSRC = "/mapping-tag/railo/commons/html/libs/css/" />
	
	<!--- Constructor --->
    <cffunction name="init" output="no" returntype="void">
    	<cfargument name="scriptSrc" type="string" default="#variables.instance.SCRIPTSRC#" />
    	<cfargument name="cssSrc" type="string" default="#variables.instance.CSSSRC#" />
    	<cfargument name="adapter" default="" type="string" required="false" />
		<cfargument name="params" default="#struct()#" type="struct" required="false" />
		
		<!--- Support context root differents from '/' --->
		<cfif getContextRoot() neq '/'> 
			<cfset arguments.scriptSrc = getContextRoot() & ARGUMENTS.scriptSrc />
			<cfset arguments.cssSrc = getContextRoot() & ARGUMENTS.cssSrc />
		</cfif>	
		
		<cfif arguments.cssSrc neq variables.instance.CSSSRC>
			<cfset variables.instance.isCustomCss = true />
		</cfif>
				
		<cfsavecontent variable="variables.instance.htmlHead"><cfoutput>
			<cfif not structKeyExists(request,'Railo_Ajax')>
				<script type="text/javascript">
				var _cf_ajaxscriptsrc = '#arguments.scriptSrc#';
				var _cf_ajaxcsssrc = '#arguments.cssSrc#';
				var _cf_loadingtexthtml = '<div style="text-align: center;"><img src="#arguments.cssSrc#/icons/loading.gif.cfm"/>&nbsp;Loading...</div>';				
				var _cf_params = #lcase(serializeJson(arguments.params))#;
				</script>
				<script type="text/javascript" src="#arguments.scriptSrc#Sizzle"></script>
				<script type="text/javascript" src="#arguments.scriptSrc#RailoAjax"></script>
				<cfif len(arguments.adapter)><script type="text/javascript" src="#arguments.adapter#"></script></cfif>
				<cfset request.Railo_Ajax = 'loaded'/>
			</cfif>	
		</cfoutput></cfsavecontent>
		<cfhtmlhead text="#stripWhiteSpace(variables.instance.htmlHead)#"/>
  	</cffunction> 
	
	<!--- Public --->	
	<cffunction name="stripWhiteSpace" output="no" returntype="string" hint="Strips whitespace outside tags from string"> 
		<cfargument name="str" type="string" default="" required="no"/>
		<cfreturn trim(reReplaceNoCase(arguments.str,"(</?.*?\b[^>]*>)[\s]{1,}|[\r]{1,}(</?.*?\b[^>]*>)","\1#chr(13)##chr(10)#\2","All"))/>
	</cffunction>
		
</cfcomponent>
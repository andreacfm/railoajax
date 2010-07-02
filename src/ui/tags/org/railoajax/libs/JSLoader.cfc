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
<cfcomponent name="RailoAjax">

	<!---Init--->
	<cffunction name="init" output="false" returntype="void">
		<cfreturn this />
	</cffunction>
	
	<!---get--->
	<cffunction name="get" output="false" returntype="string" returnformat="plain" access="remote">
		<cfargument name="lib" type="string" required="false" default="" />
		<cfset var filePath = expandPath('js/#arguments.lib#.js')/>
		<cfset var local = {result=""} />
			<cfsavecontent variable="local.result">
				<cfif fileExists(filePath)>                
					<cfinclude template="js/#arguments.lib#.js"/>
				</cfif>			
			</cfsavecontent>		
		<cfreturn local.result />	
	</cffunction>

	
</cfcomponent>
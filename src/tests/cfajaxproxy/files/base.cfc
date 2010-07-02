<cfcomponent output="false">	

	<cffunction name="getObjectId" access="remote" returntype="string">
		<cfreturn createUUID() />
	</cffunction>

</cfcomponent>
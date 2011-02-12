<cfcomponent output="false" extends="base">
	<cffunction name="getSum" access="remote" returntype="numeric">
		<cfargument name="arg1" type="numeric" required="true"/>
		<cfargument name="arg2" type="numeric" required="true"/>
		<cfreturn arguments.arg1 + arguments.arg2 />
	</cffunction>
</cfcomponent>
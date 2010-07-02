<cfcomponent extends="baseTest">

	<cffunction name="noRemote" returntype="void">
	</cffunction>

	<cffunction name="getData" access="remote" returntype="numeric">
		<cfargument name="data" type="numeric" required="false" default="1" />
		<cfargument name="description" type="string" required="false" default="" />
		<cfreturn arguments.data />
	</cffunction>

	<cffunction name="getName" access="remote" returntype="string">
		<cfargument name="myName" type="string" required="true"/>
		<cfreturn 'My Name is ' & arguments.myName/>
	</cffunction>

	<cffunction name="getInfo" access="remote" returntype="string">
		<cfargument name="myName" type="string" required="true"/>
		<cfargument name="myAge" type="numeric" required="true"/>
		<cfreturn 'My Name is ' & arguments.myName & ' and I am ' & arguments.myAge & ' years old.'/>
	</cffunction>

	<cffunction name="getApplicationScope" access="remote" returntype="string">
		<cfreturn application.applicationname/>
	</cffunction>

	<cffunction name="getInfoJson" access="remote" returntype="struct">
		<cfargument name="myName" type="string" required="false" />
		<cfargument name="myAge" type="numeric" required="false" default="20"/>
		<cfargument name="myCity" type="string" required="false" default=""/>
		<cfscript>
			var str = structnew();
			str['myName'] = arguments.myName;
			str['myAge'] = arguments.myAge;
			str['myCity'] = arguments.myCity;			
			return str;
		</cfscript>
	</cffunction>

	<cffunction name="getQuery" access="remote" returntype="query">
		<cfscript>
			var q = queryNew('name,age');
			queryAddRow(q,2);
			querysetcell(q,'name','Andrea',1);
			querysetcell(q,'age','25',1);
			querysetcell(q,'name','Mark',2);
			querysetcell(q,'age','30',2);
			return q;
		</cfscript>
	</cffunction>

</cfcomponent>